import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";

export default function AddModel2() {
  return (
    <main className="container">
      <h1>Add Model 2</h1>
      <LocalLlmForm />
    </main>
  );
}

export function LocalLlmForm() {
  const { register, control, handleSubmit, setValue } = useForm();

  const isLoaded = useWatch({
    control,
    name: "is_loaded",
  });

  const isMoE = useWatch({
    control,
    name: "is_moe",
  });

  const totalParams = useWatch({
    control,
    name: "total_parameters_b",
  });

  // Automatically keep active params in sync with total params if not an MoE model
  useEffect(() => {
    if (!isMoE) {
      setValue("active_parameters_b", totalParams);
    }
  }, [isMoE, totalParams, setValue]);

  const onSubmit = (flatData) => {
    console.log(
      "Submitting flat payload to API:",
      JSON.stringify(flatData, null, 2),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Model Info</legend>
        <label>
          Name
          <input
            type="text"
            {...register("model_name", { required: "Model name is required" })}
            placeholder="Qwen/..."
          />
        </label>
        <label>
          URL
          <input
            type="url"
            {...register("model_url", { required: "Model URL is required" })}
            placeholder="https://huggingface.co/..."
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Architecture</legend>
        <div className="grid">
          <label>
            <input type="checkbox" {...register("is_moe")} />
            Is MoE (Mixture of Experts)?
          </label>
          <label>
            <input type="checkbox" {...register("is_thinking")} />
            Is Thinking Model?
          </label>
        </div>

        <hr />

        <div className="grid">
          <label>
            Total Parameters (B)
            <input
              type="number"
              step="any"
              placeholder="e.g. 0.6"
              min={0}
              {...register("total_parameters_b", { valueAsNumber: true })}
            />
          </label>
          <label>
            Active Parameters (B)
            <input
              type="number"
              step="any"
              placeholder="e.g. 0.6"
              min={0}
              disabled={!isMoE}
              {...register("active_parameters_b", { valueAsNumber: true })}
            />
          </label>
        </div>

        <div className="grid">
          <label>
            Context Window
            <input
              type="number"
              placeholder="e.g. 131072"
              {...register("context_window", { valueAsNumber: true })}
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Status</legend>
        <label>
          <input type="checkbox" {...register("is_loaded")} />
          Did it Load?
        </label>
      </fieldset>

      {isLoaded && (
        <>
          <hr />

          <fieldset>
            <legend>Performance</legend>
            <div className="grid">
              <label>
                Generated Tokens
                <input
                  placeholder="e.g. 1,162 tokens"
                  type="text"
                  {...register("generated_tokens")}
                />
              </label>
              <label>
                Generation Time
                <input
                  type="text"
                  placeholder="e.g. 2min 14s"
                  {...register("generation_time_s")}
                />
              </label>
            </div>
            <label>
              Generation Speed
              <input
                placeholder="e.g. 32.27 t/s"
                type="text"
                {...register("generation_speed_tps")}
              />
            </label>
          </fieldset>

          <hr />

          <fieldset>
            <legend>Evaluation</legend>
            <div className="grid">
              <label>
                Model Score
                <input
                  type="number"
                  placeholder="e.g. (0 - 100)"
                  step={25}
                  min={0}
                  max={100}
                  {...register("model_score", { valueAsNumber: true })}
                />
              </label>
              <label>
                Agent Score
                <input
                  type="number"
                  placeholder="e.g. (0 - 100)"
                  step="any"
                  min={0}
                  max={100}
                  {...register("agent_score", { valueAsNumber: true })}
                />
              </label>
            </div>
          </fieldset>

          <hr />

          <fieldset>
            <legend>Notes</legend>
            <div className="grid">
              <label>
                Model Notes
                <textarea
                  {...register("model_notes")}
                  placeholder="Notes about the model..."
                ></textarea>
              </label>
              <label>
                Agent Notes
                <textarea
                  {...register("agent_notes")}
                  placeholder="Notes about the agent..."
                ></textarea>
              </label>
            </div>
          </fieldset>
        </>
      )}

      <hr />

      {/* Secret */}
      <label>
        Secret:
        <input
          type="text"
          {...register("secret", { required: "Secret is required" })}
          placeholder="SUPER_SECRET_PASSPHRASE"
        />
        {/* {errors.secret && (
          <span className="text-red">{errors.secret.message}</span>
        )} */}
      </label>

      <button type="submit">Submit to DB</button>
    </form>
  );
}
