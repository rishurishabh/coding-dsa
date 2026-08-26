// Pattern: dp[i][j] indexes a literal grid CELL, not a substring interval
// or a two-sequence comparison — filled row by row, top-left to
// bottom-right, since movement is only ever right or down.
// When:
//   - counting/optimizing paths through a grid where movement is
//     restricted to two directions (right, down), start fixed at one
//     corner, end fixed at the other
// Why:
//   - only two moves can ever arrive at cell (i, j): one step right from
//     (i, j-1), or one step down from (i-1, j) — so the number of ways
//     to reach (i, j) is exactly the sum of ways to reach those two
//     cells: dp[i][j] = dp[i-1][j] + dp[i][j-1]
//   - the first row and first column each have exactly ONE way to reach
//     every cell (keep moving in the only direction available) — that's
//     the base case the rest of the grid builds on

function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => new Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}

// Demo
if (require.main === module) {
  console.log(uniquePaths(3, 7)); // 28
  console.log(uniquePaths(3, 2)); // 3
}

module.exports = { uniquePaths };
