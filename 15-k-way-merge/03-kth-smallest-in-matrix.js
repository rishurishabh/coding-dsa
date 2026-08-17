// Pattern: variant 2's merge, stopped EARLY — the full merge is never
// needed, only the first k pops.
// When:
//   - a matrix with every row (and column) sorted ascending; find the Kth
//     smallest element overall (LeetCode 378)
// Why:
//   - each row is already one of the "K sorted sequences" from variant 2 —
//     seed the heap with the first element of every row, then pop k times;
//     the kth pop IS the answer, no need to drain the rest of the heap
//   - popping stops as soon as the answer is found, so this only ever does
//     O(k log n) work (n = number of rows) instead of fully merging and
//     sorting all n² elements

function Heap(compare) {
  this.data = [];
  this.compare = compare;
}
Heap.prototype.push = function (val) {
  this.data.push(val);
  let i = this.data.length - 1;
  while (i > 0) {
    const parent = (i - 1) >> 1;
    if (this.compare(this.data[parent], this.data[i]) <= 0) break;
    [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
    i = parent;
  }
};
Heap.prototype.pop = function () {
  const top = this.data[0];
  const last = this.data.pop();
  if (this.data.length > 0) {
    this.data[0] = last;
    let i = 0;
    while (true) {
      let best = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < this.data.length && this.compare(this.data[l], this.data[best]) < 0) best = l;
      if (r < this.data.length && this.compare(this.data[r], this.data[best]) < 0) best = r;
      if (best === i) break;
      [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
      i = best;
    }
  }
  return top;
};
Object.defineProperty(Heap.prototype, "size", { get() { return this.data.length; } });

function kthSmallest(matrix, k) {
  const n = matrix.length;
  const heap = new Heap((a, b) => a[0] - b[0]); // [value, row, col]
  for (let row = 0; row < Math.min(n, k); row++) { // never need more than k starting rows
    heap.push([matrix[row][0], row, 0]);
  }

  let value;
  for (let i = 0; i < k; i++) {
    const [v, row, col] = heap.pop();
    value = v;
    if (col + 1 < n) heap.push([matrix[row][col + 1], row, col + 1]);
  }
  return value;
}

// Demo
if (require.main === module) {
  const matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]];
  console.log(kthSmallest(matrix, 8)); // 13
}

module.exports = { Heap, kthSmallest };
