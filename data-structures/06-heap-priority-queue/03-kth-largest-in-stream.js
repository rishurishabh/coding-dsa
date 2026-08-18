// Structure: a min-heap capped at exactly k elements — the smallest of
// the k largest values seen so far always sits at the root.
// When:
//   - values arrive one at a time (a STREAM, not a fixed array), and the
//     kth largest value overall needs to be answerable after every new
//     arrival — different framing from a one-shot "kth largest in this
//     array" query
// Why:
//   - the heap only ever holds the k BEST candidates — every value that
//     couldn't possibly be in the top k gets discarded immediately,
//     rather than kept around like a full sort would
//   - keeping the SMALLEST of the k largest at the root (a min-heap, not
//     a max-heap) is what makes "is this new value even worth keeping?"
//     a single O(1) peek comparison — if it's not bigger than the
//     current worst of the top k, it can be discarded outright
//   - each add() is O(log k), not O(log n) — the heap size is capped at
//     k regardless of how many values have streamed through in total

function Heap(compare) {
  this.data = [];
  this.compare = compare;
}
Heap.prototype._siftUp = function (i) {
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (this.compare(this.data[i], this.data[p]) >= 0) break;
    [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
    i = p;
  }
};
Heap.prototype._siftDown = function (i) {
  const n = this.data.length;
  while (true) {
    const l = 2 * i + 1, r = 2 * i + 2;
    let best = i;
    if (l < n && this.compare(this.data[l], this.data[best]) < 0) best = l;
    if (r < n && this.compare(this.data[r], this.data[best]) < 0) best = r;
    if (best === i) break;
    [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
    i = best;
  }
};
Heap.prototype.push = function (val) {
  this.data.push(val);
  this._siftUp(this.data.length - 1);
};
Heap.prototype.pop = function () {
  const top = this.data[0];
  const last = this.data.pop();
  if (this.data.length > 0) { this.data[0] = last; this._siftDown(0); }
  return top;
};
Heap.prototype.peek = function () { return this.data[0]; };
Object.defineProperty(Heap.prototype, "size", { get() { return this.data.length; } });

function KthLargest(k, nums) {
  this.k = k;
  this.heap = new Heap((a, b) => a - b);
  for (const num of nums) this.add(num);
}
KthLargest.prototype.add = function (val) {
  this.heap.push(val);
  if (this.heap.size > this.k) this.heap.pop();
  return this.heap.peek();
};

// Demo
if (require.main === module) {
  const kth = new KthLargest(3, [4, 5, 8, 2]);
  console.log(kth.add(3)); // 4
  console.log(kth.add(5)); // 5
  console.log(kth.add(10)); // 5
  console.log(kth.add(9)); // 8
  console.log(kth.add(4)); // 8
}

module.exports = { KthLargest };
