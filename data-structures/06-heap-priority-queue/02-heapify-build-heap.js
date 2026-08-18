// Structure: the same array-as-tree shape as variant 1, but built from
// an existing array all at once (heapify) instead of one push() at a
// time — and that difference in approach changes the total cost from
// O(n log n) to O(n).
// When:
//   - the starting data is already a full array (not arriving one
//     element at a time), and it needs to become a valid heap in one
//     shot — e.g. as the first step of heap sort, or turning a plain
//     array into a priority queue without n individual push() calls
// Why:
//   - pushing n elements one at a time costs O(log n) per push (variant
//     1's sift-up), O(n log n) total
//   - heapify instead sifts DOWN starting from the last non-leaf node
//     (index floor(n/2) - 1) back to the root — every leaf is already a
//     valid 1-node heap, so only the non-leaf half of the array needs
//     any work at all
//   - the O(n) bound (not O(n log n)) comes from WHERE the work is
//     concentrated: most nodes are near the bottom of the tree, where a
//     sift-down has very few levels left to travel — only the single
//     node at the root might sift all the way down log n levels; the
//     sum of (nodes at each level) × (remaining height at that level)
//     converges to O(n), not O(n log n)

function heapify(arr, compare) {
  const n = arr.length;

  function siftDown(i) {
    while (true) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      let best = i;
      if (l < n && compare(arr[l], arr[best]) < 0) best = l;
      if (r < n && compare(arr[r], arr[best]) < 0) best = r;
      if (best === i) break;
      [arr[i], arr[best]] = [arr[best], arr[i]];
      i = best;
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(i);
  }
  return arr; // heapified in place; arr[0] is now the best element
}

// Demo
if (require.main === module) {
  const arr = [5, 3, 8, 1, 9, 2, 7];
  heapify(arr, (a, b) => a - b);
  console.log(arr[0]); // 1 — the minimum, now at the root
  console.log(arr); // [1,3,2,5,9,8,7] — a valid min-heap array
}

module.exports = { heapify };
