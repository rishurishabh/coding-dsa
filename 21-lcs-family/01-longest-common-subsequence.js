// Pattern: 2D DP over two sequences — dp[i][j] holds the answer for the
// first i characters of a and the first j characters of b. A match
// extends the diagonal; a mismatch carries forward the better of dropping
// one character from either side.
// When:
//   - given two sequences, find the length (or the sequence itself) of
//     the longest subsequence common to both — characters need not be
//     contiguous or aligned, only in the same relative order
// Why:
//   - if a[i-1] === b[j-1], that character can always be part of an
//     optimal LCS, so dp[i][j] = dp[i-1][j-1] + 1 — one step deeper on
//     the diagonal, using both characters up
//   - otherwise at least one of the two characters contributes nothing
//     here, so dp[i][j] = the better of ignoring a[i-1] (look at dp[i-1][j])
//     or ignoring b[j-1] (look at dp[i][j-1])

function longestCommonSubsequence(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[a.length][b.length];
}

// Demo
if (require.main === module) {
  console.log(longestCommonSubsequence("abcde", "ace")); // 3 ("ace")
  console.log(longestCommonSubsequence("abc", "def")); // 0 (nothing shared)
}

module.exports = { longestCommonSubsequence };
