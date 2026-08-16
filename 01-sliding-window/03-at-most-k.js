// Pattern: "at most K" trick — exactly(K) = atMost(K) - atMost(K-1).
// When:
//   - counting problems like "subarrays with exactly K distinct elements"
// Why:
//   - "exactly K" isn't cleanly monotonic to shrink on directly
//   - "at most K" is monotonic, so compute the easy version twice and subtract

function subarraysWithAtMostKDistinct(nums, k) {
  if (k < 0) return 0; // atMost(-1) has no valid windows

  const count = new Map();
  let left = 0;
  let result = 0;

  for (let right = 0; right < nums.length; right++) {
    count.set(nums[right], (count.get(nums[right]) || 0) + 1);

    while (count.size > k) {
      const leftVal = nums[left];
      count.set(leftVal, count.get(leftVal) - 1);
      if (count.get(leftVal) === 0) count.delete(leftVal);
      left++;
    }

    result += right - left + 1; // every subarray ending at `right` within the window
  }
  return result;
}

function subarraysWithExactlyKDistinct(nums, k) {
  return subarraysWithAtMostKDistinct(nums, k) - subarraysWithAtMostKDistinct(nums, k - 1);
}

// Demo
if (require.main === module) {
  const nums = [1, 2, 1, 2, 3];
  console.log("subarrays with exactly 2 distinct:", subarraysWithExactlyKDistinct(nums, 2)); // 7
}

module.exports = { subarraysWithAtMostKDistinct, subarraysWithExactlyKDistinct };
