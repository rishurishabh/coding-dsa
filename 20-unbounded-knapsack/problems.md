# Unbounded Knapsack — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Unbounded Knapsack** (classic — GeeksforGeeks, no single LeetCode number)
   - Task: maximize value of items packed under a capacity, each item type reusable
   - Pattern: [Variant 1](01-unbounded-knapsack-max-value.js) — include-or-exclude, capacity looped upward

2. **Coin Change** (LeetCode 322)
   - Task: fewest coins (unlimited supply of each) that sum to an exact amount
   - Pattern: [Variant 2](02-coin-change-min-coins.js) — minimize count instead of maximize value

3. **Coin Change II** (LeetCode 518)
   - Task: count combinations of coins that sum to an amount (order doesn't matter)
   - Pattern: [Variant 3](03-coin-change-count-combinations.js) — counting, coins-outer loop

4. **Combination Sum IV** (LeetCode 377)
   - Task: count ordered sequences of numbers that sum to a target (order matters,
     despite the name — it's really counting permutations)
   - Pattern: [Variant 4](04-combination-sum-count-permutations.js) — same recurrence
     as problem 3, loops swapped

5. **Word Break** (LeetCode 139)
   - Task: can a string be segmented into a sequence of dictionary words, each
     word reusable any number of times
   - Pattern: [Variant 5](05-word-break.js) — boolean reachability over string prefixes

6. **Perfect Squares** (LeetCode 279)
   - Task: fewest perfect squares (1, 4, 9, 16, ...) that sum to a number
   - Pattern: [Variant 2](02-coin-change-min-coins.js)'s shape, with the "coins"
     generated as perfect squares up to the target instead of given directly

7. **Rod Cutting** (classic — GeeksforGeeks, no single LeetCode number)
   - Task: cut a rod into pieces of given lengths to maximize total profit,
     any number of pieces of each length
   - Pattern: [Variant 1](01-unbounded-knapsack-max-value.js), directly —
     rod length is capacity, piece length/price is weight/value

## After this module
Move to `21-lcs-family` (see [../index.md](../index.md)) — DP over two
sequences instead of one array and a capacity, but the same "define what
dp[i][j] means, then find the recurrence" discipline applies.
