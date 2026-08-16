# Sorting Algorithms — Practice Problems

Work in this order; each implementation builds intuition the next one leans on.

1. **Implement Bubble Sort** (no LeetCode number — classic exercise)
   - Task: sort an array using only adjacent swaps
   - Pattern: [Variant 1](01-bubble-sort.js) — repeated adjacent swaps

2. **Implement Selection Sort** (classic exercise)
   - Task: sort an array by repeatedly selecting the minimum remaining element
   - Pattern: [Variant 2](02-selection-sort.js) — repeated find-min-and-place

3. **Implement Insertion Sort** (classic exercise) / **Sort a Nearly Sorted Array**
   - Task: sort an array by growing a sorted prefix one element at a time
   - Pattern: [Variant 3](03-insertion-sort.js) — grow a sorted prefix

4. **Sort an Array** (LeetCode 912)
   - Task: sort an array of integers — implement it with merge sort
   - Pattern: [Variant 4](04-merge-sort.js) — divide, merge on the way back up

5. **Sort an Array** (LeetCode 912, quicksort variant)
   - Task: same problem, implemented with quicksort instead
   - Pattern: [Variant 5](05-quick-sort.js) — divide via partition

6. **Kth Largest Element in an Array** (LeetCode 215, revisited)
   - Task: compare a full heap sort against [14-top-k-elements/01-kth-largest-heap.js](../14-top-k-elements/01-kth-largest-heap.js)'s
     fixed-size heap — sorting everything vs. keeping only the top K
   - Pattern: [Variant 6](06-heap-sort.js) — heapify, then repeated extract-max

7. **Sort Colors** (LeetCode 75)
   - Task: sort an array of only 0s, 1s, and 2s in one pass
   - Pattern: [Variant 7](07-counting-sort.js)'s idea, specialized to exactly 3 buckets —
     compare against the three-pointer partition in
     [02-two-pointers/05-three-pointers-partition.js](../02-two-pointers/05-three-pointers-partition.js)

8. **Maximum Gap** (LeetCode 164)
   - Task: find the maximum gap between sorted consecutive elements in linear time
   - Pattern: [Variant 7](07-counting-sort.js)'s non-comparison idea, generalized to bucketing

## After this module
Move to `01-sliding-window` (see [../index.md](../index.md)) — the first of
the 27 interview patterns.
