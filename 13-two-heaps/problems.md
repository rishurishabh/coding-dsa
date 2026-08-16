# Two Heaps — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Find Median from Data Stream** (LeetCode 295)
   - Task: report the median after each number is added to a growing stream
   - Pattern: [Variant 1](01-running-median.js) — two balanced heaps

2. **Sliding Window Median** (LeetCode 480)
   - Task: report the median of every fixed-size window as it slides across an array
   - Pattern: [Variant 2](02-sliding-window-median.js) — balanced heaps + lazy deletion

3. **IPO** (LeetCode 502)
   - Task: pick up to k projects to maximize final capital, respecting each
     project's minimum capital requirement
   - Pattern: [Variant 3](03-ipo-greedy-unlock.js) — gate heap + pick heap

4. **Process Tasks Using Servers** (LeetCode 1882)
   - Task: assign incoming tasks to the lowest-weight available server,
     where servers become available again after finishing their current task
   - Pattern: [Variant 3](03-ipo-greedy-unlock.js)'s shape — the "gate" here is a
     finish-TIME instead of a capital threshold, but it's the same
     unlock-then-greedily-pick structure

## After this module
Move to `14-top-k-elements` (see [../index.md](../index.md)) — a single
priority queue this time, kept at a fixed size k instead of split into two.
