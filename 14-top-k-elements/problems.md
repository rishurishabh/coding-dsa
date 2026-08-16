# Top K Elements — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Kth Largest Element in an Array** (LeetCode 215)
   - Task: find the Kth largest value in an unsorted array
   - Pattern: [Variant 1](01-kth-largest-heap.js) — fixed-size min-heap

2. **Top K Frequent Elements** (LeetCode 347)
   - Task: return the k most frequent elements
   - Pattern: [Variant 2](02-top-k-frequent.js) — same heap, keyed by a derived count

3. **K Closest Points to Origin** (LeetCode 973)
   - Task: return the k points closest to (0,0)
   - Pattern: [Variant 3](03-k-closest-points.js) — same heap, direction flipped to max

4. **Kth Largest Element in a Stream** (LeetCode 703)
   - Task: design a class reporting the Kth largest value after each addition
   - Pattern: [Variant 4](04-kth-largest-stream.js) — persistent heap across calls

5. **Top K Frequent Words** (LeetCode 692)
   - Task: k most frequent words, ties broken alphabetically
   - Pattern: [Variant 5](05-top-k-frequent-words.js) — two-part comparator, hardest classic

6. **Sort Characters By Frequency** (LeetCode 451)
   - Task: rearrange a string so characters appear in decreasing frequency order
   - Pattern: [Variant 2](02-top-k-frequent.js)'s shape — set k to "all distinct characters"
     instead of stopping at a fixed count

## After this module
Move to `15-k-way-merge` (see [../index.md](../index.md)) — a single heap
again, but holding one candidate per SOURCE (list/array) instead of one
candidate per element.
