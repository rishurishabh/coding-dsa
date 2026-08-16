// Pattern: level-size snapshot, mutate instead of collect — the queue drives
// an in-place edit of the tree rather than building an output array.
// When:
//   - link every node to its next right neighbor at the same depth,
//     leaving the last node in each level pointing to null (LeetCode 116/117)
// Why:
//   - within one level's drain loop, each node dequeued IS the next
//     right neighbor of the one dequeued just before it — `prev.next = node`
//     falls directly out of the queue's left-to-right pop order, the same
//     order variant 4 relies on to find the rightmost node

function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
  this.next = null;
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

function connect(root) {
  if (!root) return root;
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    let prev = null;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (prev) prev.next = node;
      prev = node;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // prev is now the last node in this level; its .next stays null
  }
  return root;
}

// Reads the result back out via the newly-set .next chains, level by level
function levelsViaNext(root) {
  const result = [];
  let levelStart = root;
  while (levelStart) {
    const level = [];
    for (let node = levelStart; node; node = node.next) level.push(node.val);
    result.push(level);
    levelStart = levelStart.left;
  }
  return result;
}

// Demo
if (require.main === module) {
  const root = connect(buildTree([1, 2, 3, 4, 5, 6, 7]));
  console.log(levelsViaNext(root)); // [[1],[2,3],[4,5,6,7]]
}

module.exports = { TreeNode, buildTree, connect, levelsViaNext };
