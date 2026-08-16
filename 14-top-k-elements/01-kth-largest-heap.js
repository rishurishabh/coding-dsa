// Pattern: fixed-size min-heap — keep only the K largest values seen so
// far; the heap's top (its minimum) is always the Kth largest overall.
// When:
//   - find the Kth largest element in an array (LeetCode 215) — solved via
//     quickselect/partition in 02-two-pointers/11-pivot-partition.js; this
//     is the heap-based alternative
// Why:
//   - the heap never needs to hold more than K elements: once it does,
//     popping the minimum discards a value that's provably not among the
//     K largest (there are already K values >= it in the heap)
//   - O(n log k) instead of quickselect's average O(n) — worse on paper,
//     but this version naturally extends to a data STREAM (variant 4),
//     where quickselect's full-array partition doesn't apply at all

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

function findKthLargest(nums, k) {
  const heap = new Heap((a, b) => a - b); // min-heap
  for (const num of nums) {
    heap.push(num);
    if (heap.size > k) heap.pop(); // discard the smallest — not in the top K
  }
  return heap.peek();
}

// Demo
if (require.main === module) {
  console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
}

module.exports = { Heap, findKthLargest };
