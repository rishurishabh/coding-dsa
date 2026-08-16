// Pattern: repeated find-min-and-place — for each position, scan the
// remaining unsorted region for its minimum, then swap it into place.
// When:
//   - minimizing the number of SWAPS matters more than comparisons (e.g.
//     writes are expensive — flash memory, sorting physical objects)
// Why:
//   - exactly one swap per position, always — n-1 swaps total no matter
//     the input, unlike bubble sort's swap count which depends on how
//     unsorted the data is
//   - O(n²) time regardless of input order (no early-exit possible — the
//     scan for the minimum always covers the whole remaining region),
//     O(1) space, NOT stable (swapping the minimum into place can leapfrog
//     it past an equal element)

function selectionSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [a[i], a[minIdx]] = [a[minIdx], a[i]];
  }
  return a;
}

// Demo
if (require.main === module) {
  console.log(selectionSort([5, 2, 9, 1, 5, 6])); // [1,2,5,5,6,9]
}

module.exports = { selectionSort };
