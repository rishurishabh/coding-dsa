// Pattern: fix one index, run opposite-converging two-pointer on the remainder —
// reduces k-sum to (k-1)-sum.
// When:
//   - 3Sum: all triplets that sum to 0 (generalizes to 4Sum by fixing two indices)
// Why:
//   - after sorting, fixing nums[i] turns "find pairs summing to -nums[i]" into
//     exactly the opposite-converging two-pointer search from file 01 — O(n^2)
//     total instead of O(n^3), and sorted order makes duplicate-skipping O(1) per step

function threeSum(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sorted.length - 2; i++) {
    if (i > 0 && sorted[i] === sorted[i - 1]) continue; // skip duplicate anchors

    let left = i + 1;
    let right = sorted.length - 1;
    const target = -sorted[i];

    while (left < right) {
      const sum = sorted[left] + sorted[right];
      if (sum === target) {
        result.push([sorted[i], sorted[left], sorted[right]]);
        left++;
        right--;
        while (left < right && sorted[left] === sorted[left - 1]) left++;
        while (left < right && sorted[right] === sorted[right + 1]) right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log("triplets summing to 0:", threeSum([-1, 0, 1, 2, -1, -4]));
  // [[-1,-1,2],[-1,0,1]]
}

module.exports = { threeSum };
