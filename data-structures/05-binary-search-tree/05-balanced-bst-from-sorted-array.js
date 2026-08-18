// Structure: built top-down by always picking the MIDDLE of the current
// range as the next node — not by repeated insert() calls, which is
// exactly what variant 1's warning about degenerating into a line is
// about.
// When:
//   - a sorted array needs to become a BST that's guaranteed height-
//     balanced (height O(log n)), rather than whatever shape repeated
//     insert() happens to produce
// Why:
//   - inserting an already-sorted array one value at a time via
//     variant 1's insert() produces a straight line (every value is
//     bigger than the last, so every insert goes right) — O(n) height,
//     O(n) search, no better than a linked list
//   - picking the array's MIDDLE element as the root instead guarantees
//     exactly half the remaining values fall left and half fall right,
//     at every level of recursion — that even split is what bounds the
//     height at O(log n)
//   - this is the array-to-tree mirror of binary search itself: the same
//     "always split at the midpoint" idea, run in the other direction

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function sortedArrayToBST(nums, lo = 0, hi = nums.length - 1) {
  if (lo > hi) return null;
  const mid = lo + Math.floor((hi - lo) / 2);
  const node = new TreeNode(nums[mid]);
  node.left = sortedArrayToBST(nums, lo, mid - 1);
  node.right = sortedArrayToBST(nums, mid + 1, hi);
  return node;
}

function height(root) {
  if (!root) return 0;
  return 1 + Math.max(height(root.left), height(root.right));
}

// Demo
if (require.main === module) {
  const nums = [-10, -3, 0, 5, 9];
  const root = sortedArrayToBST(nums);
  console.log(root.val); // 0 — the middle element becomes the root
  console.log(height(root)); // 3, balanced (log2(5) ≈ 2.3, ceiling 3)
}

module.exports = { TreeNode, sortedArrayToBST, height };
