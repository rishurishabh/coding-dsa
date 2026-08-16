// Pattern: no target at all — the condition being binary-searched is
// purely structural ("am I still in the rotated part?"), not a comparison
// to a value being searched for.
// When:
//   - a sorted array was rotated at an unknown pivot; find the minimum
//     (the rotation point itself) (LeetCode 153)
// Why:
//   - comparing nums[mid] to nums[hi] tells you which side the rotation
//     seam is on: if nums[mid] > nums[hi], the minimum is somewhere to the
//     RIGHT of mid (mid is still in the "high" run); otherwise mid itself
//     could BE the minimum, so it stays in range rather than being excluded
//   - this is the same halving mechanism as variants 1-2, but the
//     "condition" checked at each step is about array STRUCTURE, not a
//     target value — a preview of variant 6's answer-space search

function findMin(nums) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] > nums[hi]) lo = mid + 1; // minimum is past mid
    else hi = mid; // mid could be the minimum — keep it in range
  }
  return nums[lo];
}

// Demo
if (require.main === module) {
  console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
  console.log(findMin([3, 4, 5, 1, 2])); // 1
  console.log(findMin([1, 2, 3, 4])); // 1 (no rotation)
}

module.exports = { findMin };
