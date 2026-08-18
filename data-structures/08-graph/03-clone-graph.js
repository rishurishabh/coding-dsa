// Structure: a graph made of nodes that directly reference their
// neighbors (not a Map-based adjacency list) — closer to how a linked
// list's nodes reference each other, just with more than one pointer
// each and possible cycles.
// When:
//   - a deep copy of a connected graph is needed — every node AND every
//     edge duplicated, with the copy fully independent of the original
// Why:
//   - a graph can have cycles, so naive recursive copying (copy this
//     node, then copy its neighbors, then THEIR neighbors...) would
//     recurse forever without a way to detect "already copied this one"
//   - a map from original node → its copy is what breaks the cycle:
//     before copying a node's neighbors, check the map first — if it's
//     already there, return the existing copy instead of making a new
//     one and recursing again
//   - this is the graph version of the same problem
//     [04-lru-cache.js](../03-linked-list/04-lru-cache.js) solves with a
//     map to a linked-list node — "have I already built this?" is
//     answered by a lookup, not by re-deriving it

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
    cloned.set(original, copy);
    for (const neighbor of original.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }
    return copy;
  }

  return dfs(node);
}

// Demo
if (require.main === module) {
  // Triangle: 1 -- 2 -- 3 -- 1
  const n1 = new Node(1);
  const n2 = new Node(2);
  const n3 = new Node(3);
  n1.neighbors = [n2, n3];
  n2.neighbors = [n1, n3];
  n3.neighbors = [n1, n2];

  const clone = cloneGraph(n1);
  console.log(clone.val); // 1
  console.log(clone.neighbors.map((n) => n.val)); // [2, 3]
  console.log(clone !== n1); // true — different object, same shape
  // walk clone -> its "2" neighbor -> ITS neighbors, and confirm one of them
  // is the SAME clone object as the root, not a freshly re-copied duplicate
  const cloneOfTwo = clone.neighbors[0];
  console.log(cloneOfTwo.neighbors.includes(clone)); // true — cycle closed onto the same object
}

module.exports = { Node, cloneGraph };
