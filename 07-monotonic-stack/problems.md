# Monotonic Stack — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Daily Temperatures** (LeetCode 739)
   - Task: for each day, how many days until a warmer temperature
   - Pattern: [Variant 1](01-next-greater-element.js) — decreasing stack, resolve on pop

2. **Next Greater Element I** (LeetCode 496)
   - Task: for each query value, find its next greater element in a second array
   - Pattern: [Variant 1](01-next-greater-element.js) — same mechanism, values instead of days

3. **Previous greater element** (common warm-up, no single canonical LeetCode number)
   - Task: for each element, find the nearest bigger element to its left
   - Pattern: [Variant 2](02-previous-greater-element.js) — decreasing stack, resolve immediately

4. **Next Greater Element II** (LeetCode 503)
   - Task: same as problem 2, but the array is circular
   - Pattern: [Variant 3](03-circular-next-greater.js) — variant 1, walked around twice

5. **Largest Rectangle in Histogram** (LeetCode 84)
   - Task: largest rectangular area under a histogram
   - Pattern: [Variant 4](04-largest-rectangle-histogram.js) — increasing stack, both directions at once, hardest classic

6. **Trapping Rain Water** (LeetCode 42)
   - Task: total water trapped between bars after raining
   - Pattern: [Variant 5](05-trapping-rain-water-stack.js) — stack-based; compare against the
     two-pointer solution in [02-two-pointers/03-running-max-both-sides.js](../02-two-pointers/03-running-max-both-sides.js)

7. **Remove K Digits** (LeetCode 402)
   - Task: remove k digits to form the smallest possible remaining number
   - Pattern: [Variant 6](06-remove-k-digits.js) — greedy stack construction

8. **Remove Duplicate Letters** (LeetCode 316)
   - Task: remove duplicate letters so each appears once, result is the smallest possible in lexicographic order
   - Pattern: [Variant 6](06-remove-k-digits.js)'s greedy-build shape, with a "can this letter still be
     re-added later" check replacing the fixed removal budget

## After this module
Move to `08-tree-bfs` (see [../index.md](../index.md)) — an unrelated
mechanism (level-order traversal via a queue), next on the roadmap.
