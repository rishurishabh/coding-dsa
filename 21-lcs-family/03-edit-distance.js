// Pattern: same 2D grid over two sequences, but the recurrence has THREE
// options instead of two, because there are three edit operations —
// insert, delete, replace — each of which shrinks the problem toward
// dp[0][0] along a different diagonal or edge.
// When:
//   - given two strings, find the minimum number of single-character
//     insertions, deletions, and replacements to turn one into the other
// Why:
//   - dp[i][j] is the edit distance between a's first i characters and
//     b's first j characters; the base cases dp[i][0] = i and dp[0][j] = j
//     are "delete/insert everything, there's nothing to match"
//   - if a[i-1] === b[j-1], no operation is needed here: dp[i][j] =
//     dp[i-1][j-1], carried through unchanged
//   - otherwise the best of three moves, plus one operation: delete
//     a[i-1] (dp[i-1][j]), insert b[j-1] (dp[i][j-1]), or replace a[i-1]
//     with b[j-1] (dp[i-1][j-1])

function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[a.length][b.length];
}

// Demo
if (require.main === module) {
  console.log(editDistance("horse", "ros")); // 3 (LeetCode 72 example)
  console.log(editDistance("intention", "execution")); // 5
}

module.exports = { editDistance };
