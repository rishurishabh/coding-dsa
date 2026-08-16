// Pattern: recursive descent — the foundation every other variant in this
// module builds on. Three traversal orders differ only in WHEN a node visits
// itself relative to visiting its children.
// When:
//   - need nodes in a specific linear order derived from tree structure:
//     sorted order (inorder, on a BST), delete-children-first order
//     (postorder), or copy/serialize order (preorder)
// Why:
//   - a tree has no single "natural" linear order the way an array does —
//     the same three recursive calls (visit left, visit self, visit right)
//     produce three different sequences depending only on which line runs first

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

function preorder(root) { // self, left, right — natural for copying a tree
  if (!root) return [];
  return [root.val, ...preorder(root.left), ...preorder(root.right)];
}

function inorder(root) { // left, self, right — sorted order on a BST
  if (!root) return [];
  return [...inorder(root.left), root.val, ...inorder(root.right)];
}

function postorder(root) { // left, right, self — children fully done before self
  if (!root) return [];
  return [...postorder(root.left), ...postorder(root.right), root.val];
}

// Demo
if (require.main === module) {
  const root = buildTree([1, null, 2, 3]);
  console.log("preorder:", preorder(root)); // [1,2,3]
  console.log("inorder:", inorder(root)); // [1,3,2]
  console.log("postorder:", postorder(root)); // [3,2,1]
}

module.exports = { TreeNode, buildTree, preorder, inorder, postorder };
