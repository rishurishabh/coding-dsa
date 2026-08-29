// Pattern: Bellman-Ford algorithm — single-source shortest path, negative weights allowed
// When: some edge weights can be negative, so Dijkstra's "finalize the
//       closest node and never revisit it" greedy step is no longer safe —
//       a negative edge discovered later could still shorten an already
//       "finalized" distance.
// Why it works: relax EVERY edge, V-1 times. Any shortest path between two
//       nodes uses at most V-1 edges (a simple path can't repeat a vertex),
//       so V-1 full rounds of relaxation are guaranteed to have propagated
//       the true shortest distance along every possible shortest path. A
//       Vth round that still finds an improvement means a negative cycle
//       exists — distances would keep shrinking forever.

function bellmanFord(edges, numVertices, start) {
  const dist = new Array(numVertices).fill(Infinity);
  dist[start] = 0;

  for (let i = 0; i < numVertices - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      return { dist: null, hasNegativeCycle: true };
    }
  }

  return { dist, hasNegativeCycle: false };
}

module.exports = { bellmanFord };

if (require.main === module) {
  // Same graph as 01-dijkstra.js: A=0, B=1, C=2, D=3, E=4
  const edges = [
    [0, 1, 4], [0, 2, 1],
    [2, 1, 2],
    [1, 3, 1], [2, 3, 5],
    [3, 4, 3],
  ];
  console.log(bellmanFord(edges, 5, 0)); // { dist: [0,3,1,4,7], hasNegativeCycle: false }

  // A negative cycle reachable from the source: 1 -> 2 -> 1 sums to -2.
  const cyclicEdges = [[0, 1, 1], [1, 2, -1], [2, 1, -1]];
  console.log(bellmanFord(cyclicEdges, 3, 0)); // { dist: null, hasNegativeCycle: true }
}
