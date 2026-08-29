// Pattern: Segment Tree — range query + point update
// When: an array needs BOTH range queries (sum/min/max over [l,r]) AND
//       point updates, repeated many times. Recomputing a range query from
//       scratch is O(n) per query; a plain prefix-sum array answers queries
//       in O(1) but needs O(n) to fix after a single update — neither is
//       fast for a workload that mixes both.
// Why it works: a binary tree over the array where each node covers a
//       contiguous range and stores the combined value of its two children.
//       A query only ever needs to visit O(log n) nodes to cover any [l,r]
//       range (nodes that don't overlap [l,r] are skipped whole, nodes
//       fully inside it are returned whole) — same O(log n) for updates,
//       since only the O(log n) ancestors of a leaf need to change.

class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this._build(arr, 1, 0, this.n - 1);
  }

  _build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }
    const mid = (start + end) >> 1;
    this._build(arr, 2 * node, start, mid);
    this._build(arr, 2 * node + 1, mid + 1, end);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  _update(node, start, end, idx, val) {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = (start + end) >> 1;
    if (idx <= mid) this._update(2 * node, start, mid, idx, val);
    else this._update(2 * node + 1, mid + 1, end, idx, val);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  _query(node, start, end, l, r) {
    if (r < start || end < l) return 0; // no overlap
    if (l <= start && end <= r) return this.tree[node]; // fully covered
    const mid = (start + end) >> 1;
    return this._query(2 * node, start, mid, l, r) + this._query(2 * node + 1, mid + 1, end, l, r);
  }

  updateAt(idx, val) {
    this._update(1, 0, this.n - 1, idx, val);
  }

  rangeSum(l, r) {
    return this._query(1, 0, this.n - 1, l, r);
  }
}

module.exports = { SegmentTree };

if (require.main === module) {
  const st = new SegmentTree([1, 3, 5, 7, 9, 11]);
  console.log(st.rangeSum(1, 3)); // 15 (3+5+7)
  st.updateAt(1, 10);
  console.log(st.rangeSum(1, 3)); // 22 (10+5+7)
  console.log(st.rangeSum(0, 5)); // 1+10+5+7+9+11 = 43
}
