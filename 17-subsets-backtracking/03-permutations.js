// Pattern: same choose/explore/un-choose shape, but ORDER matters — every
// index can still be picked at any position, so the loop restarts from 0
// each call instead of advancing a `start` pointer.
// When:
//   - generate every ORDERING of a set of distinct values (LeetCode 46)
// Why:
//   - subsets (variant 1) only care WHICH elements are included, so
//     looking forward from `start` avoids re-generating the same
//     combination in a different order; permutations WANT every order, so
//     that restriction has to go
//   - a `used` array is what replaces it — the only thing excluded from
//     each choice is whatever is ALREADY in the current path, not
//     anything based on index order

function permute(nums) {
  const result = [];
  const path = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack();
      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

// Demo
if (require.main === module) {
  console.log(permute([1, 2, 3]));
  // 6 orderings: [1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]
}

module.exports = { permute };
