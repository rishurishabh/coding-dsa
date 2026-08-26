// Pattern: a THIRD neighbor joins the recurrence — up, left, AND
// diagonal — a genuinely different dependency shape from variants 1-3's
// two-neighbor grid.
// When:
//   - finding the largest SQUARE (not just a path) of a given value
//     inside a binary grid
// Why:
//   - dp[i][j] holds the side length of the largest square whose
//     BOTTOM-RIGHT corner is at (i, j) — not the largest square
//     anywhere, just the one anchored here
//   - extending a square by one more ring in every direction requires
//     ALL THREE neighbors (up, left, diagonal) to already support at
//     least that size — a square is only as strong as its weakest
//     supporting side, so dp[i][j] = min(dp[i-1][j], dp[i][j-1],
//     dp[i-1][j-1]) + 1
//   - if the current cell isn't part of the shape at all (0), no square
//     can possibly end here — dp[i][j] = 0, breaking the chain instead
//     of extending it

function maximalSquare(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  let maxSide = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === "1" || matrix[i][j] === 1) {
        if (i === 0 || j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        }
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }
  return maxSide * maxSide;
}

// Demo
if (require.main === module) {
  console.log(maximalSquare([
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"],
  ])); // 4 -> a 2x2 square of 1s
}

module.exports = { maximalSquare };
