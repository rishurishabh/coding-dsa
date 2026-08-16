// Pattern: queue + sentinel marker — same output as variant 1, a different
// way to mark "this level just ended".
// When:
//   - level boundaries are easier to express as "hit a delimiter" than
//     "counted this many pops" — e.g. printing a tree with level breaks
//     while streaming nodes one at a time
// Why:
//   - instead of computing the level's size upfront, a marker (any sentinel
//     value that can't be a real node) is enqueued right after all of the
//     current level's nodes; popping it means the level is done — re-enqueue
//     it once more, unless the queue's now empty (no more levels left)

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

const LEVEL_END = Symbol("level-end");

function levelOrderSentinel(root) {
  if (!root) return [];
  const result = [];
  const queue = [root, LEVEL_END];
  let level = [];

  while (queue.length) {
    const node = queue.shift();
    if (node === LEVEL_END) {
      result.push(level);
      level = [];
      if (queue.length) queue.push(LEVEL_END); // more nodes waiting: mark the next boundary
    } else {
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}

// Demo
if (require.main === module) {
  const root = buildTree([3, 9, 20, null, null, 15, 7]);
  console.log(levelOrderSentinel(root)); // [[3],[9,20],[15,7]]
}

module.exports = { TreeNode, buildTree, levelOrderSentinel };
