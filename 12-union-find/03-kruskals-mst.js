// Pattern: sort by weight, then reuse variant 2's cycle check — a greedy
// edge selection where union-find is what makes "does this edge close a
// cycle" an O(α(n)) check instead of a full traversal.
// When:
//   - connect every node with the minimum total edge weight (Kruskal's
//     algorithm for a Minimum Spanning Tree)
// Why:
//   - taking edges from cheapest to most expensive and skipping any edge
//     that would connect two nodes already in the same component is
//     provably optimal — an edge that closes a cycle is redundant (its
//     endpoints are already reachable from each other more cheaply)
//   - the MST is complete once exactly n-1 edges have been accepted for n
//     nodes; fewer than that means the graph was never fully connected

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

function minimumSpanningTree(n, edges) {
  const sorted = [...edges].sort((a, b) => a[2] - b[2]); // [u, v, weight]
  const dsu = new UnionFind(n);
  let totalWeight = 0;
  let edgesUsed = 0;

  for (const [u, v, weight] of sorted) {
    if (dsu.union(u, v)) {
      totalWeight += weight;
      edgesUsed++;
      if (edgesUsed === n - 1) break; // tree is complete, spanning all n nodes
    }
  }
  return edgesUsed === n - 1 ? totalWeight : -1; // -1: graph wasn't fully connectable
}

// Demo
if (require.main === module) {
  const edges = [
    [0, 1, 4], [0, 2, 1], [1, 2, 2], [1, 3, 5], [2, 3, 8],
  ];
  console.log(minimumSpanningTree(4, edges)); // 8 (edges: 0-2(1), 1-2(2), 1-3(5))
}

module.exports = { UnionFind, minimumSpanningTree };
