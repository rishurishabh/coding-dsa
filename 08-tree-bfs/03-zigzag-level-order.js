// Pattern: level-size snapshot (variant 1) + a direction toggle.
// When:
//   - levels alternate reading direction: left-to-right, then
//     right-to-left, then left-to-right again (LeetCode 103)
// Why:
//   - the traversal itself doesn't change — nodes are still discovered
//     left-to-right via their parent order — only how each level's
//     collected values get RECORDED flips, so reversing the completed
//     level array is enough; no need to change queue push/pop order at all

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

function zigzagLevelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(leftToRight ? level : level.reverse());
    leftToRight = !leftToRight;
  }
  return result;
}

// Demo
if (require.main === module) {
  const root = buildTree([3, 9, 20, null, null, 15, 7]);
  console.log(zigzagLevelOrder(root)); // [[3],[20,9],[15,7]]
}

module.exports = { TreeNode, buildTree, zigzagLevelOrder };
