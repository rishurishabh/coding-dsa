# Sliding Window — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Maximum Sum Subarray of Size K**
   - Task: find the max sum among all contiguous subarrays of length `k`
   - Pattern: [Variant 1](01-fixed-size.js) — fixed-size window

2. **Minimum Size Subarray Sum** (LeetCode 209)
   - Task: find the shortest contiguous subarray whose sum >= target
   - Pattern: [Variant 2](02-variable-size.js) — variable-size window

3. **Longest Substring Without Repeating Characters** (LeetCode 3)
   - Task: find the length of the longest substring with no repeated character
   - Pattern: [Variant 6](06-two-pointer-last-seen.js) — last-seen-index jump

4. **Fruit Into Baskets** (LeetCode 904)
   - Task: equivalent to "longest substring with at most 2 distinct characters"
   - Pattern: [Variant 3](03-at-most-k.js) — at-most-K distinct window

5. **Subarrays with K Different Integers** (LeetCode 992)
   - Task: count subarrays with exactly K distinct integers
   - Pattern: [Variant 3](03-at-most-k.js) — exactly(K) = atMost(K) - atMost(K-1)

6. **Find All Anagrams in a String** (LeetCode 438)
   - Task: return every start index where a substring is an anagram of `p`
   - Pattern: [Variant 4](04-frequency-map.js) — fixed-size window + frequency map

7. **Minimum Window Substring** (LeetCode 76)
   - Task: find the shortest substring of `s` containing every character of `t`
   - Pattern: [Variant 4](04-frequency-map.js) — variable-size window + frequency map (hardest classic)

8. **Sliding Window Maximum** (LeetCode 239)
   - Task: find the max of every contiguous window of size `k`
   - Pattern: [Variant 5](05-monotonic-deque.js) — monotonic deque

9. **Longest Repeating Character Replacement** (LeetCode 424)
   - Task: longest substring achievable by replacing at most K characters with any single letter
   - Pattern: [Variant 7](07-at-most-k-changes.js) — at-most-K-violations window

10. **Max Consecutive Ones III** (LeetCode 1004)
    - Task: longest run of 1s achievable by flipping at most K zeros
    - Pattern: [Variant 7](07-at-most-k-changes.js) — at-most-K-violations window

11. **Shortest Subarray with Sum at Least K** (LeetCode 862)
    - Task: same goal as problem 2, but the array may contain negative numbers
    - Pattern: [Variant 8](08-prefix-sum-deque.js) — prefix sum + monotonic deque

12. **Permutation in String** (LeetCode 567)
    - Task: check whether `s2` contains a contiguous permutation of `s1`
    - Pattern: [Variant 4](04-frequency-map.js) — fixed-size window + frequency map

13. **Longest Substring with At Most K Distinct Characters** (LeetCode 340)
    - Task: generalizes problem 4 to any K, not just 2
    - Pattern: [Variant 3](03-at-most-k.js) — at-most-K distinct window

14. **Subarray Product Less Than K** (LeetCode 713)
    - Task: count subarrays whose product is strictly less than K
    - Pattern: [Variant 2](02-variable-size.js) — variable-size window, product instead of sum

15. **Maximum Sum of Distinct Subarrays with Length K** (LeetCode 2461)
    - Task: max sum among length-`k` subarrays whose elements are all distinct
    - Pattern: [Variant 1](01-fixed-size.js) + [Variant 4](04-frequency-map.js) combined

16. **Longest Nice Subarray** (LeetCode 2401)
    - Task: longest subarray where every pair of elements has bitwise AND == 0
    - Pattern: [Variant 9](09-bitmask-window.js) — OR-bitmask window, shrink via XOR on conflict

17. **Find the Longest Substring Containing Vowels in Even Counts** (LeetCode 1371)
    - Task: longest substring where every vowel appears an even number of times
    - Pattern: [Variant 9](09-bitmask-window.js) — XOR-parity prefix bitmask + hashmap of earliest index

## After this module
Move to `02-two-pointers` (see [index.md](../index.md)). Many "variable-size
window" problems are a special case of two pointers, and vice versa — worth
studying the boundary between the two patterns once both are comfortable.
