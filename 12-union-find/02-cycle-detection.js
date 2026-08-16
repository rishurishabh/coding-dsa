// Pattern: union's own return value IS the cycle check — no separate DFS or
// parent-tracking needed, unlike 10-graph-bfs-dfs/06-cycle-detection-undirected.js.
// When:
//   - given edges added one at a time, find the one edge that would create
//     a cycle (LeetCode 684, "Redundant Connection")
// Why:
//   - two endpoints already sharing a root means a path already connects
//     them — adding a direct edge between them doesn't connect anything
//     new, it closes a loop
//   - processing edges in the given order and stopping at the first union()
//     that returns false finds that edge directly, in roughly O(n α(n))
//     total instead of re-running a full traversal after every edge added

function UnionFind(n) {
  this.parent = Array.from({ length: n }, (_, i) => i);
  this.rank = new Array(n).fill(0);
}
UnionFind.prototype.find = function (x) {
  if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
  return this.parent[x];
};
UnionFind.prototype.union = function (x, y) {
  const rootX = this.find(x);
  const rootY = this.find(y);
  if (rootX === rootY) return false;
  if (this.rank[rootX] < this.rank[rootY]) this.parent[rootX] = rootY;
  else if (this.rank[rootX] > this.rank[rootY]) this.parent[rootY] = rootX;
  else { this.parent[rootY] = rootX; this.rank[rootX]++; }
  return true;
};

function findRedundantConnection(edges) {
  const dsu = new UnionFind(edges.length + 1); // nodes are 1-indexed, n edges means n nodes
  for (const [u, v] of edges) {
    if (!dsu.union(u, v)) return [u, v]; // this edge's endpoints were already connected
  }
  return null;
}

// Demo
if (require.main === module) {
  console.log(findRedundantConnection([[1, 2], [1, 3], [2, 3]])); // [2,3]
  console.log(findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])); // [1,4]
}

module.exports = { UnionFind, findRedundantConnection };
