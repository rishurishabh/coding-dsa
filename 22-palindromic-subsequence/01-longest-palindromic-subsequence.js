// Pattern: interval DP — dp[i][j] answers a question about the substring
// s[i..j], built by increasing INTERVAL LENGTH rather than row-by-row.
// Every cell depends only on strictly shorter intervals, so filling by
// length guarantees those are already done.
// When:
//   - the question is about a substring/subarray BOUNDARY pair (i, j)
//     within a SINGLE sequence — not two sequences like
//     [21-lcs-family](../21-lcs-family/README.md), and not a fixed
//     window like [01-sliding-window](../01-sliding-window/README.md)
// Why:
//   - if the two ends match (s[i] === s[j]), both characters can be part
//     of the answer: they wrap a smaller palindromic subsequence found
//     inside s[i+1..j-1], so dp[i][j] = dp[i+1][j-1] + 2
//   - if they don't match, at least one end contributes nothing here —
//     dp[i][j] is the better of dropping the left end (dp[i+1][j]) or
//     the right end (dp[i][j-1])
//   - single characters are trivially a palindrome of length 1
//     (dp[i][i] = 1) — the base case every larger interval eventually
//     bottoms out at

function longestPalindromicSubsequence(s) {
  const n = s.length;
  if (n === 0) return 0;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 0; i < n; i++) dp[i][i] = 1;

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      if (s[i] === s[j]) {
        dp[i][j] = (len === 2 ? 0 : dp[i + 1][j - 1]) + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][n - 1];
}

// Demo
if (require.main === module) {
  console.log(longestPalindromicSubsequence("bbbab")); // 4 ("bbbb")
  console.log(longestPalindromicSubsequence("cbbd")); // 2 ("bb")
}

module.exports = { longestPalindromicSubsequence };
