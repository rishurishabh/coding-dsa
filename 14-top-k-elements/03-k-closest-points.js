// Pattern: fixed-size MAX-heap instead of min — the direction flips because
// "closest" means smallest distance, so the element to evict when the heap
// overflows is the FARTHEST one, which a max-heap surfaces at its top.
// When:
//   - find the k points closest to the origin (LeetCode 973)
// Why:
//   - same fixed-size-heap shape as variants 1-2, but "worst so far" now
//     means largest distance, not smallest count/value — the comparator is
//     what encodes that, the surrounding algorithm is identical
//   - comparing squared distance avoids a square root on every comparison,
//     which doesn't change any ordering (distance is never negative)

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
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < this.data.length && this.compare(this.data[left], this.data[best]) < 0) best = left;
      if (right < this.data.length && this.compare(this.data[right], this.data[best]) < 0) best = right;
      if (best === i) break;
      [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
      i = best;
    }
  }
  return top;
};
Heap.prototype.peek = function () { return this.data[0]; };
Object.defineProperty(Heap.prototype, "size", { get() { return this.data.length; } });

function kClosest(points, k) {
  const heap = new Heap((a, b) => b[0] - a[0]); // max-heap by [distSquared, point]
  for (const point of points) {
    const dist = point[0] * point[0] + point[1] * point[1];
    heap.push([dist, point]);
    if (heap.size > k) heap.pop(); // farthest so far: not among the K closest
  }
  return heap.data.map(([, point]) => point);
}

// Demo
if (require.main === module) {
  console.log(kClosest([[1, 3], [-2, 2]], 1)); // [[-2,2]]
  console.log(kClosest([[3, 3], [5, -1], [-2, 4]], 2)); // [[-2,4],[3,3]] (order not guaranteed)
}

module.exports = { Heap, kClosest };
