// Pattern: Kahn's algorithm, backtracked over every choice instead of
// greedily taking one — when several nodes are available at once, variant 1
// just picks whichever the queue gives it; this explores EACH option.
// When:
//   - enumerate every valid topological order, not just one
// Why:
//   - each in-degree-0 node represents a genuine fork: choosing it and
//     choosing a different available node both lead to valid (but
//     different) completions — trying one, undoing it (restoring in-degrees
//     and the visited set), then trying the next is the same choose/explore/
//     un-choose shape as 09-tree-dfs/03-all-paths-with-backtrack.js

function allTopologicalOrders(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);
  for (const [from, to] of edges) {
    adj[from].push(to);
    indegree[to]++;
  }

  const result = [];
  const path = [];
  const visited = new Set();

  function backtrack() {
    let extended = false;
    for (let node = 0; node < n; node++) {
      if (indegree[node] === 0 && !visited.has(node)) {
        // choose
        visited.add(node);
        path.push(node);
        for (const neighbor of adj[node]) indegree[neighbor]--;
        extended = true;

        backtrack();

        // un-choose: restore exactly the state before this node was picked
        visited.delete(node);
        path.pop();
        for (const neighbor of adj[node]) indegree[neighbor]++;
      }
    }
    if (!extended && path.length === n) result.push([...path]);
  }

  backtrack();
  return result;
}

// Demo
if (require.main === module) {
  console.log(allTopologicalOrders(3, [[0, 2], [1, 2]])); // [[0,1,2],[1,0,2]]
}

module.exports = { allTopologicalOrders };
