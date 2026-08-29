# Graph Shortest Path — Practice Problems

Work in this order; each problem changes one constraint on the weights or
the shape of the answer needed.

1. **Network Delay Time** (LeetCode 743)
   - Task: time for a signal to reach all nodes from a source, non-negative weights
   - Pattern: [Variant 1](01-dijkstra.js) — Dijkstra, greedy heap expansion

2. **Cheapest Flights Within K Stops** (LeetCode 787)
   - Task: cheapest route from src to dst using at most K stops
   - Pattern: [Variant 5](05-cheapest-flights-within-k-stops.js) — bounded Bellman-Ford relaxation

3. **Path With Minimum Effort** / **0-1 Matrix**-style grids
   - Task: shortest path where edge cost is only ever 0 or 1
   - Pattern: [Variant 3](03-01-bfs.js) — 0-1 BFS with a deque

4. **Find the City With the Smallest Number of Neighbors at a Threshold Distance** (LeetCode 1334)
   - Task: all-pairs shortest distances, then compare reachable-city counts per threshold
   - Pattern: [Variant 4](04-floyd-warshall.js) — Floyd-Warshall, all pairs at once

5. **Negative Weight Cycle detection** (general — e.g. LeetCode 743-style graphs extended with negative edges)
   - Task: find shortest paths when edges can be negative, and detect if a negative cycle makes the answer undefined
   - Pattern: [Variant 2](02-bellman-ford.js) — Bellman-Ford with a negative-cycle check

## After this module
This completes the pattern roadmap — see [../index.md](../index.md) for
the full 28/28 list, or [../data-structures/index.md](../data-structures/index.md)
for the one remaining data-structures module (Trie, mostly covered
already by [../25-trie/01-trie-core.js](../25-trie/01-trie-core.js)).
