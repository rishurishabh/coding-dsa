// Pattern: one mismatch, two answers — placement (same as every variant here)
// followed by a verification sweep that reads a SINGLE mismatched index as
// both defects at once, instead of needing two separate passes.
// When:
//   - array of size n holds values in [1, n]; exactly one value is duplicated
//     and, because of the pigeonhole principle, exactly one other value is
//     therefore missing — return both (LeetCode 645, "Set Mismatch")
// Why:
//   - variant 3 (missing) and variant 4 (duplicate) each read the same kind
//     of leftover mismatch from opposite sides; when there's exactly one
//     corrupted pair, a single mismatched index carries both readings at once —
//     arr[idx] is the duplicate, idx+1 is the missing value it displaced

function findCorruptPair(nums) {
  const arr = [...nums];
  let i = 0;
  while (i < arr.length) {
    const correctIndex = arr[i] - 1;
    if (arr[i] !== arr[correctIndex]) {
      [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]];
    } else {
      i++;
    }
  }

  for (let idx = 0; idx < arr.length; idx++) {
    if (arr[idx] !== idx + 1) return [arr[idx], idx + 1]; // [duplicate, missing]
  }
  return [-1, -1];
}

// Demo
if (require.main === module) {
  console.log(findCorruptPair([1, 2, 2, 4])); // [2, 3]
}

module.exports = { findCorruptPair };
