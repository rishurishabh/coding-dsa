// Pattern: pivot partition (Hoare scheme) — converging pointers swap based on
// comparison to a PIVOT VALUE, not a target sum or a fixed bucket count.
// When:
//   - quickselect (Kth largest/smallest element without a full sort)
//   - quicksort's partition step
// Why:
//   - unlike variant 5's fixed 3-way buckets, the boundary here is whatever
//     value the pivot happens to be; each swap provably moves one element to
//     the correct side of that pivot, and the pointers converge on the final
//     partition index in one O(n) pass — this is what makes quickselect O(n)
//     average instead of O(n log n)

function partition(nums, low, high) {
  const pivot = nums[high]; // pivot = last element in range
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (nums[j] <= pivot) {
      i++;
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  [nums[i + 1], nums[high]] = [nums[high], nums[i + 1]];
  return i + 1; // final resting index of the pivot
}

// Kth largest via quickselect: partition, then recurse into only the side
// that contains the target rank — average O(n) instead of sorting the whole array.
function findKthLargest(nums, k) {
  const arr = [...nums];
  const targetIndex = arr.length - k; // kth largest = (n-k)th smallest, 0-indexed

  let low = 0;
  let high = arr.length - 1;
  while (true) {
    const pivotIndex = partition(arr, low, high);
    if (pivotIndex === targetIndex) return arr[pivotIndex];
    if (pivotIndex < targetIndex) low = pivotIndex + 1;
    else high = pivotIndex - 1;
  }
}

// Demo
if (require.main === module) {
  console.log("2nd largest:", findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
  const arr = [9, 3, 7, 1, 8];
  console.log("partition around pivot 8:", partition(arr, 0, 4), "→", arr); // pivot index, array rearranged
}

module.exports = { partition, findKthLargest };
