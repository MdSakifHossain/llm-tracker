export function validateModel(body) {
    const {
        model_name,
        model_url,
        is_moe,
        is_thinking,
        total_parameters_b,
        active_parameters_b,
        context_window,
        is_loaded,
        generated_tokens,
        generation_time_s,
        generation_speed_tps,
        model_score,
        agent_score,
        model_notes,
        agent_notes,
    } = body || {};

    const errors = [];

    // --- 1. Base Field Validation ---
    if (!model_name || typeof model_name !== "string" || !model_name.trim()) {
        errors.push("model_name is required and must be a non-empty string.");
    }

    if (!model_url || typeof model_url !== "string" || !model_url.trim()) {
        errors.push("model_url is required and must be a non-empty string.");
    }

    if (typeof is_moe !== "boolean") {
        errors.push("is_moe is required and must be a boolean.");
    }

    if (typeof is_thinking !== "boolean") {
        errors.push("is_thinking is required and must be a boolean.");
    }

    if (typeof total_parameters_b !== "number" || isNaN(total_parameters_b) || total_parameters_b <= 0) {
        errors.push("total_parameters_b is required and must be a positive number.");
    }

    if (typeof context_window !== "number" || isNaN(context_window) || context_window <= 0) {
        errors.push("context_window is required and must be a positive number.");
    }

    if (typeof is_loaded !== "boolean") {
        errors.push("is_loaded is required and must be a boolean.");
    }

    // --- 2. MoE Logic ---
    let finalActiveParams = active_parameters_b;
    if (is_moe) {
        if (typeof active_parameters_b !== "number" || isNaN(active_parameters_b) || active_parameters_b <= 0) {
            errors.push("active_parameters_b is required for MoE models and must be a positive number.");
        }
    } else {
        finalActiveParams = total_parameters_b;
    }

    // --- 3. Conditional Performance Validation ---
    if (is_loaded) {
        if (!generated_tokens || typeof generated_tokens !== "string") {
            errors.push("generated_tokens is required when model is loaded.");
        }

        if (!generation_time_s || typeof generation_time_s !== "string") {
            errors.push("generation_time_s is required when model is loaded.");
        }

        if (!generation_speed_tps || typeof generation_speed_tps !== "string") {
            errors.push("generation_speed_tps is required when model is loaded.");
        }

        if (typeof model_score !== "number" || isNaN(model_score) || model_score < 0 || model_score > 100) {
            errors.push("model_score must be a number between 0 and 100.");
        }

        if (typeof agent_score !== "number" || isNaN(agent_score) || agent_score < 0 || agent_score > 100) {
            errors.push("agent_score must be a number between 0 and 100.");
        }

        if (typeof model_notes !== "string") {
            errors.push("model_notes is required and must be a string.");
        }

        if (typeof agent_notes !== "string") {
            errors.push("agent_notes is required and must be a string.");
        }
    }

    // If validation failed, return status and list of error messages
    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    // --- 4. Sanitization Helpers ---
    const getSanitizedGeneratedTokens = input => {
        if (!input) return null;
        const cleanStr = String(input).replace(/,/g, "").split(" ")[0];
        const parsed = parseInt(cleanStr, 10);
        return isNaN(parsed) ? null : parsed;
    };

    const getSanitizedGenerationSpeed = input => {
        if (!input) return null;
        const cleanStr = String(input).split(" ")[0];
        const parsed = parseFloat(cleanStr);
        return isNaN(parsed) ? null : parsed;
    };

    const parseToSeconds = input => {
        if (!input || typeof input !== "string") return null;
        const regex = /(?:(\d+(?:\.\d+)?)min)?\s*(?:(\d+(?:\.\d+)?)s)?/i;
        const matches = input.match(regex);
        if (!matches) return null;

        const minutes = parseFloat(matches[1]) || 0;
        const seconds = parseFloat(matches[2]) || 0;
        return minutes * 60 + seconds;
    };

    // --- 5. Return Cleaned Payload ---
    return {
        isValid: true,
        data: {
            model_name: model_name.trim(),
            model_url: model_url.trim(),
            is_moe,
            is_thinking,
            total_parameters_b,
            active_parameters_b: finalActiveParams,
            context_window,
            is_loaded,
            generated_tokens: is_loaded ? getSanitizedGeneratedTokens(generated_tokens) : null,
            generation_time_s: is_loaded ? parseToSeconds(generation_time_s) : null,
            generation_speed_tps: is_loaded ? getSanitizedGenerationSpeed(generation_speed_tps) : null,
            model_score: is_loaded ? model_score : null,
            agent_score: is_loaded ? agent_score : null,
            model_notes: is_loaded ? model_notes : null,
            agent_notes: is_loaded ? agent_notes : null,
            createdAt: new Date(),
        },
    };
}
