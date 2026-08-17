// Pattern: a VIRTUAL K-way merge — the "K sorted sequences" aren't given
// directly; they're implicit rows of a combination space, generated on demand.
// When:
//   - given two sorted arrays, find the k pairs (one from each) with the
//     smallest sums (LeetCode 373)
// Why:
//   - fix i in nums1: as j increases through nums2, `nums1[i] + nums2[j]`
//     is a sorted sequence — so nums1 effectively defines UP TO len(nums1)
//     sorted "rows", each one materialized lazily one pair at a time
//   - seeding the heap with only `(i, 0)` for each i (not the full
//     cross-product) keeps it at O(min(len1, k)) size — the same
//     one-slot-per-source discipline as variant 1, applied to a source
//     that's computed instead of stored

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

function kSmallestPairs(nums1, nums2, k) {
  if (nums1.length === 0 || nums2.length === 0) return [];

  const heap = new Heap((a, b) => a[0] - b[0]); // [sum, i, j]
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    heap.push([nums1[i] + nums2[0], i, 0]);
  }

  const result = [];
  while (result.length < k && heap.size > 0) {
    const [, i, j] = heap.pop();
    result.push([nums1[i], nums2[j]]);
    if (j + 1 < nums2.length) {
      heap.push([nums1[i] + nums2[j + 1], i, j + 1]);
    }
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log(kSmallestPairs([1, 7, 11], [2, 4, 6], 3)); // [[1,2],[1,4],[1,6]]
}

module.exports = { Heap, kSmallestPairs };
