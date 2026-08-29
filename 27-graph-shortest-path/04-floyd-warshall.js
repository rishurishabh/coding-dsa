// Pattern: Floyd-Warshall — all-pairs shortest path, DP over intermediate vertices
// When: you need the shortest distance between EVERY pair of nodes, not
//       just from one source — running Dijkstra or Bellman-Ford once per
//       node works but is a different algorithm shape entirely.
// Why it works: dist[i][j] after considering intermediate vertices
//       {0..k} improves to dist[i][k] + dist[k][j] if routing through k
//       is shorter than any path found using only {0..k-1} as waypoints.
//       Trying every vertex as a potential waypoint, one at a time, in
//       outer-loop order, guarantees that by the time k is considered,
//       dist[i][k] and dist[k][j] are already optimal using {0..k-1} —
//       the same "state built from a strictly smaller subproblem"
//       guarantee every DP pattern in this repo relies on.

function floydWarshall(numVertices, edges) {
  const dist = Array.from({ length: numVertices }, () => new Array(numVertices).fill(Infinity));
  for (let i = 0; i < numVertices; i++) dist[i][i] = 0;

  for (const [u, v, w] of edges) {
    dist[u][v] = Math.min(dist[u][v], w);
  }

  for (let k = 0; k < numVertices; k++) {
    for (let i = 0; i < numVertices; i++) {
      for (let j = 0; j < numVertices; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return dist;
}

module.exports = { floydWarshall };

if (require.main === module) {
  // Same graph as 01-dijkstra.js: A=0, B=1, C=2, D=3, E=4
  const edges = [
    [0, 1, 4], [0, 2, 1],
    [2, 1, 2],
    [1, 3, 1], [2, 3, 5],
    [3, 4, 3],
  ];
  const dist = floydWarshall(5, edges);
  console.log(dist[0]); // [ 0, 3, 1, 4, 7 ] — matches Dijkstra/Bellman-Ford from A
  console.log(dist[2][4]); // 6 (C -> B -> D -> E = 2+1+3)
}
