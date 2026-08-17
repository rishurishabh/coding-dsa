// Pattern: reduce to variant 2 — the question doesn't look like subset sum
// at first, but a small algebraic step turns it into exactly that.
// When:
//   - can an array be split into two subsets with EQUAL sums? (LeetCode 416)
// Why:
//   - if the whole array sums to S, two equal halves would each sum to
//     S/2 — so this is just "does a subset summing to S/2 exist", variant
//     2 verbatim, after one check: an ODD total can never split evenly, so
//     that case returns false without running the DP at all
//   - recognizing when a problem IS a known pattern in disguise is as
//     important as knowing the pattern itself

function subsetSumExists(nums, target) {
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
    for (let s = target; s >= num; s--) {
      if (dp[s - num]) dp[s] = true;
    }
  }
  return dp[target];
}

function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false; // odd total: an even split is impossible
  return subsetSumExists(nums, total / 2);
}

// Demo
if (require.main === module) {
  console.log(canPartition([1, 5, 11, 5])); // true ({1,5,5} and {11})
  console.log(canPartition([1, 2, 3, 5])); // false
}

module.exports = { canPartition };
