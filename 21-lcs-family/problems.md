# LCS Family — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Longest Common Subsequence** (LeetCode 1143)
   - Task: length of the longest subsequence shared by two strings
   - Pattern: [Variant 1](01-longest-common-subsequence.js) — carry forward on mismatch

2. **Longest Common Substring** (classic — GeeksforGeeks, no single LeetCode number)
   - Task: length of the longest CONTIGUOUS run shared by two strings
   - Pattern: [Variant 2](02-longest-common-substring.js) — reset to 0 on mismatch

3. **Edit Distance** (LeetCode 72)
   - Task: minimum insert/delete/replace operations to turn one string into another
   - Pattern: [Variant 3](03-edit-distance.js) — three moves instead of two

4. **Longest Increasing Subsequence** (LeetCode 300)
   - Task: length of the longest strictly increasing subsequence in an array
   - Pattern: [Variant 4](04-longest-increasing-subsequence-dp.js) — O(n²) DP,
     then [Variant 5](05-longest-increasing-subsequence-binary-search.js) —
     O(n log n) greedy + binary search, same answer

5. **Delete Operation for Two Strings** (LeetCode 583)
   - Task: minimum deletions (only deletions, no insert/replace) to make two
     strings equal
   - Pattern: [Variant 1](01-longest-common-subsequence.js)'s reduction —
     `len(a) + len(b) - 2 * LCS(a, b)`

6. **Shortest Common Supersequence** (LeetCode 1092 — length only here)
   - Task: length of the shortest string containing both inputs as subsequences
   - Pattern: [Variant 6](06-shortest-common-supersequence-length.js) —
     `len(a) + len(b) - LCS(a, b)`

7. **Russian Doll Envelopes** (LeetCode 354)
   - Task: maximum number of envelopes that nest inside each other (2D LIS)
   - Pattern: [Variant 4](04-longest-increasing-subsequence-dp.js)/[Variant 5](05-longest-increasing-subsequence-binary-search.js) —
     sort by one dimension, run LIS on the other

## After this module
Move to `22-palindromic-subsequence` (see [../index.md](../index.md)) —
interval DP, a different grid shape where `dp[i][j]` spans a range
within ONE sequence instead of comparing two.
