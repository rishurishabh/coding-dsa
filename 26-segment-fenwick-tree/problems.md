# Segment Tree / Fenwick Tree — Practice Problems

Work in this order; each problem introduces one new capability.

1. **Range Sum Query - Mutable** (LeetCode 307)
   - Task: support point updates and range sum queries on an array
   - Pattern: [Variant 1](01-segment-tree-range-sum.js) or [Variant 2](02-fenwick-tree-range-sum.js) — both solve this directly

2. **Range Sum Query 2D - Mutable** (LeetCode 308)
   - Task: same, extended to a 2D grid
   - Pattern: [Variant 2](02-fenwick-tree-range-sum.js)'s idea, one Fenwick tree per dimension

3. **Range Addition** (LeetCode 370)
   - Task: apply a batch of range-add updates, then return the final array
   - Pattern: [Variant 3](03-segment-tree-lazy-propagation.js) or [Variant 4](04-fenwick-range-update-point-query.js) — range update, point query

4. **My Calendar III** (LeetCode 732)
   - Task: track the maximum number of overlapping bookings at any point, as bookings are added one at a time
   - Pattern: [Variant 3](03-segment-tree-lazy-propagation.js)'s range-update shape, tracking max instead of sum

5. **Count of Smaller Numbers After Self** (LeetCode 315)
   - Task: for each element, count how many elements to its right are smaller
   - Pattern: [Variant 5](05-count-smaller-after-self.js) — Fenwick tree for order statistics

6. **Count of Range Sum** (LeetCode 327)
   - Task: count subarrays whose sum falls within a given range
   - Pattern: [Variant 5](05-count-smaller-after-self.js)'s coordinate-compression + BIT-counting idea, applied to prefix sums instead of raw values

## After this module
See [../index.md](../index.md) for what's left — Graph Shortest Path, the
last module in the roadmap.
