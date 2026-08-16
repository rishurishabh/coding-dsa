// Pattern: Kahn's algorithm — BFS driven by in-degree, not a visited set.
// A node is only safe to output once EVERY prerequisite pointing at it has
// already been output.
// When:
//   - order tasks with dependencies so every prerequisite comes before what
//     depends on it (LeetCode 207/210, "Course Schedule")
// Why:
//   - a node with in-degree 0 has no unmet prerequisites — it's always safe
//     to output next; outputting it and decrementing its neighbors' in-degree
//     is what "removes" its edges, which may free up new in-degree-0 nodes
//   - if the queue empties before every node is output, whatever's left is
//     stuck in a cycle (each has a prerequisite that never got satisfied) —
//     this doubles as the same cycle check module 10's directed DFS does,
//     found a different way

function topologicalSortKahn(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);
  for (const [from, to] of edges) {
    adj[from].push(to);
    indegree[to]++;
  }

  const queue = [];
  for (let node = 0; node < n; node++) {
    if (indegree[node] === 0) queue.push(node); // no prerequisites: safe immediately
  }

  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of adj[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor); // just became safe
    }
  }

  return order.length === n ? order : null; // fewer than n output: a cycle blocked the rest
}

// Demo
if (require.main === module) {
  console.log(topologicalSortKahn(4, [[0, 1], [0, 2], [1, 3], [2, 3]])); // [0,1,2,3]
  console.log(topologicalSortKahn(3, [[0, 1], [1, 2], [2, 0]])); // null — cycle
}

module.exports = { topologicalSortKahn };
