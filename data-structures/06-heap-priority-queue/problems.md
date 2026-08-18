# Heap / Priority Queue — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Kth Largest Element in an Array** (LeetCode 215)
   - Task: the kth largest value in a static array
   - Pattern: [Variant 1](01-array-heap-core.js) — push everything, pop k-1 times

2. **Kth Largest Element in a Stream** (LeetCode 703)
   - Task: same question, but values arrive one at a time and every
     arrival needs an answer
   - Pattern: [Variant 3](03-kth-largest-in-stream.js) — size-capped min-heap

3. **Task Scheduler** (LeetCode 621)
   - Task: minimum time to run all tasks with a mandatory cooldown between
     repeats of the same task
   - Pattern: [Variant 4](04-task-scheduler.js) — max-heap of frequencies

4. **Meeting Rooms II** (LeetCode 253)
   - Task: minimum number of rooms needed for a set of overlapping meetings
   - Pattern: [Variant 5](05-meeting-rooms-ii.js) — min-heap of end times

5. **Sort an Array** (LeetCode 912, heap sort approach)
   - Task: sort an array using a heap instead of merge/quick sort
   - Pattern: [Variant 2](02-heapify-build-heap.js) — heapify, then repeatedly
     pop the root; see also the dedicated heap sort implementation in
     [00-sorting-algorithms](../../00-sorting-algorithms/README.md)

6. **Find Median from Data Stream** (LeetCode 295)
   - Task: running median as values stream in
   - Pattern: covered in [13-two-heaps](../../13-two-heaps/README.md),
     built on this module's [Variant 1](01-array-heap-core.js) heap shape

## After this module
See [../index.md](../index.md) for what's left in the Data Structures
track — Trie and Graph.
