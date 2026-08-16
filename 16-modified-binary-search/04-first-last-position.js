// Pattern: search for a BOUNDARY, not a single hit — two separate binary
// searches, each biased to keep narrowing even after finding a match.
// When:
//   - a sorted array may contain the target multiple times; find the first
//     and last index it occurs at (LeetCode 34)
// Why:
//   - a plain binary search (variant 1) stops the instant it finds a match
//     — that match could be anywhere inside a whole run of equal values
//   - biasing the search to keep going LEFT after a match finds the first
//     occurrence; biasing RIGHT finds the last — same halving mechanism,
//     just refusing to treat "found it" as a stopping condition

function findFirst(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  let result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) {
      result = mid;
      hi = mid - 1; // keep searching left for an earlier occurrence
    } else if (nums[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return result;
}

function findLast(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  let result = -1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) {
      result = mid;
      lo = mid + 1; // keep searching right for a later occurrence
    } else if (nums[mid] < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return result;
}

function searchRange(nums, target) {
  return [findFirst(nums, target), findLast(nums, target)];
}

// Demo
if (require.main === module) {
  console.log(searchRange([5, 7, 7, 8, 8, 8, 10], 8)); // [3,5]
  console.log(searchRange([5, 7, 7, 8, 8, 8, 10], 6)); // [-1,-1]
}

module.exports = { findFirst, findLast, searchRange };
