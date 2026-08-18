# Hash Map — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Design HashMap** (LeetCode 706)
   - Task: implement get/put/remove from scratch, no built-in Map/Object
   - Pattern: [Variant 1](01-hash-map-chaining.js) or [Variant 2](02-hash-map-open-addressing.js) —
     either collision strategy satisfies the interface

2. **Two Sum** (LeetCode 1)
   - Task: find two numbers in an array that sum to a target, in one pass
   - Pattern: [Variant 3](03-two-sum.js) — O(1) complement lookup

3. **Group Anagrams** (LeetCode 49)
   - Task: group strings that are anagrams of each other
   - Pattern: [Variant 4](04-group-anagrams.js) — canonical-key grouping

4. **Longest Consecutive Sequence** (LeetCode 128)
   - Task: longest run of consecutive integers, in O(n), without sorting
   - Pattern: [Variant 5](05-longest-consecutive-sequence.js) — set membership,
     only walk a run from its true start

5. **Contains Duplicate** (LeetCode 217)
   - Task: does any value appear more than once in the array
   - Pattern: [Variant 3](03-two-sum.js)'s shape, simplified — a set instead
     of a map, since only existence matters, not a paired index

6. **Subarray Sum Equals K** (LeetCode 560)
   - Task: count subarrays summing to exactly K
   - Pattern: [Variant 3](03-two-sum.js)'s "seen before" idea, applied to
     prefix sums instead of raw values — see also
     [04-merge-intervals](../../04-merge-intervals/README.md)'s prefix-sum
     relatives for the running-total technique itself

## After this module
Move to `05-binary-search-tree` (see [../index.md](../index.md)) — a
structure that gets ordering "for free" (sorted traversal) the way a
hash map gets lookup "for free," at the cost of losing O(1) access.
