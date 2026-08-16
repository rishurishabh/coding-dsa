// Pattern: repeated adjacent swaps — walk the array, swap any two
// neighbors that are out of order, and repeat until a full pass makes no swaps.
// When:
//   - teaching/baseline sort; rarely used in practice, but the simplest
//     possible "keep fixing local violations until none remain" algorithm
// Why:
//   - each full pass guarantees the largest not-yet-placed value "bubbles"
//     to its correct position at the end — after i passes, the last i
//     elements are provably final
//   - O(n²) time, O(1) space, STABLE (equal elements never cross each
//     other, since a swap only happens on strict inequality)

function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted — no point finishing the remaining passes
  }
  return a;
}

// Demo
if (require.main === module) {
  console.log(bubbleSort([5, 2, 9, 1, 5, 6])); // [1,2,5,5,6,9]
}

module.exports = { bubbleSort };
