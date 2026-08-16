// Pattern: bottom-up search — the recursion returns a NODE (or null),
// not a number, and a node's own return value depends on what both of its
// children reported finding.
// When:
//   - find the lowest common ancestor of two nodes in a binary tree
//     (LeetCode 236)
// Why:
//   - if p and q are found in DIFFERENT subtrees of a node, that node IS the
//     answer — neither subtree alone could report it, since each only knows
//     about itself
//   - if both are found in the SAME subtree, the answer is deeper, and the
//     correct node has already been found and is simply passed up
//     unchanged — every ancestor above it just relays it without re-deciding

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

function findNode(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  return findNode(root.left, val) || findNode(root.right, val);
}

function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root; // p and q split across both sides: root is the answer
  return left || right; // found in only one side (or neither) — relay it upward
}

// Demo
if (require.main === module) {
  const root = buildTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
  const p = findNode(root, 5);
  const q = findNode(root, 1);
  console.log(lowestCommonAncestor(root, p, q).val); // 3

  const q2 = findNode(root, 4);
  console.log(lowestCommonAncestor(root, p, q2).val); // 5
}

module.exports = { TreeNode, buildTree, findNode, lowestCommonAncestor };
