// Pattern: interval DP again, but dp[i][j] now holds a MINIMUM COST
// (insertions needed) instead of a length or a boolean — the recurrence
// shape carries over, only the value being tracked changes.
// When:
//   - turning a string into a palindrome by inserting characters, with
//     the fewest insertions possible
// Why:
//   - if the ends already match, they contribute zero cost — the answer
//     is exactly whatever the inside interval needs: dp[i][j] = dp[i+1][j-1]
//   - if they don't match, one insertion has to fix ONE of the two
//     ends (either mirror the left character on the right, or the right
//     character on the left) — try both, keep the cheaper: dp[i][j] =
//     1 + min(dp[i+1][j], dp[i][j-1])
//   - this is the same recurrence shape as
//     [03-edit-distance.js](../21-lcs-family/03-edit-distance.js), just
//     over ONE string's intervals instead of two strings' prefixes — and
//     the answer equals n − (variant 1's longest palindromic subsequence
//     length), since every character NOT in that subsequence needs a
//     mirrored partner inserted

function minInsertionsToPalindrome(s) {
  const n = s.length;
  if (n === 0) return 0;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      if (s[i] === s[j]) {
        dp[i][j] = len === 2 ? 0 : dp[i + 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][n - 1];
}

// Demo
if (require.main === module) {
  console.log(minInsertionsToPalindrome("mbadm")); // 2 -> "mbdadbm" or "mdbabdm"
  console.log(minInsertionsToPalindrome("leetcode")); // 5
}

module.exports = { minInsertionsToPalindrome };
