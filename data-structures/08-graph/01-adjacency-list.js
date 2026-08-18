// Structure: a map from each vertex to the list of vertices it connects
// to — only edges that actually exist take up any space at all.
// When:
//   - most pairs of vertices are NOT connected (a "sparse" graph) — the
//     common case for real-world graphs (road networks, social graphs,
//     dependency graphs)
// Why:
//   - space is O(V + E) — one list entry per vertex, one array entry per
//     edge — instead of reserving space for every POSSIBLE pair
//   - iterating a vertex's neighbors (what BFS/DFS/Dijkstra all do
//     constantly) is O(degree) — only the edges that exist get visited,
//     never wasted work scanning non-edges
//   - the cost is checking whether one SPECIFIC edge exists: O(degree)
//     here, since the neighbor list has to be scanned — variant 2's
//     adjacency matrix trades this away for O(1) edge lookups instead
//   - this exact representation is what
//     [10-graph-bfs-dfs](../../10-graph-bfs-dfs/README.md),
//     [11-topological-sort](../../11-topological-sort/README.md), and
//     [12-union-find](../../12-union-find/README.md) all assume is
//     already built — this module is where it gets built

function Graph(directed = false) {
  this.directed = directed;
  this.adj = new Map();
}
Graph.prototype.addVertex = function (v) {
  if (!this.adj.has(v)) this.adj.set(v, []);
};
Graph.prototype.addEdge = function (u, v) {
  this.addVertex(u);
  this.addVertex(v);
  this.adj.get(u).push(v);
  if (!this.directed) this.adj.get(v).push(u);
};
Graph.prototype.neighbors = function (v) {
  return this.adj.get(v) || [];
};
Graph.prototype.hasEdge = function (u, v) {
  return this.adj.has(u) && this.adj.get(u).includes(v);
};

// Demo
if (require.main === module) {
  const g = new Graph(false); // undirected
  g.addEdge("A", "B");
  g.addEdge("A", "C");
  g.addEdge("B", "C");
  console.log(g.neighbors("A")); // ["B", "C"]
  console.log(g.hasEdge("A", "C")); // true
  console.log(g.hasEdge("B", "D")); // false — D doesn't even exist
}

module.exports = { Graph };
