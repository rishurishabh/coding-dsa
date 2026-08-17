# Subsets / Backtracking — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Subsets** (LeetCode 78)
   - Task: return every subset of a set of distinct integers
   - Pattern: [Variant 1](01-subsets-include-exclude.js) — choose forward from `start`

2. **Subsets II** (LeetCode 90)
   - Task: same, but the input has duplicates — every subset must be unique
   - Pattern: [Variant 2](02-subsets-with-duplicates.js) — variant 1 + same-level duplicate skip

3. **Permutations** (LeetCode 46)
   - Task: return every ordering of a set of distinct integers
   - Pattern: [Variant 3](03-permutations.js) — loop restarts from 0, tracked by `used`

4. **Combination Sum** (LeetCode 39)
   - Task: every combination of reusable numbers summing to a target
   - Pattern: [Variant 4](04-combination-sum.js) — recurse with `i`, not `i+1`

5. **Palindrome Partitioning** (LeetCode 131)
   - Task: every way to partition a string into palindromic pieces
   - Pattern: [Variant 5](05-palindrome-partitioning.js) — the choice is where to cut

6. **N-Queens** (LeetCode 51)
   - Task: place n queens on an n×n board so none attack each other
   - Pattern: [Variant 6](06-n-queens.js) — constraint satisfaction, hardest classic

7. **Word Search** (LeetCode 79)
   - Task: does a word exist as a path of adjacent grid cells
   - Pattern: [Variant 7](07-word-search.js) — backtracking on a grid

8. **Combination Sum II** (LeetCode 40)
   - Task: combinations summing to a target, each number usable at most once, no duplicate combinations
   - Pattern: [Variant 2](02-subsets-with-duplicates.js)'s duplicate-skip combined with
     [Variant 4](04-combination-sum.js)'s target-sum pruning

## After this module
Move to `18-bitwise-xor` (already built, see [../index.md](../index.md)) or
continue the Search section's neighbor,
[16-modified-binary-search](../16-modified-binary-search/README.md), if
skipped earlier.
