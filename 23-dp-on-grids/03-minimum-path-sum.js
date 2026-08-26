// Pattern: same right/down movement as variants 1-2, same two-neighbor
// recurrence shape — but MINIMIZING an accumulated cost instead of
// COUNTING paths.
// When:
//   - each cell has a cost/weight, and the goal is the cheapest total
//     cost to travel from the top-left to the bottom-right
// Why:
//   - a cell can only be reached from above or from the left — so the
//     cheapest way to reach it is grid[i][j] plus whichever of those two
//     arrivals was cheaper: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
//   - this is variant 1's `+` swapped for `min(...)` — the SAME
//     dependency shape (only two neighbors, filled top-left to
//     bottom-right) carries over unchanged; only the combining operator
//     changes, the same relationship
//     [19-01-knapsack](../19-01-knapsack/README.md)'s max/count/exists
//     variants have to each other

function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  dp[0][0] = grid[0][0];
  for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];
  for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m - 1][n - 1];
}

// Demo
if (require.main === module) {
  console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]])); // 7 -> 1+3+1+1+1
  console.log(minPathSum([[1, 2, 3], [4, 5, 6]])); // 12
}

module.exports = { minPathSum };
