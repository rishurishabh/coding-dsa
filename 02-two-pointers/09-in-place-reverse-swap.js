// Pattern: converging pointers that unconditionally swap every step (no
// comparison decides the move — the move IS the algorithm).
// When:
//   - reverse an array/string in place
//   - rotate an array in place (reverse whole, then reverse each part — 3 calls
//     of this exact routine)
// Why:
//   - unlike file 01/02 where the next move depends on a comparison, here every
//     step is the same unconditional swap-and-converge, so it's the simplest
//     possible two-pointer shape — the baseline the other variants add logic to

function reverseInPlace(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}

// Rotate right by k using three reversals of the same routine above
function rotateArray(nums, k) {
  const n = nums.length;
  k %= n;
  reverseInPlace(nums);                    // reverse whole array
  reverseRange(nums, 0, k - 1);             // reverse first k (now the rotated tail)
  reverseRange(nums, k, n - 1);             // reverse the rest
  return nums;
}

function reverseRange(arr, left, right) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

// Demo
if (require.main === module) {
  console.log("reversed:", reverseInPlace([1, 2, 3, 4, 5])); // [5,4,3,2,1]
  console.log("rotated right by 2:", rotateArray([1, 2, 3, 4, 5, 6, 7], 2)); // [6,7,1,2,3,4,5]
}

module.exports = { reverseInPlace, rotateArray };
