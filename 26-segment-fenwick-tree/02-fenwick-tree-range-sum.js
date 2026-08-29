// Pattern: Fenwick Tree / Binary Indexed Tree (BIT) — prefix sum + point update
// When: the same range-sum + point-update workload as a segment tree, but
//       you only ever need SUMS (not min/max/gcd) — a BIT gets the same
//       O(log n) per operation with a far smaller, array-only structure
//       and no recursion.
// Why it works: index i (1-based) in the BIT array is responsible for a
//       range of size (i & -i) — the lowest set bit of i. Moving to the
//       parent that covers more (for updates) means adding the lowest set
//       bit; moving to the range that was just covered (for prefix sums)
//       means subtracting it. Both walks are O(log n) because each step
//       strips or fills one bit of the index.
//
// Range sum [l, r] = prefixSum(r) - prefixSum(l - 1).

class FenwickTree {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0); // 1-indexed
  }

  update(i, delta) {
    for (; i <= this.n; i += i & -i) this.tree[i] += delta;
  }

  prefixSum(i) {
    let sum = 0;
    for (; i > 0; i -= i & -i) sum += this.tree[i];
    return sum;
  }

  rangeSum(l, r) {
    return this.prefixSum(r) - this.prefixSum(l - 1);
  }
}

module.exports = { FenwickTree };

if (require.main === module) {
  const arr = [1, 3, 5, 7, 9, 11]; // 0-indexed source data
  const bit = new FenwickTree(arr.length);
  arr.forEach((v, i) => bit.update(i + 1, v)); // insert at 1-indexed positions

  console.log(bit.rangeSum(2, 4)); // 3+5+7 = 15 (1-indexed positions 2..4)
  bit.update(2, 10 - 3); // set 1-indexed position 2 (value 3) to 10 — add the delta
  console.log(bit.rangeSum(2, 4)); // 10+5+7 = 22
  console.log(bit.rangeSum(1, 6)); // 1+10+5+7+9+11 = 43
}
