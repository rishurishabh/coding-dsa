// Pattern: variant 1's heap, made PERSISTENT — the heap survives across
// calls instead of being built fresh once, because new values keep arriving
// over time.
// When:
//   - design a class that reports the Kth largest value seen so far, after
//     every new number added to an ongoing stream (LeetCode 703)
// Why:
//   - re-running variant 1 from scratch on every new value would be
//     O(n log k) per call; keeping the same size-K heap alive between
//     calls means each `add()` is a single O(log k) push (+ maybe a pop)
//     against whatever the heap already holds — the state IS the answer,
//     continuously maintained instead of recomputed

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

function KthLargest(k, nums) {
  this.k = k;
  this.heap = new Heap((a, b) => a - b); // min-heap, capped at size k
  for (const n of nums) this.add(n);
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

module.exports = { Heap, KthLargest };
