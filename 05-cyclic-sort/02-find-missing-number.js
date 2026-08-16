// Pattern: place, then read the FIRST mismatch — placement (variant 1) followed
// by a verification sweep that reports what's wrong instead of what's sorted.
// When:
//   - array has n distinct numbers from the range [0, n] (one value from that
//     range is missing, since the array can only hold n of the n+1 possibilities)
// Why:
//   - value v's home is index v here (0-indexed range), so after placement,
//     the one index NOT holding its own value reveals the missing number —
//     no extra pass with a hashset needed, and the guard `arr[i] < n` skips
//     the one value that can't have a home inside the array (n itself, which
//     has no index n to live at)

function findMissingNumber(nums) {
  const arr = [...nums];
  let i = 0;
  while (i < arr.length) {
    const correctIndex = arr[i];
    if (arr[i] < arr.length && arr[i] !== arr[correctIndex]) {
      [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]];
    } else {
      i++;
    }
  }

  for (let idx = 0; idx < arr.length; idx++) {
    if (arr[idx] !== idx) return idx;
  }
  return arr.length; // every index 0..n-1 matched — n itself is missing
}

// Demo
if (require.main === module) {
  console.log(findMissingNumber([3, 0, 1])); // 2
  console.log(findMissingNumber([0, 1, 2, 3])); // 4
}

module.exports = { findMissingNumber };
