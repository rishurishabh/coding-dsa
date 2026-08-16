// Pattern: build a max-heap in place, then repeatedly extract the max —
// the array itself doubles as the heap's storage; no separate heap
// structure like 14-top-k-elements' Heap class is needed.
// When:
//   - O(n log n) worst-case time is required, but O(n) extra space (merge
//     sort's cost) isn't affordable — heap sort gets the same time
//     guarantee fully in place
// Why:
//   - "heapify" turns the whole array into a valid max-heap bottom-up in
//     O(n), faster than inserting elements one at a time (O(n log n))
//   - repeatedly swapping the root (the current max) with the last
//     unsorted slot, shrinking the heap, then sifting the new root down —
//     places the largest remaining element correctly on every iteration
//   - O(n log n) time always, O(1) extra space, NOT stable (the swaps
//     that maintain the heap property can reorder equal elements)

function siftDown(a, n, i) {
  while (true) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && a[left] > a[largest]) largest = left;
    if (right < n && a[right] > a[largest]) largest = right;
    if (largest === i) break;
    [a[i], a[largest]] = [a[largest], a[i]];
    i = largest;
  }
}

function heapSort(arr) {
  const a = [...arr];
  const n = a.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) siftDown(a, n, i); // heapify

  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]]; // move current max to its final position
    siftDown(a, end, 0); // restore heap property over the shrunk range
  }
  return a;
}

// Demo
if (require.main === module) {
  console.log(heapSort([5, 2, 9, 1, 5, 6])); // [1,2,5,5,6,9]
}

module.exports = { heapSort };
