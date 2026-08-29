// Pattern: Greedy — implicit BFS levels (boundary expansion)
// When: minimizing the number of "steps"/"jumps"/"levels" to cover a range,
//       where each step's reach depends on choices made within it.
// Why it works: think of it as BFS over levels, but instead of a queue you
//       track the boundary of the *current* level (currentEnd) and the
//       farthest boundary reachable using one more jump (farthest). Once i
//       reaches currentEnd, the current level is exhausted — every index in
//       it has been considered — so you commit to a jump and the next
//       level's boundary becomes currentEnd = farthest.
//
// LC45: Jump Game II — minimum number of jumps to reach the last index
// (guaranteed reachable).

function jump(nums) {
  let jumps = 0;
  let currentEnd = 0; // farthest reachable using jumps taken so far
  let farthest = 0; // farthest reachable using one additional jump

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }

  return jumps;
}

module.exports = { jump };

if (require.main === module) {
  console.log(jump([2, 3, 1, 1, 4])); // 2
  console.log(jump([2, 3, 0, 1, 4])); // 2
  console.log(jump([1, 1, 1, 1])); // 3
}
