// Pattern: Greedy — farthest-reach tracking
// When: deciding feasibility of reaching an end goal, where each position
//       offers a "budget" that extends how far you could eventually get.
// Why it works: you never need to remember *which* earlier index gave you
//       the best reach — only the single number "farthest index reachable
//       so far". If that number ever falls behind your current index, no
//       combination of earlier choices could have saved you, so you can
//       bail out immediately.
//
// LC55: Jump Game — nums[i] is the max jump length from index i; can you
// reach the last index?

function canJump(nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false; // stuck — can't even reach index i
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true;
  }

  return true;
}

module.exports = { canJump };

if (require.main === module) {
  console.log(canJump([2, 3, 1, 1, 4])); // true
  console.log(canJump([3, 2, 1, 0, 4])); // false
  console.log(canJump([0])); // true
}
