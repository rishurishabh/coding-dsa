// Pattern: two balanced heaps — a max-heap holding the LOWER half of the
// data, a min-heap holding the UPPER half, kept within one element of each
// other in size. The median is always at one (or both) of their tops.
// When:
//   - numbers arrive one at a time in a stream; report the median after
//     every insertion, without re-sorting everything each time (LeetCode 295)
// Why:
//   - a sorted array's middle is O(1) to read but O(n) to update on insert;
//     these two heaps flip that trade — O(log n) to insert, and the median
//     is a plain peek since both heaps' tops sit right at the 50th percentile
//   - keeping every element in `small` <= every element in `large` is what
//     the rebalancing step (push into one, immediately pop its extreme into
//     the other) guarantees after every single insertion

function Heap(compare) {
  this.data = [];
  this.compare = compare; // compare(a,b) < 0 means a has priority (sits on top)
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

function MedianFinder() {
  this.small = new Heap((a, b) => b - a); // max-heap: lower half, largest on top
  this.large = new Heap((a, b) => a - b); // min-heap: upper half, smallest on top
}
MedianFinder.prototype.addNum = function (num) {
  this.small.push(num);
  this.large.push(this.small.pop()); // send small's max over — keeps small <= large guaranteed
  if (this.large.size > this.small.size) {
    this.small.push(this.large.pop()); // pull back if large grew ahead
  }
};
MedianFinder.prototype.findMedian = function () {
  if (this.small.size > this.large.size) return this.small.peek();
  return (this.small.peek() + this.large.peek()) / 2;
};

// Demo
if (require.main === module) {
  const mf = new MedianFinder();
  for (const n of [1, 2, 3, 4]) {
    mf.addNum(n);
    console.log(`after ${n}:`, mf.findMedian());
  }
  // after 1: 1, after 2: 1.5, after 3: 2, after 4: 2.5
}

module.exports = { Heap, MedianFinder };
