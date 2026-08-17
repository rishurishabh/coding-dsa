// Pattern: variant 1's exact mechanism, tracked by INDICES instead of
// pointers — arrays don't have a `.next`, so "this source's next
// candidate" has to be looked up via `[arrayIndex][elementIndex + 1]`.
// When:
//   - merge K sorted arrays into one sorted array
// Why:
//   - same one-slot-per-source heap discipline as variant 1; the only
//     change is what identifies "where a candidate came from" — a node
//     reference there, an (array index, element index) pair here
//   - this index-tracking shape is what variants 3-5 all build on: matrix
//     rows, list positions, and combination indices are all just
//     different flavors of "which source, how far into it"

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

function mergeKSortedArrays(arrays) {
  const heap = new Heap((a, b) => a[0] - b[0]); // [value, arrayIndex, elementIndex]
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length > 0) heap.push([arrays[i][0], i, 0]);
  }

  const result = [];
  while (heap.size > 0) {
    const [value, arrayIndex, elementIndex] = heap.pop();
    result.push(value);
    const nextIndex = elementIndex + 1;
    if (nextIndex < arrays[arrayIndex].length) {
      heap.push([arrays[arrayIndex][nextIndex], arrayIndex, nextIndex]);
    }
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log(mergeKSortedArrays([[1, 4, 7], [2, 5, 8], [3, 6, 9]])); // [1,2,3,4,5,6,7,8,9]
}

module.exports = { Heap, mergeKSortedArrays };
