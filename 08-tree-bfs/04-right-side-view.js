// Pattern: level-size snapshot, keep only ONE node per level — the same
// traversal as variant 1, reading just the last (or first) value seen
// instead of collecting the whole level.
// When:
//   - what does this tree look like standing to its right? Return the
//     rightmost node's value at every depth (LeetCode 199)
// Why:
//   - within a level, nodes are dequeued strictly left to right, so the
//     LAST node popped during a level's loop is provably the rightmost one
//     at that depth — no need to collect the full level and index into it afterward

function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null) { node.left = new TreeNode(leftVal); queue.push(node.left); }
    }
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null) { node.right = new TreeNode(rightVal); queue.push(node.right); }
    }
  }
  return root;
}

function rightSideView(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) result.push(node.val); // last one popped this level = rightmost
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}

// Demo
if (require.main === module) {
  const root = buildTree([1, 2, 3, null, 5, null, 4]);
  console.log(rightSideView(root)); // [1,3,4]
}

module.exports = { TreeNode, buildTree, rightSideView };
