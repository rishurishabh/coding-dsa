// Pattern: BFS with 2-coloring — every neighbor MUST get the opposite color
// of the current node; a conflict means the graph can't be split into two
// independent groups.
// When:
//   - can every node be colored one of two colors such that no edge
//     connects two same-colored nodes? (LeetCode 785)
// Why:
//   - this is the same level-by-level BFS as every other variant here, with
//     the "visited" check upgraded to a "visited with an assigned color"
//     check — a neighbor that's already colored the SAME as the current
//     node proves no valid 2-coloring exists, discovered the moment it happens

function isBipartite(graph) {
  const n = graph.length;
  const colors = new Array(n).fill(-1); // -1 = uncolored

  for (let start = 0; start < n; start++) {
    if (colors[start] !== -1) continue; // already handled via an earlier component

    colors[start] = 0;
    const queue = [start];
    while (queue.length) {
      const node = queue.shift();
      for (const neighbor of graph[node]) {
        if (colors[neighbor] === -1) {
          colors[neighbor] = 1 - colors[node]; // opposite color
          queue.push(neighbor);
        } else if (colors[neighbor] === colors[node]) {
          return false; // same color on both ends of an edge
        }
      }
    }
  }
  return true;
}

// Demo
if (require.main === module) {
  console.log(isBipartite([[1, 3], [0, 2], [1, 3], [0, 2]])); // true — a 4-cycle
  console.log(isBipartite([[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]])); // false — odd cycle 0-1-2-0
}

module.exports = { isBipartite };
