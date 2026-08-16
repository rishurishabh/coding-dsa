// Pattern: no target, no global order — the halving decision comes from
// comparing a midpoint only to its IMMEDIATE neighbor, not to any value
// being searched for.
// When:
//   - find any local peak (an element strictly greater than both
//     neighbors) in an unsorted array; boundaries count as -infinity
//     (LeetCode 162)
// Why:
//   - if nums[mid] < nums[mid+1], the slope is climbing, so a peak is
//     GUARANTEED to exist somewhere to the right (worst case, the array's
//     end, since it's taken as -infinity beyond the boundary) — discard
//     the left half; symmetric argument discards the right half otherwise
//   - the array doesn't need to be sorted at all, just locally comparable
//     — this is the same halving shape as every other variant, driven by
//     the smallest possible piece of information: one neighbor comparison

function findPeakElement(nums) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] < nums[mid + 1]) lo = mid + 1; // climbing — peak is to the right
    else hi = mid; // descending or at a peak — peak is at mid or to the left
  }
  return lo;
}

// Demo
if (require.main === module) {
  console.log(findPeakElement([1, 2, 3, 1])); // 2
  console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // 1 or 5 (either valid peak)
}

module.exports = { findPeakElement };
