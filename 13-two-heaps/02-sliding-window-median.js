// Pattern: variant 1's two heaps + lazy deletion — a heap has no efficient
// way to remove an arbitrary element that isn't on top, so the element
// sliding out of the window can't just be pulled out directly.
// When:
//   - same running-median idea as variant 1, but over a fixed-size sliding
//     window instead of an ever-growing stream (LeetCode 480)
// Why:
//   - instead of searching a heap for the outgoing element, its removal is
//     just RECORDED in a "pending deletions" map; the element is only
//     actually popped once it happens to surface at the top of its heap —
//     any peek() or pop() first "prunes" a heap by discarding stale tops
//   - the size counters (`smallSize`/`largeSize`) track the TRUE count of
//     live elements, separate from the heap's raw (possibly stale) length —
//     that's what keeps rebalancing decisions correct despite the backlog

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

function medianSlidingWindow(nums, k) {
  const small = new Heap((a, b) => b - a); // max-heap: lower half
  const large = new Heap((a, b) => a - b); // min-heap: upper half
  const delayed = new Map(); // value -> how many pending removals owed
  let smallSize = 0;
  let largeSize = 0;

  const prune = (heap) => {
    while (heap.size > 0 && delayed.get(heap.peek()) > 0) {
      const val = heap.peek();
      delayed.set(val, delayed.get(val) - 1);
      if (delayed.get(val) === 0) delayed.delete(val);
      heap.pop();
    }
  };

  const rebalance = () => {
    if (smallSize > largeSize + 1) {
      prune(small);
      const val = small.pop();
      smallSize--;
      large.push(val);
      largeSize++;
      prune(large);
    } else if (smallSize < largeSize) {
      prune(large);
      const val = large.pop();
      largeSize--;
      small.push(val);
      smallSize++;
      prune(small);
    }
  };

  const addNum = (num) => {
    if (small.size === 0 || num <= small.peek()) { small.push(num); smallSize++; }
    else { large.push(num); largeSize++; }
    rebalance();
  };

  const removeNum = (num) => {
    delayed.set(num, (delayed.get(num) || 0) + 1);
    if (num <= small.peek()) { smallSize--; if (num === small.peek()) prune(small); }
    else { largeSize--; if (num === large.peek()) prune(large); }
    rebalance();
  };

  const getMedian = () => (k % 2 === 1 ? small.peek() : (small.peek() + large.peek()) / 2);

  const result = [];
  for (let i = 0; i < nums.length; i++) {
    addNum(nums[i]);
    if (i >= k - 1) {
      result.push(getMedian());
      removeNum(nums[i - k + 1]);
    }
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log(medianSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [1,-1,-1,3,5,6]
}

module.exports = { Heap, medianSlidingWindow };
