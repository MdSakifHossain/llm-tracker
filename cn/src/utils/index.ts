// @ts-nocheck
// --- TIME CONVERSIONS ---

export function rawToTime(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined || isNaN(seconds)) return ""
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return mins > 0 ? `${mins}min ${secs}s` : `${secs}s`
}

export function timeToRaw(str: string | number): number | null {
  if (typeof str === "number") return str
  if (!str || typeof str !== "string") return null

  const trimmed = str.trim()

  // Match minutes with 'min', 'm', or 'minutes'
  const minMatch = trimmed.match(/(\d+(?:\.\d+)?)\s*(?:min|m|minute)s?/i)
  // Match seconds with 's' or 'sec' or 'seconds'
  const secMatch = trimmed.match(/(\d+(?:\.\d+)?)\s*(?:sec|s|second)s?/i)

  const minutes = minMatch ? parseFloat(minMatch[1]) : 0
  const seconds = secMatch ? parseFloat(secMatch[1]) : 0

  if (!minMatch && !secMatch) {
    // Fallback: check if it's just a raw number string
    const rawNum = parseFloat(trimmed)
    return isNaN(rawNum) ? null : rawNum
  }

  return Math.round(minutes * 60 + seconds)
}

// --- TOKENS CONVERSIONS ---

export function rawToTokens(tokens: number | null | undefined): string {
  if (tokens === null || tokens === undefined || isNaN(tokens)) return ""
  return `${tokens.toLocaleString()} tokens`
}

export function tokensToRaw(str: string | number): number | null {
  if (typeof str === "number") return str
  if (!str || typeof str !== "string") return null
  const cleaned = str.replace(/[^\d.]/g, "")
  const parsed = parseInt(cleaned, 10)
  return isNaN(parsed) ? null : parsed
}

// --- SPEED CONVERSIONS ---

export function rawToSpeed(speed: number | null | undefined): string {
  if (speed === null || speed === undefined || isNaN(speed)) return ""
  return `${speed} t/s`
}

export function speedToRaw(str: string | number): number | null {
  if (typeof str === "number") return str
  if (!str || typeof str !== "string") return null
  const cleaned = str.replace(/[^\d.]/g, "")
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? null : parsed
}

// --- Custom on demand ---

export function formatNumber(n) {
  if (n === null || n === undefined) return "N/A"

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  })

  return formatter.format(n)
}

export function getParams(m) {
  if (!m) return "N/A"

  // Handles both new schema (is_moe) and fallback legacy schema (isMoE)
  const isMoE = m.is_moe ?? m.isMoE
  const total = m.total_parameters_b ?? m.totalParams
  const active = m.active_parameters_b ?? m.activeParams

  if (total === undefined || total === null) return "N/A"

  return isMoE ? `${total}B-A${active}B` : `${total}B`
}

export function parseTime(num) {
  return typeof num !== "number"
    ? "-"
    : num < 60
      ? `${num}s`
      : `${Math.floor(num / 60)}min ${num % 60}s`
}
