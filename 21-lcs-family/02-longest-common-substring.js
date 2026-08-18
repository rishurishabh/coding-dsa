// Pattern: same 2D grid as LCS, but a mismatch RESETS to 0 instead of
// carrying forward the best-so-far — because a substring must stay
// contiguous, a broken run can't be patched back together.
// When:
//   - given two sequences, find the length of the longest run that
//     appears CONTIGUOUSLY in both — unlike variant 1, gaps are not
//     allowed on either side
// Why:
//   - dp[i][j] means "length of the common run ENDING exactly at a[i-1]
//     and b[j-1]" — not "best answer using the first i and j characters"
//   - a match extends the run from the diagonal, same as LCS: dp[i][j] =
//     dp[i-1][j-1] + 1
//   - a mismatch breaks the run entirely — there's no fallback to
//     "ignore one character and keep going" like variant 1 has, so
//     dp[i][j] = 0, and the answer is the MAX over every cell, not just
//     the bottom-right corner

function longestCommonSubstring(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  let longest = 0;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        longest = Math.max(longest, dp[i][j]);
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return longest;
}

// Demo
if (require.main === module) {
  console.log(longestCommonSubstring("abcdxyz", "xyzabcd")); // 4 ("abcd")
  console.log(longestCommonSubstring("abcde", "ace")); // 1 (no contiguous run longer than 1)
}

module.exports = { longestCommonSubstring };
