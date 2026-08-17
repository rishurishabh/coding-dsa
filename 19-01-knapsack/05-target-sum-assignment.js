// Pattern: reduce to variant 4 via algebra — assigning +/- signs doesn't
// look like a subset-sum problem, but splitting numbers into a "positive
// group" and "negative group" reveals that it is one.
// When:
//   - assign a + or - sign to each number so the total equals a target;
//     count how many sign assignments achieve it (LeetCode 494)
// Why:
//   - let P = the sum of numbers assigned "+", N = the sum assigned "-".
//     Then P - N = target AND P + N = total (every number gets a sign).
//     Solving those two equations: P = (target + total) / 2 — a single
//     fixed number, not one per assignment
//   - counting sign assignments hitting the target is now IDENTICAL to
//     counting subsets that sum to P — variant 4, unchanged, once P is known

function countSubsetsWithSum(nums, target) {
  if (target < 0) return 0;
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (const num of nums) {
    for (let s = target; s >= num; s--) {
      dp[s] += dp[s - num];
    }
  }
  return dp[target];
}

function findTargetSumWays(nums, target) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total < Math.abs(target) || (total + target) % 2 !== 0) return 0; // unreachable or not integer-splittable
  const positiveSum = (total + target) / 2;
  return countSubsetsWithSum(nums, positiveSum);
}

// Demo
if (require.main === module) {
  console.log(findTargetSumWays([1, 1, 1, 1, 1], 3)); // 5
}

module.exports = { findTargetSumWays };
