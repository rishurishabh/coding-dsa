// Pattern: queue + level-size snapshot — the foundation of every variant in
// this module.
// When:
//   - visit a tree level by level, left to right, grouping nodes by depth
//     (LeetCode 102)
// Why:
//   - a plain queue alone gives BFS order, but not level BOUNDARIES; snapshotting
//     the queue's size before draining it means "process exactly this many
//     nodes" — everything enqueued during that loop belongs to the NEXT
//     level, never this one

function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// LeetCode-style level-order array with null for missing children
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

function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const size = queue.length; // exactly how many nodes belong to this level
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

// Demo
if (require.main === module) {
  const root = buildTree([3, 9, 20, null, null, 15, 7]);
  console.log(levelOrder(root)); // [[3],[9,20],[15,7]]
}

module.exports = { TreeNode, buildTree, levelOrder };
