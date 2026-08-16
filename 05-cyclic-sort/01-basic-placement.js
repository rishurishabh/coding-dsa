// Pattern: cyclic sort — for an array holding n values from a known range
// (here 1..n), each value has exactly one correct home index. Place it there
// directly instead of comparing values pairwise.
// When:
//   - sort an array in place in O(n) when the values are a known permutation
//     of a small range (not general sorting, which needs O(n log n))
// Why:
//   - a comparison sort can't beat O(n log n) because it only learns "which
//     of two is bigger" — cyclic sort skips comparison entirely: value v's
//     home is index v-1, a fact known in O(1) without looking at anything else
//   - every swap puts at least one more element in its final position for
//     good, so there are at most n swaps total across the whole array

function cyclicSort(nums) {
  const arr = [...nums];
  let i = 0;
  while (i < arr.length) {
    const correctIndex = arr[i] - 1;
    if (arr[i] !== arr[correctIndex]) {
      [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]];
    } else {
      i++; // arr[i] is already home (or a duplicate of what's home) — move on
    }
  }
  return arr;
}

// Demo
if (require.main === module) {
  console.log(cyclicSort([3, 1, 5, 4, 2])); // [1,2,3,4,5]
}

module.exports = { cyclicSort };
