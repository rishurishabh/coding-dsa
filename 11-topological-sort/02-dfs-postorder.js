// Pattern: DFS postorder, reversed — the same three-state cycle detection
// from 10-graph-bfs-dfs/07-cycle-detection-directed.js, with one addition:
// record a node as DONE, then reverse that recording order at the end.
// When:
//   - same problem as variant 1 (dependency ordering), solved via DFS
//     instead of BFS
// Why:
//   - a node can only be marked DONE after every node it points to is
//     already DONE — which means, by construction, everything that node
//     depends on for correctness comes LATER in DFS-finish order and
//     EARLIER once that order is reversed
//   - the IN_PROGRESS state that catches cycles here is the exact same
//     mechanism as module 10's directed cycle check — topological sort is
//     only possible at all when that check comes back clean

function topologicalSortDFS(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [from, to] of edges) adj[from].push(to);

  const UNVISITED = 0;
  const IN_PROGRESS = 1;
  const DONE = 2;
  const state = new Array(n).fill(UNVISITED);
  const finishOrder = [];

  function dfs(node) {
    state[node] = IN_PROGRESS;
    for (const neighbor of adj[node]) {
      if (state[neighbor] === IN_PROGRESS) return false; // back-edge: cycle
      if (state[neighbor] === UNVISITED && !dfs(neighbor)) return false;
    }
    state[node] = DONE;
    finishOrder.push(node); // this node is only fully "done" after all its dependents are
    return true;
  }

  for (let node = 0; node < n; node++) {
    if (state[node] === UNVISITED && !dfs(node)) return null;
  }
  return finishOrder.reverse();
}

// Demo
if (require.main === module) {
  console.log(topologicalSortDFS(4, [[0, 1], [0, 2], [1, 3], [2, 3]])); // [0,2,1,3] (or another valid order)
  console.log(topologicalSortDFS(3, [[0, 1], [1, 2], [2, 0]])); // null — cycle
}

module.exports = { topologicalSortDFS };
