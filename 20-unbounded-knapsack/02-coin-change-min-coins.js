// Pattern: minimize count instead of maximize value — the same unbounded
// recurrence, but the combining operator is Math.min(+1) instead of
// Math.max(+value), and "no combination reaches this amount yet" is
// represented as Infinity rather than 0.
// When:
//   - given coin denominations (unlimited supply of each) and a target
//     amount, find the FEWEST coins that sum to exactly that amount
// Why:
//   - dp[a] after considering coin d holds the minimum coins needed for
//     amount a, using coins up to and including d — dp[a - d] + 1 is
//     "however many coins made a - d, plus this one more"
//   - initializing to Infinity (not 0) matters: 0 would wrongly claim
//     amount 0 coins suffice for any amount; Infinity means "unreached"
//     and only dp[0] = 0 (zero coins for zero amount) seeds real answers

function coinChangeMinCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Demo
if (require.main === module) {
  console.log(coinChangeMinCoins([1, 3, 4], 6)); // 2 (3 + 3)
  console.log(coinChangeMinCoins([2], 3)); // -1 (odd amount, only even coin)
}

module.exports = { coinChangeMinCoins };
