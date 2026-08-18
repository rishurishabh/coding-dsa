// Structure: a binary tree with one ordering rule enforced at every node
// — everything in the left subtree is smaller, everything in the right
// subtree is bigger. That single rule is what makes search a binary
// search, not a linear scan.
// When:
//   - ordered data needs insert/search/delete all faster than O(n), and
//     (unlike a hash map) the SORTED order of elements also matters
// Why:
//   - at every node, comparing the target to the node's value eliminates
//     one entire subtree — same halving idea as binary search on a
//     sorted array, but expressed as tree structure instead of array
//     indices
//   - insert and search are O(h) where h is the tree's height — O(log n)
//     if the tree stays balanced, but O(n) in the worst case (a tree
//     built from already-sorted input degenerates into a straight line;
//     see variant 5 for how to avoid that)
//   - delete has three cases: a leaf just gets unlinked; a node with one
//     child gets replaced by that child; a node with two children gets
//     replaced by its INORDER SUCCESSOR (the smallest value in its right
//     subtree) — that successor is guaranteed to keep the BST ordering
//     valid, since it's bigger than everything on the left and smaller
//     than everything else on the right

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function insert(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left = insert(root.left, val);
  else if (val > root.val) root.right = insert(root.right, val);
  return root; // duplicate values are ignored
}

function search(root, val) {
  if (!root || root.val === val) return root;
  return val < root.val ? search(root.left, val) : search(root.right, val);
}

function findMin(root) {
  while (root.left) root = root.left;
  return root;
}

function deleteNode(root, val) {
  if (!root) return null;
  if (val < root.val) {
    root.left = deleteNode(root.left, val);
  } else if (val > root.val) {
    root.right = deleteNode(root.right, val);
  } else {
    if (!root.left) return root.right; // leaf, or only a right child
    if (!root.right) return root.left; // only a left child
    const successor = findMin(root.right); // two children: inorder successor
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  return root;
}

// Demo
if (require.main === module) {
  let root = null;
  for (const v of [5, 3, 8, 1, 4, 7, 9]) root = insert(root, v);
  console.log(search(root, 7).val); // 7
  console.log(search(root, 6)); // null
  root = deleteNode(root, 3); // two children (1 and 4) — replaced by successor 4
  console.log(search(root, 3)); // null
  console.log(search(root, 4).val); // 4
}

module.exports = { TreeNode, insert, search, deleteNode, findMin };
