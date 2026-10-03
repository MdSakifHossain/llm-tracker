// @ts-nocheck

import { CheckIcon, CopyIcon, FileCodeIcon } from "lucide-react"
import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  AGENT_EVAL_METRICS,
  AGENT_PROMPT,
  LLAMA_SYSTEM_PROMPT,
  PI_APPEND_SYSTEM,
  WEB_EVAL_METRICS,
  WEB_PROMPT,
} from "../data/promptsData"

interface CodeBlockProps {
  label?: string
  filename?: string
  description?: string
  content: string
}

function CodeBlock({
  label,
  filename = "prompt.txt",
  description,
  content,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <FieldGroup className="w-full">
      <Field>
        {label && <FieldLabel>{label}</FieldLabel>}
        <InputGroup>
          <InputGroupAddon align="block-start">
            <FileCodeIcon className="text-muted-foreground" />
            <InputGroupText className="font-mono">{filename}</InputGroupText>
            <InputGroupButton
              size="icon-xs"
              className="ml-auto"
              onClick={handleCopy}
              type="button"
            >
              {copied ? (
                <CheckIcon className="text-emerald-500" />
              ) : (
                <CopyIcon />
              )}
              <span className="sr-only">Copy</span>
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupTextarea
            value={content}
            readOnly
            rows={Math.min(Math.max(content.split("\n").length, 4), 16)}
            className="resize-none font-mono text-sm leading-relaxed"
          />
        </InputGroup>
        {description && <FieldDescription>{description}</FieldDescription>}
      </Field>
    </FieldGroup>
  )
}

export default function Prompts() {
  return (
    <main className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
      {/* llama.cpp Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            llama.cpp Web Interface Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Temperature:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
              0.2
            </code>
          </p>

          <CodeBlock
            label="System Prompt"
            filename="system_prompt.txt"
            content={LLAMA_SYSTEM_PROMPT}
          />
        </CardContent>
      </Card>

      {/* Pi Agent Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Pi Agent Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock
            label="APPEND_SYSTEM.md"
            filename="APPEND_SYSTEM.md"
            description="Saved in ~/.pi/agent/APPEND_SYSTEM.md"
            content={PI_APPEND_SYSTEM}
          />
        </CardContent>
      </Card>

      {/* Web Prompts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Web Prompts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CodeBlock filename="web_prompt.txt" content={WEB_PROMPT} />

          <Separator />

          <div>
            <h3 className="mb-4 text-lg font-semibold">Evaluation Metric</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Part</TableHead>
                  <TableHead>Hook for this Task</TableHead>
                  <TableHead>What to check</TableHead>
                  <TableHead className="text-center">Points</TableHead>
                  <TableHead className="text-right">Correct value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WEB_EVAL_METRICS.map((row) => (
                  <TableRow key={row.part}>
                    <TableCell className="font-medium">{row.part}</TableCell>
                    <TableCell>{row.hook}</TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {row.check}
                      </code>
                    </TableCell>
                    <TableCell className="text-center">{row.points}</TableCell>
                    <TableCell className="text-right">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {row.value}
                      </code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Agent Prompts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Agent Prompts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CodeBlock filename="agent_prompt.txt" content={AGENT_PROMPT} />

          <Separator />

          <div>
            <h3 className="mb-4 text-lg font-semibold">Evaluation Metric</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">Step</TableHead>
                  <TableHead>What you're checking</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AGENT_EVAL_METRICS.map((row) => (
                  <TableRow key={row.step}>
                    <TableCell className="text-center font-medium">
                      {row.step}
                    </TableCell>
                    <TableCell>{row.check}</TableCell>
                    <TableCell className="text-right font-medium">
                      {row.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="font-bold">
                    TOTAL
                  </TableCell>
                  <TableCell className="text-right font-bold">100</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
