// Pattern: partition by a differing bit — variant 1's cancellation only
// isolates ONE survivor; with two survivors, XOR-ing everything gives their
// combined XOR, not either one alone, so the elements need splitting first.
// When:
//   - every element appears twice except TWO that each appear once; find
//     both (LeetCode 260)
// Why:
//   - XOR-ing all elements cancels every paired value, leaving `a ^ b`
//     (the two unique values XORed together) — since a != b, that result
//     has at least one set bit, and at that bit position, a and b must
//     differ (one has it set, the other doesn't)
//   - splitting every element into two groups by whether they have that
//     bit set puts a and b in DIFFERENT groups, and every paired value
//     stays in the SAME group as its partner — so XOR-ing each group
//     separately isolates a and b independently

function singleNumberTwoUniques(nums) {
  let xorAll = 0;
  for (const n of nums) xorAll ^= n;

  const diffBit = xorAll & -xorAll; // lowest set bit (two's-complement trick)

  let groupA = 0;
  let groupB = 0;
  for (const n of nums) {
    if (n & diffBit) groupA ^= n;
    else groupB ^= n;
  }
  return [groupA, groupB];
}

// Demo
if (require.main === module) {
  console.log(singleNumberTwoUniques([1, 2, 1, 3, 2, 5])); // [3,5] (order may vary)
}

module.exports = { singleNumberTwoUniques };
