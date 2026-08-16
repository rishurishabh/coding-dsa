// Pattern: top-down, shrink a CONSTRAINT instead of accumulating a value —
// what gets passed down isn't a running total, it's a (min, max) window
// that gets narrower the deeper the recursion goes.
// When:
//   - verify a binary tree satisfies the BST property everywhere, not just
//     against its immediate parent (LeetCode 98)
// Why:
//   - checking a node only against its direct parent is a classic bug: a
//     node can be locally fine but still violate an ancestor further up
//     (e.g. a right-child-of-a-left-child that's bigger than the grandparent)
//   - passing the valid range down means every node is checked against
//     EVERY relevant ancestor at once, because each recursive call already
//     folds in every constraint collected so far

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

function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;

  // left subtree's values must stay below root.val; right subtree's above it —
  // the window only ever shrinks as it's handed down
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}

// Demo
if (require.main === module) {
  console.log(isValidBST(buildTree([2, 1, 3]))); // true
  console.log(isValidBST(buildTree([5, 1, 4, null, null, 3, 6]))); // false — 3 < 5 but sits under the right child
}

module.exports = { TreeNode, buildTree, isValidBST };
