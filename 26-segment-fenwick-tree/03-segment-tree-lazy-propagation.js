// Pattern: Segment Tree + lazy propagation — range update + range query
// When: updates apply to a whole RANGE at once (not a single point) —
//       naively that means updating every leaf in the range, O(n) per
//       update, defeating the point of a log-n structure.
// Why it works: when an update fully covers a node's range, don't recurse
//       into its children — just record "add val to everything under here"
//       in a lazy tag on the node itself and update the node's own stored
//       sum immediately. That tag is only pushed down into the children
//       the next time something needs to look inside this node (another
//       update or query that doesn't fully cover it) — so a child pays for
//       being examined, not for every update that happened to cover it.

class LazySegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.lazy = new Array(4 * this.n).fill(0);
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

  _push(node, start, end) {
    if (this.lazy[node] === 0) return;
    this.tree[node] += this.lazy[node] * (end - start + 1);
    if (start !== end) {
      this.lazy[2 * node] += this.lazy[node];
      this.lazy[2 * node + 1] += this.lazy[node];
    }
    this.lazy[node] = 0;
  }

  _updateRange(node, start, end, l, r, val) {
    this._push(node, start, end);
    if (r < start || end < l) return;
    if (l <= start && end <= r) {
      this.lazy[node] += val;
      this._push(node, start, end);
      return;
    }
    const mid = (start + end) >> 1;
    this._updateRange(2 * node, start, mid, l, r, val);
    this._updateRange(2 * node + 1, mid + 1, end, l, r, val);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  _queryRange(node, start, end, l, r) {
    this._push(node, start, end);
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.tree[node];
    const mid = (start + end) >> 1;
    return this._queryRange(2 * node, start, mid, l, r) + this._queryRange(2 * node + 1, mid + 1, end, l, r);
  }

  addRange(l, r, val) {
    this._updateRange(1, 0, this.n - 1, l, r, val);
  }

  sumRange(l, r) {
    return this._queryRange(1, 0, this.n - 1, l, r);
  }
}

module.exports = { LazySegmentTree };

if (require.main === module) {
  const st = new LazySegmentTree([1, 2, 3, 4, 5]);
  console.log(st.sumRange(0, 4)); // 15
  st.addRange(1, 3, 10); // [1, 12, 13, 14, 5]
  console.log(st.sumRange(0, 4)); // 45
  console.log(st.sumRange(1, 3)); // 12+13+14 = 39
}
