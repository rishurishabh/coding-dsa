# Queue — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Design Circular Queue** (LeetCode 622)
   - Task: implement a fixed-capacity FIFO queue with isFull/isEmpty checks
   - Pattern: [Variant 1](01-array-queue.js) + [Variant 5](05-design-circular-queue.js) —
     circular buffer, exposed with an explicit capacity

2. **Implement Queue using Stacks** (LeetCode 232)
   - Task: build FIFO behavior out of two stack primitives
   - Pattern: [Variant 3](03-queue-using-two-stacks.js) — two reversals cancel out

3. **Sliding Window Maximum** (LeetCode 239)
   - Task: the maximum of every fixed-size window in an array, in O(n)
   - Pattern: [Variant 4](04-sliding-window-maximum.js) — monotonic deque

4. **Number of Recent Calls** (LeetCode 933)
   - Task: count how many requests landed within the last 3000ms of a stream
   - Pattern: [Variant 2](02-linked-list-queue.js)'s shape — enqueue every call,
     dequeue from the front while it's too old

5. **Design Hit Counter** (LeetCode 362)
   - Task: count hits in the past 5 minutes as they stream in
   - Pattern: [Variant 1](01-array-queue.js) or [Variant 2](02-linked-list-queue.js) —
     same "evict from the front while stale" shape as problem 4, generalized

6. **Rotting Oranges** (LeetCode 994)
   - Task: multi-source BFS, minutes until every orange rots
   - Pattern: any queue variant as the BFS frontier — see also
     [10-graph-bfs-dfs](../../10-graph-bfs-dfs/README.md) for the traversal pattern itself

## After this module
Move to `03-linked-list` (see [../index.md](../index.md)) — queue's
linked-list variant already builds nodes with a `next` pointer; this
next module builds out full CRUD on that same node shape.
