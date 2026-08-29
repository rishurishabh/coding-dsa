// Pattern: Fenwick Tree over a difference array — range update + point query
// When: the workload is the OPPOSITE of variant 2 — many range updates, but
//       only point queries — and you want a BIT's small footprint instead
//       of a lazy segment tree.
// Why it works: store a BIT over the ARRAY OF DIFFERENCES (diff[i] = a[i] -
//       a[i-1]) instead of the array itself. Adding `val` to a whole range
//       [l, r] only touches the two boundary points of the diff array:
//       diff[l] += val (everything from l onward shifts up) and
//       diff[r+1] -= val (undo that shift right after r). A point query for
//       a[i] is then just the prefix sum of the diff array up to i — the
//       exact same BIT operation as variant 2, applied to a different array.

class FenwickRangeUpdate {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0); // BIT over the difference array
  }

  _update(i, delta) {
    for (; i <= this.n; i += i & -i) this.tree[i] += delta;
  }

  rangeUpdate(l, r, val) {
    this._update(l, val);
    this._update(r + 1, -val);
  }

  pointQuery(i) {
    let sum = 0;
    for (; i > 0; i -= i & -i) sum += this.tree[i];
    return sum;
  }
}

module.exports = { FenwickRangeUpdate };

if (require.main === module) {
  const fru = new FenwickRangeUpdate(5); // 1-indexed positions 1..5
  const initial = [1, 2, 3, 4, 5];
  initial.forEach((v, i) => fru.rangeUpdate(i + 1, i + 1, v)); // seed each position

  console.log([1, 2, 3, 4, 5].map((_, i) => fru.pointQuery(i + 1))); // [1,2,3,4,5]

  fru.rangeUpdate(2, 4, 10); // add 10 to positions 2..4
  console.log([1, 2, 3, 4, 5].map((_, i) => fru.pointQuery(i + 1))); // [1,12,13,14,5]
}
