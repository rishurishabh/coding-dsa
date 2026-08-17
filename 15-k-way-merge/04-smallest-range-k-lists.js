// Pattern: variant 2's merge, read for a SHRINKING WINDOW instead of the
// merged output itself — the heap's minimum and a separately-tracked
// maximum together define a range guaranteed to touch every list.
// When:
//   - K sorted lists; find the smallest range that includes at least one
//     number from EACH list (LeetCode 632)
// Why:
//   - at any point in the merge, the heap's minimum and the running
//     maximum-ever-pushed bound a range containing one candidate from
//     every list (that's what "one slot per source" guarantees) — advancing
//     past the current minimum can only shrink that range's left edge or
//     grow its right edge, so checking after every pop finds the best one
//   - the merge must STOP the moment any list runs out — past that point,
//     no range could cover all K lists anymore, unlike variants 1-2 which
//     merge until every list is fully drained

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

function smallestRange(lists) {
  const heap = new Heap((a, b) => a[0] - b[0]); // [value, listIndex, elemIndex]
  let currentMax = -Infinity;

  for (let i = 0; i < lists.length; i++) {
    heap.push([lists[i][0], i, 0]);
    currentMax = Math.max(currentMax, lists[i][0]);
  }

  let best = [-1e9, 1e9];

  while (true) {
    const [value, listIndex, elemIndex] = heap.pop();
    if (currentMax - value < best[1] - best[0]) best = [value, currentMax];

    if (elemIndex + 1 >= lists[listIndex].length) break; // this list is exhausted — no wider coverage possible
    const nextVal = lists[listIndex][elemIndex + 1];
    currentMax = Math.max(currentMax, nextVal);
    heap.push([nextVal, listIndex, elemIndex + 1]);
  }
  return best;
}

// Demo
if (require.main === module) {
  const lists = [[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]];
  console.log(smallestRange(lists)); // [20, 24]
}

module.exports = { Heap, smallestRange };
