# Calculating Time Complexity — Practice Problems

1. **By hand, no code**: what's the complexity of two NESTED loops, each
   running `n` times, followed SEQUENTIALLY by a third single loop over
   `n`? (Hint: the two nested loops multiply with each other, then that
   RESULT adds with the third loop.) Check your reasoning against
   [01-analyzing-loops.js](01-analyzing-loops.js)'s add-vs-multiply rule.

2. **Find the hidden cost**
   - Task: what's wrong with saying `arr.includes(x)` inside a loop over
     `arr` is `O(n)` total?
   - Answer: `includes()` is itself `O(n)` (it may scan the whole array),
     so a loop calling it `n` times is `O(n) x O(n) = O(n²)`, not `O(n)`
     — the "everything else" checklist item in the README, and one of
     the most common real-world Big-O mistakes

3. **Trace a real recursive function**
   - Task: take any recursive solution you've already written in this
     repo (e.g. a DFS from
     [09-tree-dfs](../../09-tree-dfs/README.md)) and answer: how many
     recursive calls does one invocation make? Does the input shrink?
   - Pattern: [Variant 2](02-analyzing-recursion.js)'s three-question
     approach — one call per invocation and no shrinking still often
     means O(n) (one call per remaining node/element), which is worth
     confirming against your own intuition

4. **Merge Sort, traced by hand**
   - Task: for an array of 8 elements, draw the recursion levels (how
     many levels until subarrays reach size 1?) and the merge work at
     each level (how many total comparisons per level?)
   - Pattern: [Variant 2](02-analyzing-recursion.js)'s
     `divideAndConquerTotalWork` — confirm depth = 3 (`log2(8)`), work
     per level ≈ 8, total ≈ 24

## After this module
See [../index.md](../index.md) — next up is
[04-space-complexity](../04-space-complexity/README.md), the same
questions applied to MEMORY instead of time.
