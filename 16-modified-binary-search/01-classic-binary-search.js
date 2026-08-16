// Pattern: the foundation — halve the search space every step by comparing
// the midpoint to a target, keeping only the half that could still contain it.
// When:
//   - find a target's index in a SORTED array
// Why:
//   - a sorted array means "is the target bigger or smaller than mid" fully
//     determines which half to discard — the other half is provably out of
//     range, no need to look at it at all
//   - O(log n) instead of O(n): every comparison cuts the remaining
//     candidates in half, so it takes only log2(n) comparisons to get down to one

function binarySearch(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2); // avoids overflow vs (lo+hi)/2 in other languages
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// Demo
if (require.main === module) {
  console.log(binarySearch([1, 3, 5, 7, 9, 11], 7)); // 3
  console.log(binarySearch([1, 3, 5, 7, 9, 11], 4)); // -1
}

module.exports = { binarySearch };
