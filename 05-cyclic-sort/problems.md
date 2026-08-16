# Cyclic Sort — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Sort an array containing 1 to n** (common warm-up, no single canonical LeetCode number)
   - Task: sort an array of n distinct values from 1 to n, in place, O(n) time
   - Pattern: [Variant 1](01-basic-placement.js) — the placement loop itself

2. **Missing Number** (LeetCode 268)
   - Task: n distinct numbers from [0,n], find the one missing
   - Pattern: [Variant 2](02-find-missing-number.js) — first mismatch

3. **Find All Numbers Disappeared in an Array** (LeetCode 448)
   - Task: array of size n, values in [1,n], find every value that never appears
   - Pattern: [Variant 3](03-find-all-missing.js) — every mismatch, missing side

4. **Find the Duplicate Number** (LeetCode 287)
   - Task: n+1 numbers in [1,n], find the one duplicate — compare this
     approach to [03-fast-slow-pointers](../03-fast-slow-pointers/03-cycle-in-implicit-sequence.js)'s
     Floyd's-cycle solution to the same problem
   - Pattern: [Variant 4](04-find-duplicates.js) — every mismatch, duplicate side

5. **Find All Duplicates in an Array** (LeetCode 442)
   - Task: array of size n, values in [1,n], each appearing once or twice — find all that appear twice
   - Pattern: [Variant 4](04-find-duplicates.js) — same mechanism, collect instead of stopping

6. **Set Mismatch** (LeetCode 645)
   - Task: exactly one value is duplicated and exactly one is missing — return both
   - Pattern: [Variant 5](05-corrupt-pair.js) — one mismatch, two answers

7. **First Missing Positive** (LeetCode 41)
   - Task: arbitrary integers (negatives, zeros, huge values allowed) — find the smallest missing positive
   - Pattern: [Variant 6](06-first-missing-positive.js) — placement with a range guard, the hardest classic

## After this module
Move to `06-in-place-linked-list-reversal` (see [../index.md](../index.md)) —
an unrelated mechanism (pointer relinking), next on the roadmap.
