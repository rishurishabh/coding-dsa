// Pattern: DFS with three states, not two — "visited" alone can't tell a
// back-edge (a real cycle) apart from a cross-edge (two separate branches
// that happen to both reach the same earlier-finished node).
// When:
//   - does a directed graph contain a cycle? (the same check that decides
//     whether a topological sort is even possible — see the future
//     Topological Sort module)
// Why:
//   - a node fully finished (all its descendants explored, function
//     returned) can safely be reached again from elsewhere — that's not a
//     cycle, just two paths converging
//   - a node still ON THE CURRENT CALL STACK being reached again IS a
//     cycle — the three states (unvisited / in-progress / done) are exactly
//     what distinguish those two cases, where a simple visited Set can't

function hasCycleDirected(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) adj[a].push(b);

  const UNVISITED = 0;
  const IN_PROGRESS = 1;
  const DONE = 2;
  const state = new Array(n).fill(UNVISITED);

  function dfs(node) {
    state[node] = IN_PROGRESS;
    for (const neighbor of adj[node]) {
      if (state[neighbor] === IN_PROGRESS) return true; // back-edge: a real cycle
      if (state[neighbor] === UNVISITED && dfs(neighbor)) return true;
    }
    state[node] = DONE; // fully explored — safe for anyone else to reach
    return false;
  }

  for (let node = 0; node < n; node++) {
    if (state[node] === UNVISITED && dfs(node)) return true;
  }
  return false;
}

// Demo
if (require.main === module) {
  console.log(hasCycleDirected(3, [[0, 1], [1, 2]])); // false — a DAG
  console.log(hasCycleDirected(3, [[0, 1], [1, 2], [2, 0]])); // true — 0->1->2->0
  console.log(hasCycleDirected(4, [[0, 1], [0, 2], [1, 3], [2, 3]])); // false — converges, doesn't cycle
}

module.exports = { hasCycleDirected };
