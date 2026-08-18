// Structure: a single root-to-target walk that uses the BST ordering
// rule to decide direction — no need to find both nodes' full paths and
// compare them, the way a general (non-BST) tree's LCA would require.
// When:
//   - the lowest common ancestor of two nodes is needed, and the tree is
//     specifically known to be a BST (not just any binary tree)
// Why:
//   - if both p and q are smaller than the current node, their LCA must
//     be somewhere in the left subtree — the current node is too big to
//     be it, and so is everything in the right subtree
//   - symmetrically, if both are bigger, the LCA must be in the right
//     subtree
//   - the FIRST node where p and q fall on different sides (or one of
//     them equals the current node) is the split point — neither can go
//     any further together after this, so this node is the LCA
//   - this is O(h) with no extra memory, versus a general binary tree's
//     LCA which needs both full paths or a post-order search — the BST
//     ordering rule is what shortcuts that entirely

function lowestCommonAncestor(root, p, q) {
  let node = root;
  while (node) {
    if (p.val < node.val && q.val < node.val) {
      node = node.left;
    } else if (p.val > node.val && q.val > node.val) {
      node = node.right;
    } else {
      return node; // split point, or node IS p or q
    }
  }
  return null;
}

// Demo
if (require.main === module) {
  function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
  //        6
  //      /   \
  //     2     8
  //    / \   / \
  //   0   4 7   9
  //      / \
  //     3   5
  const n0 = new TreeNode(0);
  const n3 = new TreeNode(3);
  const n5 = new TreeNode(5);
  const n4 = new TreeNode(4, n3, n5);
  const n2 = new TreeNode(2, n0, n4);
  const n7 = new TreeNode(7);
  const n9 = new TreeNode(9);
  const n8 = new TreeNode(8, n7, n9);
  const root = new TreeNode(6, n2, n8);

  console.log(lowestCommonAncestor(root, n2, n8).val); // 6 (opposite subtrees)
  console.log(lowestCommonAncestor(root, n2, n4).val); // 2 (n2 is an ancestor of n4)
  console.log(lowestCommonAncestor(root, n3, n5).val); // 4
}

module.exports = { lowestCommonAncestor };
