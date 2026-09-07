# Prompts

## Web

### Prompt:

```txt
Complete ALL FOUR parts below. Label each part exactly as shown.
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
ANSWER: <price>
```

### Evaluation Metric:

| Part | Hook for this Task     | What to check         | Points |         Correct value |
| ---- | ---------------------- | --------------------- | :----: | --------------------: |
| P1   | Step-by-Step Math      | `Final: <number>`     |   25   |                  `10` |
| P2   | Chair Logic            | four `Chair N:` lines |   25   | `Dev, Ana, Cara, Ben` |
| P3   | Code reading           | `ANSWER: <value>`     |   25   |                   `4` |
| P4   | Stock Price Extraction | `ANSWER: <price>`     |   25   |                 `349` |

## Agent

### Prompt:

````markdown
Perform this task using the available tools. Do not merely describe what you would do; actually perform each step.

1. Create a file named `agent_test.js` in the current working directory containing:

```js
function add(a, b) {
  return a + b;
}

console.log(add(2, 3));
```

2. Read the file back and verify that its contents are correct.
3. Run the file using the shell.
4. Modify `agent_test.js` so that the function multiplies instead of adds, and change the example call to use `4` and `5`.

The final file should contain:

```js
function add(a, b) {
  return a * b;
}

console.log(add(4, 5));
```

5. Read the modified file back and verify it.
6. Run the modified file using the shell and verify that the output is `20`.

Do not create any other files.

At the end, briefly report whether every step succeeded.
````

### Evaluation Metric

| Step  | What you're checking                                                   |  Points |
| ----- | ---------------------------------------------------------------------- | ------: |
| **1** | Creates `agent_test.js` with the exact `add(2, 3)` implementation      |  **15** |
| **2** | Reads the file back and correctly verifies its contents                |  **10** |
| **3** | Runs the file using shell and gets `5`                                 |  **10** |
| **4** | Correctly modifies it to multiplication and changes the call to `4, 5` |  **20** |
| **5** | Reads the modified file and correctly verifies it                      |  **10** |
| **6** | Runs the modified file using shell                                     |  **10** |
| **7** | Correctly verifies the output is `20`                                  |  **10** |
| **8** | Creates **no other files**                                             |  **10** |
| **9** | Briefly reports whether all steps succeeded                            |   **5** |
|       | **TOTAL**                                                              | **100** |
