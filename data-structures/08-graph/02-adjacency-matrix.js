// Structure: a V×V grid where cell [u][v] holds the weight of the edge
// from u to v (0 or absent meaning "no edge") — every possible pair
// gets a slot, whether or not an edge actually exists there.
// When:
//   - the graph is DENSE (most possible edges actually exist), or
//     "does this specific edge exist?" is checked far more often than
//     "what are this vertex's neighbors?"
// Why:
//   - checking one specific edge is O(1) — direct index into the grid,
//     no list to scan — which is exactly what variant 1's adjacency
//     list can't do without walking a neighbor list
//   - the cost is space: O(V²) regardless of how many edges actually
//     exist, and iterating a vertex's neighbors is O(V) — scanning the
//     ENTIRE row, even past all the zeros, since there's no shortcut to
//     skip non-edges the way a list would
//   - vertex count must be known/fixed up front to size the grid —
//     unlike variant 1's map, which grows to fit whatever vertices show
//     up

function GraphMatrix(n, directed = false) {
  this.n = n;
  this.directed = directed;
  this.matrix = Array.from({ length: n }, () => new Array(n).fill(0));
}
GraphMatrix.prototype.addEdge = function (u, v, weight = 1) {
  this.matrix[u][v] = weight;
  if (!this.directed) this.matrix[v][u] = weight;
};
GraphMatrix.prototype.hasEdge = function (u, v) {
  return this.matrix[u][v] !== 0;
};
GraphMatrix.prototype.neighbors = function (u) {
  const result = [];
  for (let v = 0; v < this.n; v++) {
    if (this.matrix[u][v] !== 0) result.push(v);
  }
  return result;
};

// Demo
if (require.main === module) {
  const g = new GraphMatrix(4, false);
  g.addEdge(0, 1);
  g.addEdge(0, 2);
  g.addEdge(1, 2);
  console.log(g.hasEdge(0, 2)); // true — O(1), direct index
  console.log(g.neighbors(0)); // [1, 2] — full row scanned, including vertex 3's zero
  console.log(g.hasEdge(0, 3)); // false
}

module.exports = { GraphMatrix };
