# Fast & Slow Pointers — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Linked List Cycle** (LeetCode 141)
   - Task: determine whether a linked list has a cycle
   - Pattern: [Variant 1](01-cycle-detection.js) — meet-in-the-cycle

2. **Middle of the Linked List** (LeetCode 876)
   - Task: return the middle node in one pass
   - Pattern: [Variant 2](02-middle-of-list.js) — fast runs out first

3. **Linked List Cycle II** (LeetCode 142)
   - Task: return the node where the cycle begins, or null
   - Pattern: [Variant 1](01-cycle-detection.js) — reset-to-head after meeting

4. **Happy Number** (LeetCode 202)
   - Task: determine whether repeatedly summing squared digits reaches 1
   - Pattern: [Variant 3](03-cycle-in-implicit-sequence.js) — cycle detection on a function-defined sequence

5. **Find the Duplicate Number** (LeetCode 287)
   - Task: find the one duplicate in an array of n+1 values in [1,n], O(1) space, without mutating
   - Pattern: [Variant 3](03-cycle-in-implicit-sequence.js) — array-as-implicit-linked-list

6. **Palindrome Linked List** (LeetCode 234)
   - Task: check whether a linked list reads the same forwards and backwards, O(1) space
   - Pattern: [Variant 5](05-middle-plus-reverse.js) — find middle, reverse second half, compare

7. **Reorder List** (LeetCode 143)
   - Task: reorder L0→L1→…→Ln into L0→Ln→L1→Ln-1→…
   - Pattern: [Variant 5](05-middle-plus-reverse.js)'s same building blocks (middle + reverse), merged instead of compared

8. **Cycle length practice** (no single canonical LeetCode number — build on problem 3)
   - Task: given a cyclic list, report how many nodes are in the cycle itself
   - Pattern: [Variant 4](04-cycle-length-and-alt-start.js) — count a lap from the meeting node

## After this module
Move to `04-merge-intervals` (see [../index.md](../index.md)). It's an unrelated
mechanism (sort by start, then sweep), but a natural next stop on the roadmap.
