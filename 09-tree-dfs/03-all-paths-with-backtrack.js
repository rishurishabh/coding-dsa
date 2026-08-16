// Pattern: top-down accumulate (variant 2) + explicit backtrack — this time
// the actual PATH is being built, not just a running sum, so the shared
// array has to be un-done after each recursive call returns.
// When:
//   - return every root-to-leaf path that sums to a target, not just
//     whether one exists (LeetCode 113)
// Why:
//   - a single mutable array reused across all recursive calls is far
//     cheaper than allocating a new array at every node — but that sharing
//     means each node MUST remove itself (`path.pop()`) after its children
//     are done, or the next branch explored would still see this branch's
//     values sitting in the path

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

function pathSum(root, targetSum) {
  const result = [];
  const path = [];

  function dfs(node, remaining) {
    if (!node) return;

    path.push(node.val); // choose: include this node in the path
    remaining -= node.val;

    if (!node.left && !node.right && remaining === 0) {
      result.push([...path]); // snapshot — `path` itself keeps mutating
    } else {
      dfs(node.left, remaining);
      dfs(node.right, remaining);
    }

    path.pop(); // un-choose: this node is done, remove it before returning
  }

  dfs(root, targetSum);
  return result;
}

// Demo
if (require.main === module) {
  const root = buildTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]);
  console.log(pathSum(root, 22)); // [[5,4,11,2],[5,8,4,5]]
}

module.exports = { TreeNode, buildTree, pathSum };
