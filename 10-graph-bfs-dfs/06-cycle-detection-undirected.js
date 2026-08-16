// Pattern: DFS with a remembered PARENT — a visited neighbor only means a
// cycle if it isn't the edge you just walked in on.
// When:
//   - does an undirected graph contain a cycle?
// Why:
//   - an undirected edge is stored both ways (A's list contains B, and B's
//     list contains A), so every DFS step immediately sees the node it just
//     came from as a "visited neighbor" — without tracking parent, that
//     would look like a cycle every single time, on every edge

function hasCycleUndirected(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }

  const visited = new Set();

  function dfs(node, parent) {
    visited.add(node);
    for (const neighbor of adj[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true; // reached an already-visited node that ISN'T where we came from
      }
    }
    return false;
  }

  for (let node = 0; node < n; node++) {
    if (!visited.has(node) && dfs(node, -1)) return true;
  }
  return false;
}

// Demo
if (require.main === module) {
  console.log(hasCycleUndirected(4, [[0, 1], [1, 2], [2, 3]])); // false — a simple chain
  console.log(hasCycleUndirected(4, [[0, 1], [1, 2], [2, 3], [3, 0]])); // true — closes the loop
}

module.exports = { hasCycleUndirected };
