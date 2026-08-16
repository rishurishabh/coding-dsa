// Pattern: identify the sorted half first, then apply variant 1 to it —
// the array as a whole isn't sorted, but at every midpoint, AT LEAST one of
// the two halves provably still is.
// When:
//   - a sorted array was rotated at an unknown pivot; find a target in it
//     (LeetCode 33)
// Why:
//   - comparing nums[lo] to nums[mid] reveals which half is the "clean"
//     sorted one (rotation can only break sortedness at one seam) — once
//     that's known, a plain range check decides whether the target could
//     be in that clean half, same as classic binary search from there

function searchRotated(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;

    if (nums[lo] <= nums[mid]) { // left half [lo..mid] is the sorted one
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else { // right half [mid..hi] is the sorted one
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}

// Demo
if (require.main === module) {
  console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4
  console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // -1
}

module.exports = { searchRotated };
