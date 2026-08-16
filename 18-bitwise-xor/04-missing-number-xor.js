// Pattern: XOR indices against values — the same cancellation idea as
// variant 1, applied to a range [0, n] instead of literal duplicates in the array.
// When:
//   - an array holds n distinct numbers from [0, n]; find the one missing
//     value (LeetCode 268) — solved with cyclic sort in
//     05-cyclic-sort/02-find-missing-number.js; this is the XOR alternative
// Why:
//   - XOR every index 0..n together with every array value together: every
//     value that IS present cancels with its matching index, and the
//     missing value's index has nothing to cancel it, so it survives
//   - same O(n) time, O(1) space as the cyclic-sort version, but with no
//     in-place swapping — just a running XOR accumulator

function missingNumber(nums) {
  let result = nums.length; // account for index n, which has no array slot to pair with
  for (let i = 0; i < nums.length; i++) {
    result ^= i ^ nums[i];
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log(missingNumber([3, 0, 1])); // 2
  console.log(missingNumber([0, 1, 2, 3])); // 4
}

module.exports = { missingNumber };
