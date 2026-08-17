// Pattern: same shape, with an element allowed to be chosen AGAIN — the
// recursive call passes `i`, not `i + 1`, so this exact candidate stays
// available for the next pick too.
// When:
//   - find every combination of numbers (each reusable unlimited times)
//     that sums to a target (LeetCode 39)
// Why:
//   - "unlimited reuse" is a one-character difference from variant 1's
//     "each used once" — passing the SAME start index forward instead of
//     advancing it is the entire change needed
//   - the sum shrinking toward 0 on the way down (rather than growing
//     toward a target) means a candidate bigger than what's left can be
//     pruned immediately — same "stop early, don't just fail late" idea
//     as 09-tree-dfs/02-path-sum-target.js

function combinationSum(candidates, target) {
  const result = [];
  const path = [];

  function backtrack(start, remaining) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) continue; // too big — this and everything after (if sorted) can't fit
      path.push(candidates[i]);
      backtrack(i, remaining - candidates[i]); // i, not i+1: this candidate can be reused
      path.pop();
    }
  }

  backtrack(0, target);
  return result;
}

// Demo
if (require.main === module) {
  console.log(combinationSum([2, 3, 6, 7], 7)); // [[2,2,3],[7]]
}

module.exports = { combinationSum };
