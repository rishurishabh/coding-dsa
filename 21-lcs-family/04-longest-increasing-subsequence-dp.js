// Pattern: 1D DP over a SINGLE sequence, not two — but it belongs in this
// family because dp[i] means "best subsequence answer ending exactly at
// index i", the same framing LCS uses for two sequences collapsed to one.
// When:
//   - given one array, find the length of the longest strictly increasing
//     subsequence (elements need not be contiguous, only increasing and
//     in original order)
// Why:
//   - dp[i] is the length of the longest increasing subsequence that
//     ENDS at index i (not "using the first i elements" — anchored,
//     like variant 2's substring cells, not carried forward like
//     variant 1's LCS cells)
//   - for every earlier index j < i with nums[j] < nums[i], index i could
//     extend that subsequence: dp[i] = max(dp[i], dp[j] + 1) — the answer
//     is the max over all dp[i], since the LIS can end anywhere

function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}

// Demo
if (require.main === module) {
  console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4 ([2,3,7,101] or [2,3,7,18])
}

module.exports = { lengthOfLIS };
