// Pattern: level-size snapshot, with an early exit — the traversal stops
// the instant it finds what it's looking for, instead of running to completion.
// When:
//   - shortest distance from root to any leaf (LeetCode 111)
// Why:
//   - BFS visits nodes in increasing order of depth, so the FIRST leaf it
//     ever dequeues is guaranteed to be at the minimum depth — no need to
//     visit the rest of the tree to confirm nothing shallower exists
//   - a DFS solution has to explore every root-to-leaf path and take a min;
//     BFS gets to skip all of that by exploiting level order directly

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

function minDepth(root) {
  if (!root) return 0;
  const queue = [root];
  let depth = 1;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (!node.left && !node.right) return depth; // first leaf found = shallowest
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
  return depth;
}

// Demo
if (require.main === module) {
  console.log(minDepth(buildTree([3, 9, 20, null, null, 15, 7]))); // 2
  console.log(minDepth(buildTree([2, null, 3, null, 4, null, 5, null, 6]))); // 5
}

module.exports = { TreeNode, buildTree, minDepth };
