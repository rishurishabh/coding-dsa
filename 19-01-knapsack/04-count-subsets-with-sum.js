// Pattern: variant 2's boolean array, upgraded to a COUNT — instead of
// "is this sum reachable", track "in how many distinct ways".
// When:
//   - count how many subsets of a set of numbers sum to exactly a target
// Why:
//   - `dp[s]` used to flip to true the first time sum s became reachable;
//     now it ACCUMULATES — every existing way to make `s - num` becomes a
//     new way to make `s` once `num` is added to each of them
//   - same reverse loop, same recurrence shape, but `+=` where variant 2
//     had a one-way flag flip — counting problems and existence problems
//     share almost all of their DP structure

function countSubsetsWithSum(nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1; // exactly one way to make sum 0: pick nothing

  for (const num of nums) {
    for (let s = target; s >= num; s--) {
      dp[s] += dp[s - num];
    }
  }
  return dp[target];
}

// Demo
if (require.main === module) {
  console.log(countSubsetsWithSum([1, 1, 2, 3], 4)); // 3 ({1,3},{1,3},{1,1,2})
}

module.exports = { countSubsetsWithSum };
