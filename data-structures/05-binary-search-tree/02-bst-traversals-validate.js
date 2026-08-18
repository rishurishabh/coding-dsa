// Structure: the same BST, read three different orders — and a
// validator that checks the ordering rule actually holds everywhere,
// not just between immediate parent and child.
// When:
//   - the sorted contents need to come out directly from traversal
//     order, rather than re-sorting; or a tree built by hand/elsewhere
//     needs its BST property confirmed before trusting it
// Why:
//   - inorder (left, node, right) visits every node in ascending sorted
//     order — that's not a coincidence, it falls directly out of the
//     BST ordering rule: everything left of a node is smaller, so it
//     must be visited first
//   - preorder (node, left, right) and postorder (left, right, node)
//     don't produce sorted output, but preorder is exactly the order
//     needed to rebuild the same tree shape from scratch (see variant 5
//     for a related construction problem)
//   - validating a BST is NOT just "is left.val < node.val < right.val"
//     at every node — a node deep in a left subtree still has to be
//     smaller than every ancestor above it, not just its immediate
//     parent, which is why validation needs a running [min, max] bound
//     passed down, not just a local comparison

function inorder(root, out = []) {
  if (!root) return out;
  inorder(root.left, out);
  out.push(root.val);
  inorder(root.right, out);
  return out;
}
function preorder(root, out = []) {
  if (!root) return out;
  out.push(root.val);
  preorder(root.left, out);
  preorder(root.right, out);
  return out;
}
function postorder(root, out = []) {
  if (!root) return out;
  postorder(root.left, out);
  postorder(root.right, out);
  out.push(root.val);
  return out;
}

function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
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

  console.log(inorder(root)); // [1,3,4,5,7,8,9] — sorted
  console.log(preorder(root)); // [5,3,1,4,8,7,9]
  console.log(isValidBST(root)); // true

  const invalid = new TreeNode(5, new TreeNode(3, null, new TreeNode(6)), new TreeNode(8));
  console.log(isValidBST(invalid)); // false — 6 is in 5's left subtree but > 5
}

module.exports = { inorder, preorder, postorder, isValidBST };
