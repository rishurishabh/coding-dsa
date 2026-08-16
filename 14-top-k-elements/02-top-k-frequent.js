// Pattern: variant 1's fixed-size heap, ordered by a DERIVED key — frequency
// counted first, then the heap operates on that count instead of the raw value.
// When:
//   - find the k most frequent elements in an array (LeetCode 347)
// Why:
//   - "top K" isn't always about the values themselves; counting first
//     (one O(n) pass with a Map) turns "k most frequent" into exactly the
//     same fixed-size-heap shape as variant 1, just keyed by count instead
//     of value

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

function topKFrequent(nums, k) {
  const counts = new Map();
  for (const n of nums) counts.set(n, (counts.get(n) || 0) + 1);

  const heap = new Heap((a, b) => a[1] - b[1]); // min-heap by [value, frequency]
  for (const entry of counts) {
    heap.push(entry);
    if (heap.size > k) heap.pop(); // lowest frequency so far: not in the top K
  }

  return heap.data.map(([value]) => value).sort((a, b) => counts.get(b) - counts.get(a));
}

// Demo
if (require.main === module) {
  console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1,2]
}

module.exports = { Heap, topKFrequent };
