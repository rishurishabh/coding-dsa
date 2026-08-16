// Pattern: the disjoint-set data structure itself — every other variant in
// this module is this same structure, applied. Two optimizations make it
// fast: path compression and union by rank.
// When:
//   - need to repeatedly answer "are these two things in the same group?"
//     and "merge these two groups", without re-scanning the whole structure
//     each time
// Why:
//   - path compression: every node visited during find() gets re-pointed
//     straight at the root, so future lookups for those nodes are O(1) —
//     the tree flattens itself as a side effect of just being used
//   - union by rank: attaching the SHORTER tree under the TALLER one's root
//     keeps trees from growing tall in the first place — without it, a bad
//     sequence of unions can degrade into a straight line (O(n) per find)

function UnionFind(n) {
  this.parent = Array.from({ length: n }, (_, i) => i);
  this.rank = new Array(n).fill(0);
  this.count = n; // number of distinct components
}

UnionFind.prototype.find = function (x) {
  if (this.parent[x] !== x) {
    this.parent[x] = this.find(this.parent[x]); // path compression
  }
  return this.parent[x];
};

UnionFind.prototype.union = function (x, y) {
  const rootX = this.find(x);
  const rootY = this.find(y);
  if (rootX === rootY) return false; // already in the same set

  if (this.rank[rootX] < this.rank[rootY]) {
    this.parent[rootX] = rootY;
  } else if (this.rank[rootX] > this.rank[rootY]) {
    this.parent[rootY] = rootX;
  } else {
    this.parent[rootY] = rootX;
    this.rank[rootX]++;
  }
  this.count--;
  return true;
};

// Demo
if (require.main === module) {
  const dsu = new UnionFind(6);
  dsu.union(0, 1);
  dsu.union(1, 2);
  dsu.union(3, 4);
  console.log("0 and 2 connected:", dsu.find(0) === dsu.find(2)); // true
  console.log("0 and 3 connected:", dsu.find(0) === dsu.find(3)); // false
  console.log("component count:", dsu.count); // 3: {0,1,2}, {3,4}, {5}
}

module.exports = { UnionFind };
