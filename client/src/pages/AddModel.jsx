import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useModels } from "../contexts/ModelsContext";
import axios from "axios";

const AddModel = () => {
  const navigate = useNavigate();
  const { updateModels, models } = useModels();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const isMoE = watch("isMoE");
  const totalParams = watch("totalParams");

  // Sync activeParams with totalParams when MoE is disabled
  useEffect(() => {
    if (isMoE === "n") {
      setValue("activeParams", totalParams);
    }
  }, [isMoE, totalParams, setValue]);

  const onSubmit = async (data) => {
    const {
      name,
      url,
      totalParams,
      activeParams,
      contextWindow,
      ranOnWeb,
      ranThroughAgent,
      isMoE,
      isThinking,
      summary,
      secret,
    } = data;

    const finalData = {
      name,
      url,
      totalParams: parseFloat(totalParams),
      activeParams: parseFloat(activeParams),
      contextWindow: parseFloat(contextWindow),
      ranOnWeb,
      ranThroughAgent,
      isMoE: isMoE === "y" ? true : false,
      isThinking: isThinking === "y" ? true : false,
      summary,
      secret,
    };

    // console.log(finalData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/models`,
        finalData,
      );

      // console.log("Model added successfully:", response.data);
      updateModels([{ ...response.data }, ...models]);
      reset();
      navigate("/");
    } catch (error) {
      if (error.response?.status === 409) {
        reset();
        navigate("/");
      } else {
        console.error("Error adding model:", error);
      }
    }
  };

  return (
    <div>
      <h1>Add Model Page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Model Name */}
        <label>
          Model Name:
          <input
            type="text"
            {...register("name", { required: "Model name is required" })}
            placeholder="Model Name"
          />
          {errors.name && (
            <span className="text-red">{errors.name.message}</span>
          )}
        </label>

        {/* URL */}
        <label>
          URL:
          <input
            type="url"
            {...register("url", { required: "URL is required" })}
            placeholder="https://example.com"
          />
          {errors.url && <span className="text-red">{errors.url.message}</span>}
        </label>

        {/* Total Params - must be positive integer */}
        <label>
          Total Params:
          <input
            type="number"
            step="any"
            {...register("totalParams", {
              required: "Total params is required",
              min: {
                value: 0,
                message: "Total params must be greater than 0",
              },
            })}
            placeholder="Total Params"
          />
          {errors.totalParams && (
            <span className="text-red">{errors.totalParams.message}</span>
          )}
        </label>

        {/* Dense or MoE */}
        <fieldset>
          <legend>Is it MoE?</legend>

          <label>
            <input
              type="radio"
              name="isMoE"
              value="y"
              {...register("isMoE", {
                required: "Architecture is required",
              })}
            />
            <span>Yes</span>
          </label>

          <label>
            <input
              type="radio"
              name="isMoE"
              value="n"
              {...register("isMoE", {
                required: "Architecture is required",
              })}
            />
            <span>No</span>
          </label>

          {errors.isMoE && (
            <span className="text-red">{errors.isMoE.message}</span>
          )}
        </fieldset>

        {/* Active Params - must be positive integer */}
        <label>
          Active Params:
          <input
            type="number"
            step="any"
            disabled={isMoE === "n"}
            {...register("activeParams", {
              required: "Active params is required",
              min: {
                value: 0,
                message: "Active params must be greater than 0",
              },
            })}
            placeholder="Active Params"
          />
          {errors.activeParams && (
            <span className="text-red">{errors.activeParams.message}</span>
          )}
        </label>

        {/* Context Window - must be positive integer */}
        <label>
          Context Window:
          <input
            type="number"
            {...register("contextWindow", {
              required: "Context window is required",
              min: {
                value: 1,
                message: "Context window must be greater than 0",
              },
            })}
            placeholder="Context Window"
          />
          {errors.contextWindow && (
            <span className="text-red">{errors.contextWindow.message}</span>
          )}
        </label>

        {/* Thinking / Reasoning or Instruct */}
        <fieldset>
          <legend>Is this Thinking?</legend>

          <label>
            <input
              type="radio"
              name="isThinking"
              value="y"
              {...register("isThinking", {
                required: "Type is required",
              })}
            />
            <span>Yes</span>
          </label>

          <label>
            <input
              type="radio"
              name="isThinking"
              value="n"
              {...register("isThinking", {
                required: "Type is required",
              })}
            />
            <span>No</span>
          </label>

          {errors.isThinking && (
            <span className="text-red">{errors.isThinking.message}</span>
          )}
        </fieldset>

        {/* Web and Agent - OPTIONAL */}
        <fieldset className="grid">
          <label>
            <input type="checkbox" {...register("ranOnWeb")} />
            Ran on Web
          </label>

          {errors.ranOnWeb && (
            <span className="text-red">{errors.ranOnWeb.message}</span>
          )}

          <label>
            <input type="checkbox" {...register("ranThroughAgent")} />
            Ran Through Agent
          </label>

          {errors.ranThroughAgent && (
            <span className="text-red">{errors.ranThroughAgent.message}</span>
          )}
        </fieldset>

        {/* Short Summary */}
        <label>
          Short Summary:
          <textarea
            {...register("summary", {
              required: "Short summary is required",
            })}
            placeholder="How was the model overall...?"
          />
          {errors.summary && (
            <span className="text-red">{errors.summary.message}</span>
          )}
        </label>

        {/* Secret */}
        <label>
          Secret:
          <input
            type="text"
            {...register("secret", { required: "Secret is required" })}
            placeholder="SUPER_SECRET_PASSPHRASE"
          />
          {errors.secret && (
            <span className="text-red">{errors.secret.message}</span>
          )}
        </label>

        <input type="submit" value="Add to Database" />
      </form>
    </div>
  );
};

export default AddModel;
