// Structure: an adjacency list (variant 1's shape) walked with DFS to
// mark everything reachable from a starting vertex — vertices that
// never get marked from any prior start must belong to a NEW component.
// When:
//   - counting how many separate connected pieces a graph splits into
// Why:
//   - within one connected component, DFS/BFS from any vertex reaches
//     every other vertex in that component — that's the definition of
//     "connected"
//   - looping over every vertex 0..n-1 and only starting a fresh DFS
//     when the vertex hasn't been visited yet is what guarantees each
//     component gets counted exactly once, regardless of which vertex
//     happens to be checked first
//   - [12-union-find](../../12-union-find/README.md) solves this exact
//     question with a different technique (merging sets as edges are
//     processed, no adjacency list needed at all) — this file solves it
//     with plain graph traversal instead, to show the same answer is
//     reachable from the raw representation directly

function countComponents(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = new Array(n).fill(false);

  function dfs(start) {
    const stack = [start];
    while (stack.length > 0) {
      const node = stack.pop();
      if (visited[node]) continue;
      visited[node] = true;
      for (const neighbor of adj[node]) {
        if (!visited[neighbor]) stack.push(neighbor);
      }
    }
  }

  let count = 0;
  for (let v = 0; v < n; v++) {
    if (!visited[v]) {
      count++;
      dfs(v);
    }
  }
  return count;
}

// Demo
if (require.main === module) {
  console.log(countComponents(5, [[0, 1], [1, 2], [3, 4]])); // 2
  console.log(countComponents(5, [[0, 1], [1, 2], [2, 3], [3, 4]])); // 1
}

module.exports = { countComponents };
