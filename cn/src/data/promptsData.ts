export const LLAMA_SYSTEM_PROMPT = `You are a helpful, knowledgeable assistant.

- Be concise and direct.
- Use plain language. Avoid jargon unless the user uses it first.
- If you're unsure, say so. Never fabricate facts, citations, or sources.
- Match the user's tone: casual for casual questions, formal for formal ones.`

export const PI_APPEND_SYSTEM = `## Response economy

- When a task is complete, reply with only: Done
- Match response length to the complexity of the request.
- Never volunteer alternatives, caveats, or elaborations unless asked.
- No summaries of what you did. No "I have updated the file..." — just "Done".

## Safety

- Read files before editing. Never edit blind.
- Do not run destructive commands (rm -rf, git push --force, sudo) without explicit user confirmation.
- Do not refactor or "improve" code beyond what was asked.
- If a task is ambiguous, ask before acting.
- Prefer the smallest possible change that satisfies the request.`

export const WEB_PROMPT = `Complete ALL FOUR parts below. Label each part exactly as shown.
Keep answers short — use the exact answer format requested.

PART 1 — Arithmetic
Starting from 26, apply these steps in order:
1. Add 14
2. Multiply the result by 3
3. Subtract 48
4. Divide the result by 2
5. Subtract the original starting number
Write each intermediate value as "Step N: <number>", then "Final: <number>".

PART 2 — Logic
Four friends — Ana, Ben, Cara, Dev — sit in chairs numbered 1 to 4.
- Ana is not in chair 1 or chair 4.
- Ben sits immediately to the right of Cara.
- Dev sits somewhere to the left of Ben.
Answer in exactly this format:
Chair 1: <name>
Chair 2: <name>
Chair 3: <name>
Chair 4: <name>

PART 3 — Code reading
What does this JavaScript code print?

const arr = [4, 1, 2, 1, 4];
const seen = new Set();
let answer = -1;
for (const n of arr) {
  if (seen.has(n)) {
    seen.add(n);
  } else {
    answer = n;
  }
}
console.log(answer);

ANSWER: <value>

PART 4 — Extraction
Records:
- laptop, price 1299, in stock: yes
- mouse, price 25, in stock: no
- keyboard, price 79, in stock: yes
- monitor, price 349, in stock: yes

Output ONLY the price of the second cheapest in-stock item, in this format:
ANSWER: <price>`

export const AGENT_PROMPT = `Perform this task using the available tools. Do not merely describe what you would do; actually perform each step.

1. Create a file named \`agent_test.js\` in the current working directory containing:

function add(a, b) {
  return a + b;
}

console.log(add(2, 3));

2. Read the file back and verify that its contents are correct.
3. Run the file using the shell.
4. Modify \`agent_test.js\` so that the function multiplies instead of adds, and change the example call to use \`4\` and \`5\`.

The final file should contain:

function add(a, b) {
  return a * b;
}

console.log(add(4, 5));

5. Read the modified file back and verify it.
6. Run the modified file using the shell and verify that the output is \`20\`.

Do not create any other files.

At the end, briefly report whether every step succeeded.`

export const WEB_EVAL_METRICS = [
  {
    part: "P1",
    hook: "Step-by-Step Math",
    check: "Final: <number>",
    points: 25,
    value: "10",
  },
  {
    part: "P2",
    hook: "Chair Logic",
    check: "four Chair N: lines",
    points: 25,
    value: "Dev, Ana, Cara, Ben",
  },
  {
    part: "P3",
    hook: "Code reading",
    check: "ANSWER: <value>",
    points: 25,
    value: "4",
  },
  {
    part: "P4",
    hook: "Stock Price Extraction",
    check: "ANSWER: <price>",
    points: 25,
    value: "349",
  },
]

export const AGENT_EVAL_METRICS = [
  {
    step: "1",
    check: "Creates agent_test.js with exact add(2, 3) implementation",
    points: 15,
  },
  {
    step: "2",
    check: "Reads the file back and correctly verifies its contents",
    points: 10,
  },
  { step: "3", check: "Runs the file using shell and gets 5", points: 10 },
  {
    step: "4",
    check: "Correctly modifies it to multiplication and changes call to 4, 5",
    points: 20,
  },
  {
    step: "5",
    check: "Reads the modified file and correctly verifies it",
    points: 10,
  },
  { step: "6", check: "Runs the modified file using shell", points: 10 },
  { step: "7", check: "Correctly verifies the output is 20", points: 10 },
  { step: "8", check: "Creates no other files", points: 10 },
  {
    step: "9",
    check: "Briefly reports whether all steps succeeded",
    points: 5,
  },
]
