// Pattern: the same right/down grid, but filled BACKWARD — from the
// bottom-right corner up to the top-left — because what a cell needs
// depends on what comes AFTER it, not before it.
// When:
//   - the "cost" of a cell isn't independent — the minimum resource
//     needed to survive entering a cell depends on the minimum needed
//     for the REST of the path still ahead, not the path already taken
// Why:
//   - working forward (like variants 1-4) would need to know the
//     minimum health entering EVERY future cell before it could compute
//     the current one — exactly backward from what forward DP can
//     provide, so the fill direction has to flip
//   - dp[i][j] = the minimum health needed upon ENTERING cell (i, j) to
//     survive from there to the exit — computed as the smaller of the
//     two possible next steps' requirements, minus this cell's own
//     health change, but never allowed to drop below 1 (health can't be
//     ≤ 0 at any point, not just at the end)
//   - the bottom-right corner is the base case here (unlike variants
//     1-4, where it's the top-left) — since that's where the backward
//     fill starts

function calculateMinimumHP(dungeon) {
  const m = dungeon.length;
  const n = dungeon[0].length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(Infinity));
  dp[m][n - 1] = 1;
  dp[m - 1][n] = 1;

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const needNext = Math.min(dp[i + 1][j], dp[i][j + 1]);
      const needHere = needNext - dungeon[i][j];
      dp[i][j] = Math.max(needHere, 1); // health must stay at least 1
    }
  }
  return dp[0][0];
}

// Demo
if (require.main === module) {
  console.log(calculateMinimumHP([
    [-2, -3, 3],
    [-5, -10, 1],
    [10, 30, -5],
  ])); // 7 -> path RIGHT, RIGHT, DOWN, DOWN needs 7 starting HP
  console.log(calculateMinimumHP([[0]])); // 1, minimum possible
}

module.exports = { calculateMinimumHP };
