// Pattern: placement with a range GUARD — every other variant assumes every
// value belongs somewhere in the array; here most values don't, and placing
// them anyway would corrupt the array or loop forever.
// When:
//   - array holds arbitrary integers (negatives, zeros, duplicates, values
//     far outside the array's length) — find the smallest missing positive
//     (LeetCode 41, the hardest classic of this pattern)
// Why:
//   - only values in [1, n] can possibly be the answer (a length-n array
//     can't be missing a positive integer larger than n+1), so the swap
//     condition adds two extra checks: is this value even in range, and is
//     its target slot not already correctly holding it — skip everything else
//     in O(1) instead of trying (and failing) to place it

function firstMissingPositive(nums) {
  const arr = [...nums];
  const n = arr.length;
  let i = 0;

  while (i < n) {
    const correctIndex = arr[i] - 1;
    if (arr[i] > 0 && arr[i] <= n && arr[i] !== arr[correctIndex]) {
      [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]];
    } else {
      i++; // out of range, non-positive, or already correctly placed
    }
  }

  for (let idx = 0; idx < n; idx++) {
    if (arr[idx] !== idx + 1) return idx + 1;
  }
  return n + 1; // 1..n all present — the answer is one past the end
}

// Demo
if (require.main === module) {
  console.log(firstMissingPositive([3, 4, -1, 1])); // 2
  console.log(firstMissingPositive([7, 8, 9, 11, 12])); // 1
  console.log(firstMissingPositive([1, 2, 0])); // 3
}

module.exports = { firstMissingPositive };
