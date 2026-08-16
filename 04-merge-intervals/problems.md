# Merge Intervals — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Merge Intervals** (LeetCode 56)
   - Task: merge all overlapping intervals into their union
   - Pattern: [Variant 1](01-merge-overlapping.js) — sort by start, sweep-merge

2. **Insert Interval** (LeetCode 57)
   - Task: insert a new interval into a sorted, non-overlapping list and merge as needed
   - Pattern: [Variant 2](02-insert-interval.js) — three-phase scan, no re-sort

3. **Interval List Intersections** (LeetCode 986)
   - Task: find every overlap between two sorted, non-overlapping interval lists
   - Pattern: [Variant 3](03-interval-intersection.js) — two-pointer across two lists

4. **Meeting Rooms** (LeetCode 252)
   - Task: determine whether a person can attend all meetings (any overlap at all?)
   - Pattern: [Variant 1](01-merge-overlapping.js) — sort by start, check adjacent pairs

5. **Meeting Rooms II** (LeetCode 253)
   - Task: minimum number of rooms needed to host every meeting
   - Pattern: [Variant 4](04-max-overlap-sweep.js) — separate start/end sweep

6. **Non-overlapping Intervals** (LeetCode 435)
   - Task: minimum number of intervals to remove so the rest don't overlap
   - Pattern: [Variant 5](05-greedy-non-overlapping.js) — sort by end, greedy keep/drop

7. **Employee Free Time** (LeetCode 759)
   - Task: find every time interval free across ALL employees' schedules
   - Pattern: [Variant 6](06-free-time-gaps.js) — merge, then read the complement

8. **Minimum Number of Arrows to Burst Balloons** (LeetCode 452)
   - Task: minimum points needed so every interval contains at least one point
   - Pattern: [Variant 5](05-greedy-non-overlapping.js) — same greedy-by-end shape, framed as covering instead of removing

9. **Car Pooling** (LeetCode 1094)
   - Task: determine whether a car's capacity is ever exceeded given pickup/dropoff events
   - Pattern: [Variant 4](04-max-overlap-sweep.js) — same start/end sweep, weighted by passenger count instead of counting +1/−1

## After this module
Move to `05-cyclic-sort` (see [../index.md](../index.md)) — an unrelated
mechanism (index-value placement), next on the roadmap.
