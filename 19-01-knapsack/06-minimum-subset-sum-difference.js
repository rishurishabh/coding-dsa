// Pattern: variant 2's reachability array, read for its CLOSEST true value
// instead of one exact target — the DP doesn't change, only what's asked
// of the finished table does.
// When:
//   - split an array into two subsets minimizing the difference between
//     their sums (not necessarily equal — that's variant 3's special case)
// Why:
//   - the best possible split has one subset as close to total/2 as
//     achievable; running variant 2's reachability DP with target =
//     total/2 finds EVERY reachable sum up to that point in one pass, not
//     just whether total/2 itself is reachable
//   - scanning the finished dp array from total/2 down to 0 for the first
//     `true` finds the achievable sum closest to the ideal split; the
//     difference is `total - 2 * thatSum`

function minSubsetSumDifference(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  const half = Math.floor(total / 2);

  const dp = new Array(half + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
    for (let s = half; s >= num; s--) {
      if (dp[s - num]) dp[s] = true;
    }
  }

  let closest = 0;
  for (let s = half; s >= 0; s--) {
    if (dp[s]) { closest = s; break; } // largest reachable sum <= total/2
  }
  return total - 2 * closest;
}

// Demo
if (require.main === module) {
  console.log(minSubsetSumDifference([1, 6, 11, 5])); // 1 ({1,5,6}=12 vs {11}=11)
}

module.exports = { minSubsetSumDifference };
