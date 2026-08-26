# Palindromic Subsequence — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Longest Palindromic Substring** (LeetCode 5)
   - Task: the longest contiguous palindromic run in a string
   - Pattern: [Variant 2](02-longest-palindromic-substring.js) — boolean interval DP

2. **Palindromic Substrings** (LeetCode 647)
   - Task: count every palindromic substring
   - Pattern: [Variant 3](03-count-palindromic-substrings.js) — same table, counted

3. **Longest Palindromic Subsequence** (LeetCode 516)
   - Task: the longest palindrome allowing gaps (not contiguous)
   - Pattern: [Variant 1](01-longest-palindromic-subsequence.js) — length, carried forward on a mismatch

4. **Minimum Insertion Steps to Make a String Palindrome** (LeetCode 1312)
   - Task: fewest insertions to turn a string into a palindrome
   - Pattern: [Variant 4](04-minimum-insertions-to-palindrome.js) — minimum cost interval DP

5. **Palindrome Partitioning II** (LeetCode 132)
   - Task: fewest cuts to split a string into all-palindrome pieces
   - Pattern: [Variant 5](05-palindrome-partitioning-min-cuts.js) — boolean table feeding a second DP

6. **Palindrome Partitioning** (LeetCode 131)
   - Task: return every possible way to split a string into palindromic pieces
   - Pattern: [Variant 2](02-longest-palindromic-substring.js)'s boolean table, used to prune a
     backtracking search — see also
     [17-subsets-backtracking](../17-subsets-backtracking/README.md) for the traversal itself

## After this module
Move to `23-dp-on-grids` (see [../index.md](../index.md)) — a different
DP grid shape again: `dp[i][j]` indexes literal grid coordinates,
filled row by row, not string intervals filled by length.
