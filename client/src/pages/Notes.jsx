export default function Prompts() {
    return (
        <main className="container">
            <section>
                <h2>llama.cpp Web Interface Settings</h2>

                <p>
                    Temperature: <code>0.2</code>
                </p>

                <h3>System Prompt</h3>
                <pre>
                    <code>
                        {`You are a helpful, knowledgeable assistant.

- Be concise and direct.
- Use plain language. Avoid jargon unless the user uses it first.
- If you're unsure, say so. Never fabricate facts, citations, or sources.
- Match the user's tone: casual for casual questions, formal for formal ones.`}
                    </code>
                </pre>
            </section>

            <hr />

            <section>
                <h2>Pi Agent Settings</h2>

                <p>
                    Before running the agents i used this prompt which is saved in{" "}
                    <code>~/.pi/agent/APPEND_SYSTEM.md</code>
                    place.
                </p>

                <h3>
                    <code>APPEND_SYSTEM.md</code>
                </h3>

                <pre>
                    <code>
                        {`## Response economy

- When a task is complete, reply with only: Done
- Match response length to the complexity of the request.
- Never volunteer alternatives, caveats, or elaborations unless asked.
- No summaries of what you did. No "I have updated the file..." — just "Done".

## Safety

- Read files before editing. Never edit blind.
- Do not run destructive commands (rm -rf, git push --force, sudo) without explicit user confirmation.
- Do not refactor or "improve" code beyond what was asked.
- If a task is ambiguous, ask before acting.
- Prefer the smallest possible change that satisfies the request.`}
                    </code>
                </pre>
            </section>

            <hr />

            <section>
                <h2>Web Prompts</h2>

                <pre>
                    <code>{`Complete ALL FOUR parts below. Label each part exactly as shown.
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
  ANSWER: <price>`}</code>
                </pre>

                <h3>Evaluation Metric</h3>
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Part</th>
                            <th>Hook for this Task</th>
                            <th>What to check</th>
                            <th style={{ textAlign: "center" }}>Points</th>
                            <th style={{ textAlign: "right" }}>Correct value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>P1</td>
                            <td>Step-by-Step Math</td>
                            <td>
                                <code>Final: &lt;number&gt;</code>
                            </td>
                            <td style={{ textAlign: "center" }}>25</td>
                            <td style={{ textAlign: "right" }}>
                                <code>10</code>
                            </td>
                        </tr>
                        <tr>
                            <td>P2</td>
                            <td>Chair Logic</td>
                            <td>
                                four <code>Chair N:</code> lines
                            </td>
                            <td style={{ textAlign: "center" }}>25</td>
                            <td style={{ textAlign: "right" }}>
                                <code>Dev, Ana, Cara, Ben</code>
                            </td>
                        </tr>
                        <tr>
                            <td>P3</td>
                            <td>Code reading</td>
                            <td>
                                <code>ANSWER: &lt;value&gt;</code>
                            </td>
                            <td style={{ textAlign: "center" }}>25</td>
                            <td style={{ textAlign: "right" }}>
                                <code>4</code>
                            </td>
                        </tr>
                        <tr>
                            <td>P4</td>
                            <td>Stock Price Extraction</td>
                            <td>
                                <code>ANSWER: &lt;price&gt;</code>
                            </td>
                            <td style={{ textAlign: "center" }}>25</td>
                            <td style={{ textAlign: "right" }}>
                                <code>349</code>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Agent Prompts</h2>

                <pre>
                    <code>{`Perform this task using the available tools. Do not merely describe what you would do; actually perform each step.

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

At the end, briefly report whether every step succeeded.`}</code>
                </pre>

                <h3>Evaluation Metric</h3>
                <table className="striped">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Step</th>
                            <th>What you're checking</th>
                            <th style={{ textAlign: "right" }}>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: "center" }}>
                                <strong>1</strong>
                            </td>
                            <td>
                                Creates <code>agent_test.js</code> with the exact <code>add(2, 3)</code> implementation
                            </td>
                            <td style={{ textAlign: "right" }}>
                                <strong>15</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>
                                <strong>2</strong>
                            </td>
                            <td>Reads the file back and correctly verifies its contents</td>
                            <td style={{ textAlign: "right" }}>
                                <strong>10</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>
                                <strong>3</strong>
                            </td>
                            <td>
                                Runs the file using shell and gets <code>5</code>
                            </td>
                            <td style={{ textAlign: "right" }}>
                                <strong>10</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>
                                <strong>4</strong>
                            </td>
                            <td>
                                Correctly modifies it to multiplication and changes the call to <code>4, 5</code>
                            </td>
                            <td style={{ textAlign: "right" }}>
                                <strong>20</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>
                                <strong>5</strong>
                            </td>
                            <td>Reads the modified file and correctly verifies it</td>
                            <td style={{ textAlign: "right" }}>
                                <strong>10</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>
                                <strong>6</strong>
                            </td>
                            <td>Runs the modified file using shell</td>
                            <td style={{ textAlign: "right" }}>
                                <strong>10</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>
                                <strong>7</strong>
                            </td>
                            <td>
                                Correctly verifies the output is <code>20</code>
                            </td>
                            <td style={{ textAlign: "right" }}>
                                <strong>10</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>
                                <strong>8</strong>
                            </td>
                            <td>
                                Creates <strong>no other files</strong>
                            </td>
                            <td style={{ textAlign: "right" }}>
                                <strong>10</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>
                                <strong>9</strong>
                            </td>
                            <td>Briefly reports whether all steps succeeded</td>
                            <td style={{ textAlign: "right" }}>
                                <strong>5</strong>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="2">TOTAL</th>
                            <th style={{ textAlign: "right" }}>100</th>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </main>
    );
}
