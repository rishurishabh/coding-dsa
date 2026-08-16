// Pattern: place, then collect EVERY mismatch — same skeleton as variant 2,
// but the verification sweep gathers a list instead of stopping at the first hit.
// When:
//   - array of size n holds values in [1, n], some duplicated, which means
//     an equal number of values in that range never appear at all — find all of them
// Why:
//   - after placement, every index i whose value isn't i+1 marks a value
//     that never made it home because a duplicate was squatting there —
//     the missing number is exactly i+1, for every such index

function findAllMissing(nums) {
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

  const missing = [];
  for (let idx = 0; idx < arr.length; idx++) {
    if (arr[idx] !== idx + 1) missing.push(idx + 1);
  }
  return missing;
}

// Demo
if (require.main === module) {
  console.log(findAllMissing([4, 3, 2, 7, 8, 2, 3, 1])); // [5,6]
}

module.exports = { findAllMissing };
