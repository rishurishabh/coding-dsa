// Pattern: variant 5's bottom-up + side-channel shape, with two added
// complications: values can be negative, and the "return" value has to
// account for that.
// When:
//   - maximum sum along any path between two nodes, values can be negative
//     (LeetCode 124, the hardest classic of this pattern)
// Why:
//   - like the diameter, the sum THROUGH a node (left branch + node + right
//     branch) can only be known at that node and is tracked in a side
//     channel — but what gets RETURNED to the parent is only the better of
//     the two single branches, since a path can't fork twice
//   - a negative branch would only ever hurt a parent's sum, so clamping a
//     branch's contribution to 0 is what lets a node opt OUT of a bad
//     subtree entirely, on both the return value and the through-node sum

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

function maxPathSum(root) {
  let best = -Infinity;

  function bestBranch(node) {
    if (!node) return 0;
    const left = Math.max(bestBranch(node.left), 0); // clamp: skip a branch that only hurts
    const right = Math.max(bestBranch(node.right), 0);

    best = Math.max(best, node.val + left + right); // path THROUGH this node, both branches
    return node.val + Math.max(left, right); // what the parent can actually use: one branch
  }

  bestBranch(root);
  return best;
}

// Demo
if (require.main === module) {
  console.log(maxPathSum(buildTree([1, 2, 3]))); // 6
  console.log(maxPathSum(buildTree([-10, 9, 20, null, null, 15, 7]))); // 42
}

module.exports = { TreeNode, buildTree, maxPathSum };
