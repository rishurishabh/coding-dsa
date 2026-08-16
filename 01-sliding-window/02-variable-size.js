// Pattern: variable-size (expand/shrink) window — no fixed k.
// When:
//   - smallest subarray with sum >= target
//   - longest subarray with sum <= S
//   - assumes non-negative elements — sum must grow monotonically as the window
//     expands; for arrays with negatives, use file 08 (prefix-sum + deque) instead
// Why:
//   - `left` only ever moves forward, so total work is O(n) despite the inner while loop

function minSubarrayLen(target, nums) {
  let left = 0;
  let total = 0;
  let best = Infinity;

  for (let right = 0; right < nums.length; right++) {
    total += nums[right]; // expand

    while (total >= target) { // shrink while still valid
      best = Math.min(best, right - left + 1);
      total -= nums[left];
      left++;
    }
  }
  return best === Infinity ? 0 : best;
}

// Bonus: longest subarray with sum <= S (mirror image: shrink while INVALID)
function longestSubarraySumAtMost(nums, S) {
  let left = 0;
  let total = 0;
  let best = 0;

  for (let right = 0; right < nums.length; right++) {
    total += nums[right];
    while (total > S) { // shrink while invalid
      total -= nums[left];
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}

// Demo
if (require.main === module) {
  const nums = [2, 3, 1, 2, 4, 3];
  console.log("min subarray len (target=7):", minSubarrayLen(7, nums)); // 2 ([4,3])
  console.log("longest subarray sum<=6:", longestSubarraySumAtMost(nums, 6)); // 3 ([1,2] etc.)
}

module.exports = { minSubarrayLen, longestSubarraySumAtMost };
