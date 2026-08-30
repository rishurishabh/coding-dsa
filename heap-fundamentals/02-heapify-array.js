// Turning an arbitrary, unordered array into a heap ("heapify") uses one
// operation, "sift down": compare a node to its children, swap with the
// LARGER child (for a max-heap) or the SMALLER child (for a min-heap),
// and keep sifting down until the node is in a spot where the heap
// property holds. Run that starting from the last parent up to the root,
// and the whole array becomes a valid heap in one pass.
//
// The ONLY difference between building a max-heap and a min-heap is the
// direction of that one comparison — everything else is identical code.

function siftDown(arr, i, n, compare) {
  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let target = i;

    if (left < n && compare(arr[left], arr[target]) > 0) target = left;
    if (right < n && compare(arr[right], arr[target]) > 0) target = right;
    if (target === i) break; // heap property already holds here

    [arr[i], arr[target]] = [arr[target], arr[i]];
    i = target;
  }
}

function buildMaxHeap(arr) {
  const heap = [...arr];
  const compare = (a, b) => a - b; // "bigger wins" -> max-heap
  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    siftDown(heap, i, heap.length, compare);
  }
  return heap;
}

function buildMinHeap(arr) {
  const heap = [...arr];
  const compare = (a, b) => b - a; // "smaller wins" -> min-heap (flipped compare)
  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    siftDown(heap, i, heap.length, compare);
  }
  return heap;
}

module.exports = { buildMaxHeap, buildMinHeap };

if (require.main === module) {
  const { isMaxHeap, isMinHeap } = require("./01-heap-property-check.js");

  const raw = [3, 9, 1, 5, 2, 6, 8, 4];
  console.log("raw array (no heap property):", raw);

  const maxHeap = buildMaxHeap(raw);
  console.log("built as max-heap:", maxHeap, "valid?", isMaxHeap(maxHeap)); // true, root = 9

  const minHeap = buildMinHeap(raw);
  console.log("built as min-heap:", minHeap, "valid?", isMinHeap(minHeap)); // true, root = 1

  console.log("same input, one flipped comparison, opposite root:", maxHeap[0], "vs", minHeap[0]);
}
