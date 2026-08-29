# Greedy — Practice Problems

Work in this order; each problem uses a different correctness argument.

1. **Non-overlapping Intervals** (LeetCode 435)
   - Task: minimum number of intervals to remove so the rest don't overlap
   - Pattern: [Variant 1](01-non-overlapping-intervals.js) — sort by end, exchange argument

2. **Jump Game** (LeetCode 55)
   - Task: can you reach the last index, given max-jump-length per position?
   - Pattern: [Variant 2](02-jump-game.js) — farthest-reach feasibility

3. **Jump Game II** (LeetCode 45)
   - Task: minimum number of jumps to reach the last index
   - Pattern: [Variant 3](03-jump-game-ii.js) — boundary-expansion, implicit BFS levels

4. **Gas Station** (LeetCode 134)
   - Task: find the starting station for a valid full circular route
   - Pattern: [Variant 4](04-gas-station.js) — running deficit, disqualify the whole failed stretch

5. **Candy** (LeetCode 135)
   - Task: minimum total candies so every child beats both lower-rated neighbors
   - Pattern: [Variant 5](05-candy.js) — two-pass, combine via max

## After this module
See [../index.md](../index.md) for what's left — the Advanced Structures
group: Trie, Segment/Fenwick Tree, Graph Shortest Path.
