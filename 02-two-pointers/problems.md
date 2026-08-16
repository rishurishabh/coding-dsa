# Two Pointers — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Two Sum II — Input Array Is Sorted** (LeetCode 167)
   - Task: find the pair of indices whose values sum to target, in a sorted array
   - Pattern: [Variant 1](01-opposite-converging.js) — opposite ends, comparison-driven

2. **Valid Palindrome** (LeetCode 125)
   - Task: check whether a string reads the same forwards and backwards, ignoring non-alphanumerics
   - Pattern: [Variant 8](08-palindrome-check.js) — opposite ends, symmetry check

3. **Reverse String** (LeetCode 344)
   - Task: reverse a character array in place
   - Pattern: [Variant 9](09-in-place-reverse-swap.js) — opposite ends, unconditional swap

4. **Remove Duplicates from Sorted Array** (LeetCode 26)
   - Task: dedupe a sorted array in place, return the new length
   - Pattern: [Variant 4](04-read-write-pointers.js) — same-direction read/write

5. **Move Zeroes** (LeetCode 283)
   - Task: push all zeroes to the end in place, keeping the rest in order
   - Pattern: [Variant 4](04-read-write-pointers.js) — same-direction read/write

6. **Sort Colors** (LeetCode 75)
   - Task: sort an array of only 0s, 1s, 2s in place in one pass
   - Pattern: [Variant 5](05-three-pointers-partition.js) — three-pointer partition

7. **Container With Most Water** (LeetCode 11)
   - Task: find the two walls that trap the most water between them
   - Pattern: [Variant 2](02-move-the-smaller.js) — move the smaller side

8. **Trapping Rain Water** (LeetCode 42)
   - Task: total water trapped across the whole elevation map, not just two walls
   - Pattern: [Variant 3](03-running-max-both-sides.js) — running max on both sides

9. **3Sum** (LeetCode 15)
   - Task: all unique triplets that sum to zero
   - Pattern: [Variant 6](06-fix-one-two-pointer-rest.js) — fix one index, two-pointer the rest

10. **3Sum Closest** (LeetCode 16)
    - Task: the triplet sum closest to a target, not necessarily equal
    - Pattern: [Variant 6](06-fix-one-two-pointer-rest.js) — same reduction, track closest instead of exact

11. **Merge Sorted Array** (LeetCode 88)
    - Task: merge two sorted arrays in place
    - Pattern: [Variant 7](07-two-array-merge.js) — independent pointers on two sequences

12. **Is Subsequence** (LeetCode 392)
    - Task: check whether one string's characters appear in order within another
    - Pattern: [Variant 7](07-two-array-merge.js) — independent pointers on two sequences

13. **Valid Palindrome II** (LeetCode 680)
    - Task: check palindrome-ness allowing at most one character deletion
    - Pattern: [Variant 8](08-palindrome-check.js) — symmetry check with a one-mismatch branch

14. **Rotate Array** (LeetCode 189)
    - Task: rotate an array right by k in place, O(1) extra space
    - Pattern: [Variant 9](09-in-place-reverse-swap.js) — three reversals built from the same swap routine

15. **4Sum** (LeetCode 18)
    - Task: all unique quadruplets that sum to target
    - Pattern: [Variant 6](06-fix-one-two-pointer-rest.js) — fix two indices instead of one, same reduction

16. **Remove Nth Node From End of List** (LeetCode 19)
    - Task: delete the Nth node from the end of a linked list in one pass
    - Pattern: [Variant 10](10-fixed-gap.js) — fixed-gap pointers

17. **Kth Largest Element in an Array** (LeetCode 215)
    - Task: find the kth largest element without fully sorting
    - Pattern: [Variant 11](11-pivot-partition.js) — pivot partition (quickselect)

## After this module
Move to `03-fast-slow-pointers` (see [index.md](../index.md)) — same two-index
idea, but both pointers walk the *same* direction at different speeds (cycle
detection, finding the middle of a linked list) rather than converging from
opposite ends.
