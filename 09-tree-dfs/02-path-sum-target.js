// Pattern: top-down, accumulate on the way down — state (the running sum)
// is computed BEFORE recursing and passed as an argument, so the decision
// gets made at the leaf with everything already known.
// When:
//   - does any root-to-leaf path sum to exactly a target value? (LeetCode 112)
// Why:
//   - subtracting the current node's value from the remaining target as you
//     descend means a leaf only needs to check one thing: does what's left
//     equal my own value — no need to look back up the path or re-sum anything

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

function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return targetSum === root.val; // leaf: check now

  const remaining = targetSum - root.val;
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}

// Demo
if (require.main === module) {
  const root = buildTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]);
  console.log(hasPathSum(root, 22)); // true (5->4->11->2)
  console.log(hasPathSum(root, 100)); // false
}

module.exports = { TreeNode, buildTree, hasPathSum };
