// Pattern: 0-1 BFS — shortest path when every edge weighs 0 or 1
// When: edge weights are restricted to exactly 0 or 1 (a very common
//       special case — "free" transitions mixed with "cost 1" moves).
//       A full Dijkstra with a heap works but its O(log n) per operation
//       is unnecessary overhead for a distance range this narrow.
// Why it works: use a deque instead of a heap. Pushing a 0-weight edge's
//       destination to the FRONT means it's processed before any node
//       already waiting with a possibly-larger distance; pushing a
//       1-weight edge's destination to the BACK keeps it in line behind
//       everything else. This keeps the deque's distances non-decreasing
//       front-to-back at all times — the same ordering property a heap
//       guarantees, but maintained with O(1) pushes instead of O(log n).

// graph: Map<node, Array<[neighbor, weight]>>, weight is 0 or 1
function zeroOneBFS(graph, start, numVertices) {
  const dist = new Array(numVertices).fill(Infinity);
  dist[start] = 0;

  const deque = [start];

  while (deque.length > 0) {
    const node = deque.shift();

    for (const [neighbor, weight] of graph.get(node) || []) {
      const newDist = dist[node] + weight;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        if (weight === 0) deque.unshift(neighbor);
        else deque.push(neighbor);
      }
    }
  }

  return dist;
}

module.exports = { zeroOneBFS };

if (require.main === module) {
  const graph = new Map([
    [0, [[1, 0], [2, 1]]],
    [1, [[2, 1], [3, 1]]],
    [2, [[3, 0]]],
    [3, []],
  ]);

  console.log(zeroOneBFS(graph, 0, 4)); // [ 0, 0, 1, 1 ]
}
