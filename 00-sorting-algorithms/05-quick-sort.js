// Pattern: divide and conquer via partition, not a midpoint split — the
// SAME Hoare/Lomuto partition step from 02-two-pointers/11-pivot-partition.js,
// but recursing into BOTH sides instead of just one (quickselect only needs one).
// When:
//   - fast general-purpose sorting where average-case speed matters more
//     than worst-case guarantees, and extra memory should stay minimal
// Why:
//   - partitioning around a pivot puts it at its final sorted index in one
//     pass, with everything smaller to its left and everything bigger to
//     its right — recursing on both sides sorts everything, entirely in place
//   - O(n log n) average time, O(1) extra space (in-place, unlike merge
//     sort) — but O(n²) worst case on an already-sorted array with a bad
//     pivot choice (here, always picking the last element), and NOT stable

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function quickSortInPlace(arr, low, high) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSortInPlace(arr, low, pivotIndex - 1);
    quickSortInPlace(arr, pivotIndex + 1, high);
  }
}

function quickSort(arr) {
  const a = [...arr];
  quickSortInPlace(a, 0, a.length - 1);
  return a;
}

// Demo
if (require.main === module) {
  console.log(quickSort([5, 2, 9, 1, 5, 6])); // [1,2,5,5,6,9]
}

module.exports = { quickSort, partition };
