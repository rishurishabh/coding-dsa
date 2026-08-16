// Pattern: bottom-up, return one thing + a global side-channel — the
// recursion's RETURN value (height) isn't the actual answer; the answer is
// tracked separately as each call combines its children's results.
// When:
//   - longest path between any two nodes, measured in edges — the path
//     doesn't have to pass through the root (LeetCode 543)
// Why:
//   - a node can only report its OWN height upward (that's what its parent
//     needs to compute ITS height) — but the diameter through that node is
//     leftHeight + rightHeight, a fact only knowable at that exact node,
//     and never needed by anything above it
//   - so the function returns height (what the caller needs) while quietly
//     updating a shared "best diameter seen so far" (what the problem needs)

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

function diameterOfBinaryTree(root) {
  let diameter = 0; // side channel: not returned by the recursion itself

  function height(node) {
    if (!node) return 0;
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    diameter = Math.max(diameter, leftHeight + rightHeight); // best path THROUGH this node
    return 1 + Math.max(leftHeight, rightHeight); // what the parent actually needs
  }

  height(root);
  return diameter;
}

// Demo
if (require.main === module) {
  console.log(diameterOfBinaryTree(buildTree([1, 2, 3, 4, 5]))); // 3
}

module.exports = { TreeNode, buildTree, diameterOfBinaryTree };
