// Pattern: same include-or-exclude choice as 0/1 knapsack, but an item can
// be included any number of times — so "include" reads from the SAME
// capacity row being built, not a frozen one from before this item.
// When:
//   - given items with weight and value, maximize total value under a
//     weight capacity, each item usable an UNLIMITED number of times
//     (unbounded — rod cutting, coin systems, etc.)
// Why:
//   - capacity is looped UP (low to high) here, the opposite of 0/1's
//     downward loop — dp[c - weight] is allowed to already reflect this
//     same item having been added earlier in this same pass, which is
//     exactly what lets it be reused
//   - if capacity were looped down instead, each item would only ever be
//     considered once per capacity, collapsing back to 0/1 knapsack

function unboundedKnapsackMaxValue(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    for (let c = weights[i]; c <= capacity; c++) {
      dp[c] = Math.max(dp[c], dp[c - weights[i]] + values[i]);
    }
  }
  return dp[capacity];
}

// Demo
if (require.main === module) {
  const weights = [1, 3, 4, 5];
  const values = [1, 4, 5, 7];
  console.log(unboundedKnapsackMaxValue(weights, values, 8)); // 11 (one w=5,v=7 + one w=3,v=4)
}

module.exports = { unboundedKnapsackMaxValue };
