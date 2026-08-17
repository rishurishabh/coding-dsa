// Pattern: choose, explore, un-choose — the foundation every other variant
// in this module is built from. Every recursive call records the CURRENT
// partial state as a valid answer, then tries extending it with each
// remaining choice.
// When:
//   - generate every subset of a set (the power set) (LeetCode 78)
// Why:
//   - a shared mutable `path` array, pushed to before recursing and popped
//     after, is far cheaper than allocating a new array per branch — the
//     same technique as 09-tree-dfs/03-all-paths-with-backtrack.js
//   - starting each recursive call's loop at `start` (not 0) is what stops
//     [1,2] and [2,1] from both being generated as separate subsets — order
//     doesn't matter for a set, so only look forward, never backward

function subsets(nums) {
  const result = [];
  const path = [];

  function backtrack(start) {
    result.push([...path]); // every partial state IS a valid subset, including empty

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // choose
      backtrack(i + 1); // explore
      path.pop(); // un-choose
    }
  }

  backtrack(0);
  return result;
}

// Demo
if (require.main === module) {
  console.log(subsets([1, 2, 3]));
  // [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]
}

module.exports = { subsets };
