// Pattern: bit-count state machine — plain XOR (variant 1) only works when
// duplicates come in PAIRS; three copies of a value XOR back to the value
// itself, not to 0, so cancellation stops working entirely.
// When:
//   - every element appears exactly three times except one that appears
//     once; find that one (LeetCode 137)
// Why:
//   - track, per bit position, "how many times has this bit been set so
//     far, mod 3" — a bit belonging to the answer is set in exactly ONE of
//     the triplicated occurrences pattern-wise... concretely: `ones` holds
//     bits seen a count ≡ 1 (mod 3), `twos` holds bits seen ≡ 2 (mod 3);
//     a bit that would roll over to ≡ 0 (mod 3) gets cleared from both
//   - after processing every number, `ones` holds exactly the bits that
//     appeared a multiple-of-3-plus-one number of times — the single number

function singleNumberTripleAppearing(nums) {
  let ones = 0;
  let twos = 0;
  for (const n of nums) {
    ones = (ones ^ n) & ~twos;
    twos = (twos ^ n) & ~ones;
  }
  return ones;
}

// Demo
if (require.main === module) {
  console.log(singleNumberTripleAppearing([2, 2, 3, 2])); // 3
  console.log(singleNumberTripleAppearing([0, 1, 0, 1, 0, 1, 99])); // 99
}

module.exports = { singleNumberTripleAppearing };
