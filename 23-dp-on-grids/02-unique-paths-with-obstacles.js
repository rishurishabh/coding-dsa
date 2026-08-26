// Pattern: the exact same recurrence as variant 1, with ONE guard added —
// an obstacle cell contributes zero paths, since nothing is allowed to
// land there at all.
// When:
//   - the same right/down path-counting problem, but some cells are
//     blocked and can never be stepped on
// Why:
//   - an obstacle cell's dp value is forced to 0 — not because of any
//     new recurrence, but because "how many ways to reach here" is
//     trivially zero if you're not allowed to be here
//   - that single zero then naturally propagates forward: any cell that
//     can ONLY be reached through a blocked cell inherits a 0 from it,
//     with no special-casing needed elsewhere
//   - the first row/column base case from variant 1 also needs the
//     guard — an obstacle partway along the top row blocks every cell
//     after it in that row, not just itself

function uniquePathsWithObstacles(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        dp[i][j] = 0; // obstacle — unreachable, by definition
      } else if (i === 0 && j === 0) {
        dp[i][j] = 1;
      } else {
        const fromTop = i > 0 ? dp[i - 1][j] : 0;
        const fromLeft = j > 0 ? dp[i][j - 1] : 0;
        dp[i][j] = fromTop + fromLeft;
      }
    }
  }
  return dp[m - 1][n - 1];
}

// Demo
if (require.main === module) {
  console.log(uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]])); // 2
  console.log(uniquePathsWithObstacles([[0, 1], [0, 0]])); // 1
}

module.exports = { uniquePathsWithObstacles };
