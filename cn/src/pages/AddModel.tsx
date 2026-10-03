// @ts-nocheck
import axios from "axios"
import { useEffect } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { useNavigate } from "react-router" // Adjust router import if using another router
import { useModels } from "../contexts/ModelsContext" // Adjust path to your context file

// shadcn/ui components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function AddModel2() {
  return (
    <main className="container mx-auto max-w-2xl pb-8">
      <h1 className="mb-6 text-3xl font-bold">Add Model</h1>
      <LocalLlmForm />
    </main>
  )
}

export function LocalLlmForm() {
  const navigate = useNavigate()
  const { models, updateModels } = useModels()

  const { register, control, handleSubmit, setValue, reset } = useForm()

  const isLoaded = useWatch({
    control,
    name: "is_loaded",
  })

  const isMoE = useWatch({
    control,
    name: "is_moe",
  })

  const totalParams = useWatch({
    control,
    name: "total_parameters_b",
  })

  // Automatically keep active params in sync with total params if not an MoE model
  useEffect(() => {
    if (!isMoE) {
      setValue("active_parameters_b", totalParams)
    }
  }, [isMoE, totalParams, setValue])

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/models`,
        data
      )

      const createdModel = {
        ...response.data.data,
        _id: response.data.insertedId,
      }
      updateModels([createdModel, ...models])
      reset()
      navigate("/")
    } catch (err) {
      const serverMessage = err.response?.data?.message
      const validationErrors = err.response?.data?.errors?.join("\n• ")
      const alertText = validationErrors
        ? `${serverMessage}:\n• ${validationErrors}`
        : serverMessage || err.message || "An unexpected error occurred."

      alert(`Failed to add model:\n${alertText}`)
      console.error("Error posting model:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Model Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Model Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model_name">Name</Label>
            <Input
              id="model_name"
              type="text"
              {...register("model_name", {
                required: "Model name is required",
              })}
              placeholder="Qwen/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model_url">URL</Label>
            <Input
              id="model_url"
              type="url"
              {...register("model_url", { required: "Model URL is required" })}
              placeholder="https://huggingface.co/..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Architecture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              name="is_moe"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_moe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="is_moe">Is MoE (Mixture of Experts)?</Label>
                </div>
              )}
            />
            <Controller
              name="is_thinking"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_thinking"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="is_thinking">Is Thinking Model?</Label>
                </div>
              )}
            />
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="total_parameters_b">Total Parameters (B)</Label>
              <Input
                id="total_parameters_b"
                type="number"
                step="any"
                placeholder="e.g. 0.6"
                min={0}
                {...register("total_parameters_b", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="active_parameters_b">Active Parameters (B)</Label>
              <Input
                id="active_parameters_b"
                type="number"
                step="any"
                placeholder="e.g. 0.6"
                min={0}
                disabled={!isMoE}
                {...register("active_parameters_b", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="context_window">Context Window</Label>
            <Input
              id="context_window"
              type="number"
              placeholder="e.g. 131072"
              {...register("context_window", { valueAsNumber: true })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Controller
            name="is_loaded"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_loaded"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="is_loaded">Did it Load?</Label>
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* Performance, Evaluation, Notes (Conditional) */}
      {isLoaded && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="generated_tokens">Generated Tokens</Label>
                  <Input
                    id="generated_tokens"
                    type="text"
                    placeholder="e.g. 1,162 tokens"
                    {...register("generated_tokens")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="generation_time_s">Generation Time</Label>
                  <Input
                    id="generation_time_s"
                    type="text"
                    placeholder="e.g. 2min 14s"
                    {...register("generation_time_s")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="generation_speed_tps">Generation Speed</Label>
                <Input
                  id="generation_speed_tps"
                  type="text"
                  placeholder="e.g. 32.27 t/s"
                  {...register("generation_speed_tps")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Evaluation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="model_score">Model Score</Label>
                  <Input
                    id="model_score"
                    type="number"
                    placeholder="e.g. (0 - 100)"
                    step={25}
                    min={0}
                    max={100}
                    {...register("model_score", { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent_score">Agent Score</Label>
                  <Input
                    id="agent_score"
                    type="number"
                    placeholder="e.g. (0 - 100)"
                    step="any"
                    min={0}
                    max={100}
                    {...register("agent_score", { valueAsNumber: true })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="model_notes">Model Notes</Label>
                  <Textarea
                    id="model_notes"
                    placeholder="Notes about the model..."
                    {...register("model_notes")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent_notes">Agent Notes</Label>
                  <Textarea
                    id="agent_notes"
                    placeholder="Notes about the agent..."
                    {...register("agent_notes")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Secret & Action */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="secret">Secret</Label>
            <Input
              id="secret"
              type="pass"
              {...register("secret", { required: "Secret is required" })}
              placeholder="SUPER_SECRET_PASSPHRASE"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit to DB
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
