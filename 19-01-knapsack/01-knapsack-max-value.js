// Pattern: include-or-exclude at every capacity — for each item, either it
// goes in the bag (spend its weight, gain its value) or it doesn't
// (capacity and value stay whatever they already were without it).
// When:
//   - given items with weight and value, maximize total value without
//     exceeding a weight capacity, each item usable at most ONCE (0/1 —
//     take it or leave it, no fractions, no repeats)
// Why:
//   - brute force tries all 2^n subsets; DP instead asks one question per
//     (item, remaining capacity) pair: is this item worth including here?
//     — `dp[c]` after processing item i holds the best value achievable
//     with capacity c using only items seen so far
//   - capacity must be looped DOWN (high to low) when using a 1D array,
//     or an item could get "reused" — reading dp[c - weight] would
//     accidentally see a value that ALREADY includes this same item

function knapsackMaxValue(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    for (let c = capacity; c >= weights[i]; c--) {
      dp[c] = Math.max(dp[c], dp[c - weights[i]] + values[i]);
    }
  }
  return dp[capacity];
}

// Demo
if (require.main === module) {
  const weights = [1, 3, 4, 5];
  const values = [1, 4, 5, 7];
  console.log(knapsackMaxValue(weights, values, 7)); // 9 (items weight 3+4, value 4+5)
}

module.exports = { knapsackMaxValue };
