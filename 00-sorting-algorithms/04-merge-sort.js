// Pattern: divide and conquer, merge on the way back up — split in half
// recursively down to single elements (trivially sorted), then merge
// sorted halves back together pairwise.
// When:
//   - guaranteed O(n log n) is needed regardless of input order — no
//     worst-case O(n²) blowup the way quicksort has
//   - STABILITY matters (equal elements must keep their original relative order)
// Why:
//   - merging two ALREADY-sorted halves takes one linear pass (same
//     two-pointer idea as 04-merge-intervals/01-merge-overlapping.js):
//     always take the smaller of the two fronts
//   - O(n log n) time always (log n levels of splitting, O(n) work to
//     merge at each level), but O(n) extra space for the merge buffers —
//     the one real cost compared to the in-place sorts

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const merged = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]); // <= keeps it stable
    else merged.push(right[j++]);
  }
  while (i < left.length) merged.push(left[i++]);
  while (j < right.length) merged.push(right[j++]);
  return merged;
}

// Demo
if (require.main === module) {
  console.log(mergeSort([5, 2, 9, 1, 5, 6])); // [1,2,5,5,6,9]
}

module.exports = { mergeSort };
