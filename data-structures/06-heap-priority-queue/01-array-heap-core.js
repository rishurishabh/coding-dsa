// Structure: a complete binary tree stored flat in an array — no
// pointers at all. Index i's children live at 2i+1 and 2i+2, its parent
// at floor((i-1)/2), so tree shape is implicit in index arithmetic.
// When:
//   - the minimum (or maximum, via the compare function) needs to be
//     found/removed repeatedly, faster than scanning, but full sorted
//     order is never needed — a heap only promises the ROOT is best,
//     nothing about the order of anything else
// Why:
//   - "complete" (every level full except possibly the last, filled
//     left to right) is what makes array storage work at all — there
//     are never gaps, so index arithmetic always lands on a real node
//   - push appends at the end (the next open array slot, which is
//     always a valid complete-tree position), then SIFTS UP: swap with
//     its parent while it's better-than-parent, at most tree-height
//     swaps — O(log n)
//   - pop swaps the root with the last element, removes the last
//     element (now holding the old root), then SIFTS DOWN from the
//     root: swap with whichever child is better, at most tree-height
//     swaps — O(log n). Swapping in the LAST element (not just
//     removing the root outright) is what keeps the tree complete —
//     removing from the middle would leave a hole array indexing can't
//     represent
//   - this exact class is what 13-two-heaps, 14-top-k-elements, and
//     15-k-way-merge all build on top of — this module is where it
//     gets built and explained on its own

function Heap(compare) {
  this.data = [];
  this.compare = compare; // compare(a, b) < 0 means a has higher priority than b
}
Heap.prototype._parent = function (i) { return Math.floor((i - 1) / 2); };
Heap.prototype._left = function (i) { return 2 * i + 1; };
Heap.prototype._right = function (i) { return 2 * i + 2; };
Heap.prototype._swap = function (i, j) {
  [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
};
Heap.prototype._siftUp = function (i) {
  while (i > 0 && this.compare(this.data[i], this.data[this._parent(i)]) < 0) {
    this._swap(i, this._parent(i));
    i = this._parent(i);
  }
};
Heap.prototype._siftDown = function (i) {
  const n = this.data.length;
  while (true) {
    const l = this._left(i);
    const r = this._right(i);
    let best = i;
    if (l < n && this.compare(this.data[l], this.data[best]) < 0) best = l;
    if (r < n && this.compare(this.data[r], this.data[best]) < 0) best = r;
    if (best === i) break;
    this._swap(i, best);
    i = best;
  }
};
Heap.prototype.push = function (val) {
  this.data.push(val);
  this._siftUp(this.data.length - 1);
};
Heap.prototype.pop = function () {
  if (this.data.length === 0) throw new Error("pop from empty heap");
  const top = this.data[0];
  const last = this.data.pop();
  if (this.data.length > 0) {
    this.data[0] = last;
    this._siftDown(0);
  }
  return top;
};
Heap.prototype.peek = function () {
  if (this.data.length === 0) throw new Error("peek at empty heap");
  return this.data[0];
};
Object.defineProperty(Heap.prototype, "size", { get() { return this.data.length; } });

// Demo
if (require.main === module) {
  const minHeap = new Heap((a, b) => a - b);
  for (const v of [5, 3, 8, 1, 9, 2]) minHeap.push(v);
  const drained = [];
  while (minHeap.size > 0) drained.push(minHeap.pop());
  console.log(drained); // [1,2,3,5,8,9] — pops in sorted order
}

module.exports = { Heap };
