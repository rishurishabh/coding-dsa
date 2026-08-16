// Pattern: XOR cancellation — `a ^ a = 0` and `a ^ 0 = a`, so XOR-ing every
// element together makes every PAIRED value vanish, leaving only whatever
// wasn't paired.
// When:
//   - every element appears exactly twice except one that appears once;
//     find that one (LeetCode 136)
// Why:
//   - XOR is commutative and associative, so the order elements arrive in
//     doesn't matter — two equal values anywhere in the sequence cancel
//     each other out, no matter how far apart they are
//   - O(n) time, O(1) space — no hashset of "seen" values needed at all

function singleNumber(nums) {
  let result = 0;
  for (const n of nums) result ^= n;
  return result;
}

// Demo
if (require.main === module) {
  console.log(singleNumber([4, 1, 2, 1, 2])); // 4
}

module.exports = { singleNumber };
