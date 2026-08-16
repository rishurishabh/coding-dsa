# Modified Binary Search — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Binary Search** (LeetCode 704)
   - Task: find a target's index in a sorted array
   - Pattern: [Variant 1](01-classic-binary-search.js) — compare to a target

2. **Search in Rotated Sorted Array** (LeetCode 33)
   - Task: find a target in a sorted array rotated at an unknown pivot
   - Pattern: [Variant 2](02-search-rotated-array.js) — identify the sorted half, then search it

3. **Find Minimum in Rotated Sorted Array** (LeetCode 153)
   - Task: find the rotation point (minimum value) itself
   - Pattern: [Variant 3](03-find-minimum-rotated.js) — no target, a structural condition

4. **Find First and Last Position of Element in Sorted Array** (LeetCode 34)
   - Task: find the first and last index of a repeated target
   - Pattern: [Variant 4](04-first-last-position.js) — keep narrowing past a match

5. **Search a 2D Matrix** (LeetCode 74)
   - Task: search a fully-sorted matrix for a target
   - Pattern: [Variant 5](05-search-2d-matrix.js) — map 2D index space onto 1D

6. **Koko Eating Bananas** (LeetCode 875)
   - Task: minimum eating speed to finish all banana piles within h hours
   - Pattern: [Variant 6](06-binary-search-on-answer.js) — search a space of answers, hardest classic

7. **Find Peak Element** (LeetCode 162)
   - Task: find any local peak in an unsorted array
   - Pattern: [Variant 7](07-find-peak-element.js) — compare only to one neighbor

8. **Capacity To Ship Packages Within D Days** (LeetCode 1011)
   - Task: minimum ship capacity to deliver all packages within d days
   - Pattern: [Variant 6](06-binary-search-on-answer.js)'s shape — same
     answer-space search, different feasibility check

## After this module
Move to `17-subsets-backtracking` (see [../index.md](../index.md)) — the
second half of the Search section.
