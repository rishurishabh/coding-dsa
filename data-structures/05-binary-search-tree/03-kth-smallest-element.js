// Structure: an inorder traversal, stopped early the moment the kth
// value is visited — no need to collect every value first and index
// into the result.
// When:
//   - the kth smallest (or largest, by mirroring the traversal) value in
//     a BST is needed, without a full sort or a full traversal
// Why:
//   - inorder visits nodes in ascending order (see variant 2) — so the
//     kth node VISITED, by construction, is the kth smallest value,
//     with no comparison or sorting logic needed beyond the traversal
//     itself
//   - stopping as soon as the count reaches k avoids visiting the
//     remaining nodes — best case this prunes large parts of the tree,
//     though worst case (k close to n) still visits nearly everything

function kthSmallest(root, k) {
  let count = 0;
  let result = null;

  function inorder(node) {
    if (!node || result !== null) return;
    inorder(node.left);
    if (result !== null) return;
    count++;
    if (count === k) {
      result = node.val;
      return;
    }
    inorder(node.right);
  }

  inorder(root);
  return result;
}

// Demo
if (require.main === module) {
  function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
  //        5
  //      /   \
  //     3     8
  //    / \   / \
  //   1   4 7   9
  const root = new TreeNode(5,
    new TreeNode(3, new TreeNode(1), new TreeNode(4)),
    new TreeNode(8, new TreeNode(7), new TreeNode(9)));

  console.log(kthSmallest(root, 1)); // 1
  console.log(kthSmallest(root, 4)); // 5
  console.log(kthSmallest(root, 7)); // 9
}

module.exports = { kthSmallest };
