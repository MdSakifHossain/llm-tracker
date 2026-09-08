import { useMemo, useState } from "react";
import { formatNumber, getParams } from "../utils.js";
import MessageBox from "./MessageBox";

const MODEL_NAME_LENGTH = 25;

export default function RenderModels({ list = [] }) {
    if (!list || list.length === 0) {
        return <MessageBox message="No Models Found" />;
    }

    return <GetTable array={list} />;
}

function GetTable({ array = [] }) {
    // sortConfig holds key and direction ('asc' | 'desc')
    // By default, key is null (preserves original array order)
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const handleSort = key => {
        setSortConfig(prev => {
            if (prev.key !== key) {
                return { key, direction: "asc" };
            }
            if (prev.direction === "asc") {
                return { key, direction: "desc" };
            }
            // 3rd click resets back to default array order
            return { key: null, direction: "asc" };
        });
    };

    // Helper to extract numeric or string values safely for sorting
    const getValue = (model, key) => {
        switch (key) {
            case "model_name":
                return model.model_name?.toLowerCase() || "";
            case "params":
                return model.total_parameters_b ?? 0;
            case "context_window":
                return model.context_window ?? 0;
            case "is_loaded":
                return model.is_loaded ? 1 : 0;
            case "generated_tokens":
                return model.generated_tokens ?? -1;
            case "generation_time_s":
                return model.generation_time_s ?? -1;
            case "generation_speed_tps":
                return model.generation_speed_tps ?? -1;
            case "model_score":
                return model.model_score ?? -1;
            case "agent_score":
                return model.agent_score ?? -1;
            case "is_thinking":
                return model.is_thinking ? 1 : 0;
            default:
                return 0;
        }
    };

    const sortedModels = useMemo(() => {
        if (!sortConfig.key) return array; // Default: spit array as it arrived

        return [...array].sort((a, b) => {
            const valA = getValue(a, sortConfig.key);
            const valB = getValue(b, sortConfig.key);

            if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
            if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [array, sortConfig]);

    const renderSortIndicator = key => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? " ⬆️" : " ⬇️";
    };

    return (
        <div className="overflow-x-auto">
            <table>
                <thead>
                    <tr>
                        <th
                            scope="col"
                            onClick={() => handleSort("model_name")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Model{renderSortIndicator("model_name")}
                        </th>
                        <th
                            scope="col"
                            className="text-center"
                            onClick={() => handleSort("params")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Params{renderSortIndicator("params")}
                        </th>
                        <th
                            scope="col"
                            className="text-center"
                            onClick={() => handleSort("context_window")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Context{renderSortIndicator("context_window")}
                        </th>
                        <th
                            scope="col"
                            className="text-center"
                            onClick={() => handleSort("is_loaded")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Loaded{renderSortIndicator("is_loaded")}
                        </th>
                        <th
                            scope="col"
                            className="text-center"
                            onClick={() => handleSort("generated_tokens")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Tokens{renderSortIndicator("generated_tokens")}
                        </th>
                        <th
                            scope="col"
                            className="text-center"
                            onClick={() => handleSort("generation_time_s")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Time{renderSortIndicator("generation_time_s")}
                        </th>
                        <th
                            scope="col"
                            className="text-center"
                            onClick={() => handleSort("generation_speed_tps")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Speed{renderSortIndicator("generation_speed_tps")}
                        </th>
                        <th
                            scope="col"
                            className="text-center"
                            onClick={() => handleSort("model_score")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Model Score{renderSortIndicator("model_score")}
                        </th>
                        <th
                            scope="col"
                            className="text-center"
                            onClick={() => handleSort("agent_score")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Agent Score{renderSortIndicator("agent_score")}
                        </th>
                        <th
                            scope="col"
                            className="text-center"
                            onClick={() => handleSort("is_thinking")}
                            style={{ cursor: "pointer", userSelect: "none" }}
                        >
                            Type{renderSortIndicator("is_thinking")}
                        </th>
                        <th scope="col" className="text-right">
                            URL
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedModels.map(model => (
                        <tr key={model._id || model.model_name}>
                            <th scope="row">
                                {model.model_name.length > MODEL_NAME_LENGTH
                                    ? model.model_name.slice(0, MODEL_NAME_LENGTH) + "..."
                                    : model.model_name}
                            </th>
                            <td className="text-center">{getParams(model)}</td>
                            <td className="text-center">{formatNumber(model.context_window)}</td>
                            <td className="text-center">{model.is_loaded ? "Yes" : "No"}</td>
                            <td className="text-center">
                                {model.generated_tokens ? formatNumber(model.generated_tokens) : "-"}
                            </td>
                            <td className="text-center">
                                {model.generation_time_s !== null && model.generation_time_s !== undefined
                                    ? `${model.generation_time_s}s`
                                    : "-"}
                            </td>
                            <td className="text-center">
                                {model.generation_speed_tps !== null && model.generation_speed_tps !== undefined
                                    ? `${model.generation_speed_tps} t/s`
                                    : "-"}
                            </td>
                            <td className="text-center">
                                {model.model_score !== null && model.model_score !== undefined
                                    ? model.model_score
                                    : "-"}
                            </td>
                            <td className="text-center">
                                {model.agent_score !== null && model.agent_score !== undefined
                                    ? model.agent_score
                                    : "-"}
                            </td>
                            <td className="text-center">{model.is_thinking ? "Thinking" : "Standard"}</td>
                            <td className="text-right">
                                {model.model_url ? (
                                    <a href={model.model_url} target="_blank" rel="noreferrer" className="secondary">
                                        Link
                                    </a>
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
