// Pattern: count the number of ways to reach an amount, where order does
// NOT matter (a combination, not a sequence) — enforced by looping coins
// in the OUTER loop and amount in the inner loop.
// When:
//   - given coin denominations (unlimited supply) and a target amount,
//     count how many distinct combinations of coins sum to it (choosing
//     two 1's then a 3 is the SAME combination as a 3 then two 1's)
// Why:
//   - looping coins outer fixes an order of consideration: by the time
//     amount a is updated using coin d, only coins up to d have been
//     "allowed in" — so {1,1,3} is only ever built as 1,1,then 3, never
//     also as 3,then 1,1 — each combination is counted exactly once
//   - swap the loop order (amount outer, coins inner) and the same coins
//     get counted once per arrangement instead — see variant 4

function coinChangeCountCombinations(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] += dp[a - coin];
    }
  }
  return dp[amount];
}

// Demo
if (require.main === module) {
  console.log(coinChangeCountCombinations([1, 2, 5], 5)); // 4: {1x5},{1x3,2},{1x1,2x2},{5}
}

module.exports = { coinChangeCountCombinations };
