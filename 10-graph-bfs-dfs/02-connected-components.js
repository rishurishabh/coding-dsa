// Pattern: DFS over an adjacency list with an explicit visited set — same
// flood-fill idea as variant 1, generalized from grid neighbors to
// arbitrary edges.
// When:
//   - count how many disjoint connected groups exist in a graph given as a
//     list of edges (LeetCode 547-style, "Number of Provinces")
// Why:
//   - a grid's neighbors are implicit (just +/-1 on a coordinate); a general
//     graph's neighbors have to be looked up, so an adjacency list is built
//     first — the visited Set then plays exactly the role "mark the cell 0"
//     played in variant 1, just for nodes that aren't coordinates

function countComponents(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }

  const visited = new Set();
  function dfs(node) {
    visited.add(node);
    for (const neighbor of adj[node]) {
      if (!visited.has(neighbor)) dfs(neighbor);
    }
  }

  let count = 0;
  for (let node = 0; node < n; node++) {
    if (!visited.has(node)) {
      count++; // found a new component's first node
      dfs(node); // claim every node reachable from it
    }
  }
  return count;
}

// Demo
if (require.main === module) {
  console.log(countComponents(5, [[0, 1], [1, 2], [3, 4]])); // 2
}

module.exports = { countComponents };
