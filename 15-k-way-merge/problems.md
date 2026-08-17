# K-way Merge — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Merge k Sorted Lists** (LeetCode 23)
   - Task: merge K sorted linked lists into one sorted list
   - Pattern: [Variant 1](01-merge-k-lists.js) — one heap slot per source, linked lists

2. **Merge K Sorted Arrays** (classic — GeeksforGeeks, no single LeetCode number)
   - Task: same idea, K sorted arrays instead of linked lists
   - Pattern: [Variant 2](02-merge-k-sorted-arrays.js) — same mechanism, tracked by indices

3. **Kth Smallest Element in a Sorted Matrix** (LeetCode 378)
   - Task: Kth smallest value in a row- and column-sorted matrix
   - Pattern: [Variant 3](03-kth-smallest-in-matrix.js) — variant 2's merge, stopped early

4. **Smallest Range Covering Elements from K Lists** (LeetCode 632)
   - Task: smallest range containing at least one element from each of K sorted lists
   - Pattern: [Variant 4](04-smallest-range-k-lists.js) — variant 2's merge, read as a window, hardest classic

5. **Find K Pairs with Smallest Sums** (LeetCode 373)
   - Task: the k pairs (one from each of two sorted arrays) with the smallest sums
   - Pattern: [Variant 5](05-k-pairs-smallest-sums.js) — a virtual merge over generated sources

## After this module
Move to `20-unbounded-knapsack` (see [../index.md](../index.md)) — the
Dynamic Programming module that was next before this gap was filled.
