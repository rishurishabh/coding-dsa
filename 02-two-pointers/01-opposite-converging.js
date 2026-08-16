// Pattern: opposite-ends converging pointers — comparison-driven.
// When:
//   - pair-sum in a sorted array ("two sum II")
//   - any search where "too small" and "too big" both have an obvious fix direction
// Why:
//   - sorted order means moving left up always increases the pair sum, moving
//     right down always decreases it — each step provably rules out one candidate
//     pair, so the whole array is covered in O(n) instead of O(n^2)

function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;   // too small: only increasing left can help
    else right--;                // too big: only decreasing right can help
  }
  return [-1, -1];
}

// Demo
if (require.main === module) {
  console.log("two sum sorted:", twoSumSorted([2, 7, 11, 15], 9)); // [0, 1]
  console.log("two sum sorted:", twoSumSorted([1, 3, 4, 6, 10], 10)); // [1, 3] (4+6)
}

module.exports = { twoSumSorted };
