# Time Complexity Classes — Practice Problems

1. **By hand, no code**: rank these five snippets from fastest to
   slowest growth, just by looking at the loop shapes (don't run
   anything yet): a single loop over `n`; two SEQUENTIAL loops over `n`;
   a loop nested inside a loop, both over `n`; a binary search; a direct
   array index lookup.
   - Answer: array lookup (O(1)) < binary search (O(log n)) < single
     loop (O(n)) = two sequential loops (still O(n) — see below) <
     nested loop (O(n²))

2. **Why do two sequential O(n) loops stay O(n))?**
   - Task: modify [02-linear-and-linearithmic.js](02-linear-and-linearithmic.js)'s
     `linearScanCountingOps` to run its loop TWICE in a row (two separate
     `for` loops, not nested) and print the operation count
   - What to notice: it becomes `2n`, not `n²` — sequential steps ADD
     (`O(n) + O(n) = O(2n) = O(n)` after dropping the constant), nested
     steps MULTIPLY (`O(n) × O(n) = O(n²)`). Mixing these up is one of
     the most common analysis mistakes

3. **Binary Search** (LeetCode 704)
   - Task: implement binary search
   - Pattern: [Variant 1](01-constant-and-logarithmic.js) — see
     [16-modified-binary-search](../../16-modified-binary-search/README.md)
     for the full interview-pattern treatment

4. **Fibonacci Number** (LeetCode 509) — do it the SLOW way first
   - Task: compute the nth Fibonacci number with plain recursion, no
     memoization — then time how long `n=35` takes
   - Pattern: [Variant 3](03-quadratic-and-exponential.js)'s
     `naiveFibonacciCountingOps` — feel the O(2ⁿ) wall firsthand, then
     see [20-unbounded-knapsack](../../20-unbounded-knapsack/README.md)
     for how memoization fixes it

## After this module
See [../index.md](../index.md) — next up is
[03-calculating-time-complexity](../03-calculating-time-complexity/README.md),
which turns "I recognize these shapes" into "I can derive them from code
I've never seen before."
