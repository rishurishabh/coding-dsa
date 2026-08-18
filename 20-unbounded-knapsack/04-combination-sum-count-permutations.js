// Pattern: same += recurrence as variant 3, but with the loop order
// FLIPPED — amount outer, coins/nums inner — which counts every ORDERED
// arrangement (permutation) separately instead of collapsing them.
// When:
//   - given numbers (unlimited supply) and a target, count how many
//     ORDERED sequences of numbers sum to it (1 then 3 is different from
//     3 then 1, even though they're the same "combination")
// Why:
//   - looping amount outer means, for each amount a, every number gets
//     tried as the LAST number added — dp[a] sums dp[a - num] over every
//     num, so a sequence ending in 1 and a sequence ending in 3 both get
//     counted, as different sequences, even if their earlier numbers were
//     the same multiset
//   - this is the exact same code shape as variant 3 with the two loops
//     swapped — the loop order alone is what changes "combinations" into
//     "permutations"

function combinationSumCountPermutations(nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;

  for (let a = 1; a <= target; a++) {
    for (const num of nums) {
      if (num <= a) dp[a] += dp[a - num];
    }
  }
  return dp[target];
}

// Demo
if (require.main === module) {
  console.log(combinationSumCountPermutations([1, 2, 3], 4)); // 7 (LC377 example)
}

module.exports = { combinationSumCountPermutations };
