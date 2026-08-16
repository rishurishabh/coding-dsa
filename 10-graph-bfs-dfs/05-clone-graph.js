// Pattern: DFS + a visited map that stores CLONES, not booleans — the
// traversal builds a parallel structure as it goes, instead of just marking
// cells or collecting values.
// When:
//   - deep-copy a graph that may contain cycles, given just one starting
//     node (LeetCode 133)
// Why:
//   - a plain visited Set stops infinite loops but throws away information;
//     here the thing being "remembered" for each original node is ITS
//     CLONE — so when a cycle leads back to an already-visited node, the
//     existing clone is reused (and its neighbor list wired up) instead of
//     recursing again or creating a duplicate

function Node(val, neighbors = []) {
  this.val = val;
  this.neighbors = neighbors;
}

function cloneGraph(node) {
  if (!node) return null;
  const cloned = new Map(); // original node -> its clone

  function dfs(original) {
    if (cloned.has(original)) return cloned.get(original);

    const copy = new Node(original.val);
    cloned.set(original, copy); // stored BEFORE recursing into neighbors — breaks cycles
    copy.neighbors = original.neighbors.map((n) => dfs(n));
    return copy;
  }

  return dfs(node);
}

// Demo: build a 3-node triangle (1 - 2 - 3 - 1), clone it, verify it's a
// separate structure with the same shape
if (require.main === module) {
  const n1 = new Node(1);
  const n2 = new Node(2);
  const n3 = new Node(3);
  n1.neighbors = [n2, n3];
  n2.neighbors = [n1, n3];
  n3.neighbors = [n1, n2];

  const clone1 = cloneGraph(n1);
  console.log("same object?", clone1 === n1); // false
  console.log("same value?", clone1.val === n1.val); // true
  console.log("clone's neighbor values:", clone1.neighbors.map((n) => n.val)); // [2,3]
  console.log("neighbor is a real clone, not original:", clone1.neighbors[0] !== n2); // true
}

module.exports = { Node, cloneGraph };
