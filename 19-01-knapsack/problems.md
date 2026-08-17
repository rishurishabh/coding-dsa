# 0/1 Knapsack — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **0/1 Knapsack** (classic — GeeksforGeeks/Grokking, no single LeetCode number)
   - Task: maximize value of items packed under a weight capacity, each item usable once
   - Pattern: [Variant 1](01-knapsack-max-value.js) — include-or-exclude, maximize value

2. **Partition Equal Subset Sum** (LeetCode 416)
   - Task: can the array split into two subsets with equal sums
   - Pattern: [Variant 2](02-subset-sum-exists.js) + [Variant 3](03-equal-subset-partition.js) —
     boolean reachability, reduced from a partition question

3. **Target Sum** (LeetCode 494)
   - Task: count sign assignments (+/-) that make the array sum to a target
   - Pattern: [Variant 4](04-count-subsets-with-sum.js) + [Variant 5](05-target-sum-assignment.js) —
     counting, reduced via algebra

4. **Last Stone Weight II** (LeetCode 1049)
   - Task: minimize the final stone weight after repeatedly smashing pairs together
   - Pattern: [Variant 6](06-minimum-subset-sum-difference.js) — same DP, framed as
     minimizing a split difference

5. **Partition to K Equal Sum Subsets** (LeetCode 698)
   - Task: can the array split into K subsets of equal sum (generalizes problem 2)
   - Pattern: [Variant 3](03-equal-subset-partition.js)'s reduction idea, extended —
     usually solved with backtracking + this module's reachability check as a pruning step

6. **Count of Subset Sum** (classic — GeeksforGeeks, related to LeetCode 494)
   - Task: count subsets summing to exactly a target, standalone (not via sign assignment)
   - Pattern: [Variant 4](04-count-subsets-with-sum.js) — counting, direct application

## After this module
Move to `20-unbounded-knapsack` (see [../index.md](../index.md)) — the same
include/exclude idea, but items can be reused an unlimited number of times.
