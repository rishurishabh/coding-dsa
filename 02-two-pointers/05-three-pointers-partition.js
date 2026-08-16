// Pattern: three pointers partitioning an array into three regions in one pass
// (Dutch National Flag).
// When:
//   - sort an array of only 0s, 1s, 2s in place without a general sort
// Why:
//   - `low`/`mid`/`high` maintain the invariant [0..low)=0s, [low..mid)=1s,
//     [mid..high]=unknown, (high..end]=2s; `mid` only advances after its cell
//     is resolved, so the whole array is classified in one O(n) pass, O(1) space

function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++; // swapped-in value from `low` is always 0 or 1, safe to advance past
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--; // swapped-in value from `high` is unknown, do NOT advance mid
    }
  }
  return nums;
}

// Demo
if (require.main === module) {
  console.log("sorted colors:", sortColors([2, 0, 2, 1, 1, 0])); // [0,0,1,1,2,2]
}

module.exports = { sortColors };
