// Pattern: build a same-width mask, then XOR to flip — XOR against a mask
// of all 1s flips exactly the bits the mask covers, since `1 ^ b` always
// inverts `b`.
// When:
//   - flip every bit of a number's binary representation, but only within
//     its own bit-length (not flipping the infinite leading zeros too)
//     (LeetCode 476)
// Why:
//   - a naive `~num` flips ALL bits, including the leading zeros that
//     aren't conceptually part of this number's representation — a mask
//     with exactly as many 1-bits as `num` has significant bits, and
//     nothing more, is what confines the flip to the bits that matter
//   - building that mask by doubling-and-adding-1 until it's >= num is the
//     same "grow a boundary" idea seen elsewhere in this repo, just in
//     bits instead of array indices

function findComplement(num) {
  let mask = 1;
  while (mask < num) {
    mask = (mask << 1) | 1; // grows: 1, 11, 111, 1111... in binary
  }
  return num ^ mask;
}

// Demo
if (require.main === module) {
  console.log(findComplement(5)); // 2 (101 -> 010)
  console.log(findComplement(1)); // 0 (1 -> 0)
}

module.exports = { findComplement };
