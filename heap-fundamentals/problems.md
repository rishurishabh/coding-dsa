# Heap Fundamentals — Practice Problems

1. **By hand, no code**: given `[4, 10, 3, 5, 1]`, is it a valid max-heap?
   A valid min-heap? Neither? Check your answer with
   [01-heap-property-check.js](01-heap-property-check.js).

2. **Build a Heap** (LeetCode 1046 "Last Stone Weight" is a good
   real-use warmup once you've read the README)
   - Task: repeatedly take the two largest values and combine them
   - Pattern: [Variant 1 & 2](02-heapify-array.js) — a max-heap gives you
     "the largest" at index 0 for free, every time

3. **Kth Largest Element in an Array** (LeetCode 215)
   - Task: find the kth largest value
   - Pattern: build a min-heap of size k — the root is always the
     candidate to evict; see [02-heapify-array.js](02-heapify-array.js)'s
     `buildMinHeap` for the core piece, then
     [14-top-k-elements](../14-top-k-elements/README.md) for the full
     interview-pattern version

4. **Explain it back, no code**: in your own words, why doesn't storing a
   heap (data structure) in JavaScript's memory heap mean the array is
   "more of a heap" than one that isn't heap-ordered? If you can answer
   that clearly, the vs-memory-heap section landed.

## After this module
This page is meant to be read before
[data-structures/06-heap-priority-queue](../data-structures/06-heap-priority-queue/README.md)
(the full from-scratch build) and before the patterns that use a heap as
a building block:
[13-two-heaps](../13-two-heaps/README.md),
[14-top-k-elements](../14-top-k-elements/README.md), and
[15-k-way-merge](../15-k-way-merge/README.md).
