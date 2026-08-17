// Pattern: variant 1's recurrence, with value dropped entirely — the only
// question left is "reachable or not", so the DP array holds booleans
// instead of running maximums.
// When:
//   - does ANY subset of a set of numbers sum to exactly a target value
// Why:
//   - every number is still either included or excluded (same as variant
//     1's items), but there's no value to maximize — `dp[s]` is just true
//     if sum `s` is reachable using numbers seen so far
//   - same reverse capacity loop as variant 1, for the same reason:
//     without it, a number could mark a sum reachable using itself twice

function subsetSumExists(nums, target) {
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // sum 0 is always reachable — the empty subset

  for (const num of nums) {
    for (let s = target; s >= num; s--) {
      if (dp[s - num]) dp[s] = true;
    }
  }
  return dp[target];
}

// Demo
if (require.main === module) {
  console.log(subsetSumExists([2, 3, 7, 8, 10], 11)); // true (3+8)
  console.log(subsetSumExists([1, 2, 5], 4)); // false
}

module.exports = { subsetSumExists };
