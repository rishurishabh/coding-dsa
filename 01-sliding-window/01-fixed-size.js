// Pattern: fixed-size window — k is known up front.
// When:
//   - max/min/avg of every subarray of size k
// Why:
//   - window size never changes, so each step is one add + one subtract (O(1))

function maxSumFixedWindow(nums, k) {
  if (nums.length < k) throw new Error("array shorter than k");

  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];

  let best = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k]; // add right, drop left
    best = Math.max(best, windowSum);
  }
  return best;
}

// Demo
if (require.main === module) {
  const nums = [2, 1, 5, 1, 3, 2];
  const k = 3;
  console.log(`max sum of window size ${k}:`, maxSumFixedWindow(nums, k)); // 9 (5+1+3)
}

module.exports = { maxSumFixedWindow };
