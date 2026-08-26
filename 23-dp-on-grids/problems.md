# DP on Grids — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Unique Paths** (LeetCode 62)
   - Task: count paths from top-left to bottom-right, moving only right/down
   - Pattern: [Variant 1](01-unique-paths.js) — sum of two neighbors

2. **Unique Paths II** (LeetCode 63)
   - Task: same, but some cells are blocked
   - Pattern: [Variant 2](02-unique-paths-with-obstacles.js) — same recurrence, one guard

3. **Minimum Path Sum** (LeetCode 64)
   - Task: cheapest total cost from top-left to bottom-right
   - Pattern: [Variant 3](03-minimum-path-sum.js) — min instead of sum

4. **Maximal Square** (LeetCode 221)
   - Task: largest square of 1s in a binary matrix
   - Pattern: [Variant 4](04-maximal-square.js) — three neighbors, not two

5. **Dungeon Game** (LeetCode 174)
   - Task: minimum starting health to survive right/down to the exit
   - Pattern: [Variant 5](05-dungeon-game.js) — same shape, filled backward

6. **Triangle** (LeetCode 120)
   - Task: minimum path sum from the top of a triangle to the bottom row
   - Pattern: [Variant 5](05-dungeon-game.js)'s backward-fill idea, applied to a
     triangular grid instead of a rectangular one

## After this module
See [../index.md](../index.md) for what's left in the pattern roadmap —
Greedy, then the Advanced Structures group (Trie, Segment/Fenwick Tree,
Graph Shortest Path).
