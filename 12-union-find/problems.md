# Union Find — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Number of Provinces** (LeetCode 547, revisited)
   - Task: count connected components — same problem as
     [10-graph-bfs-dfs/02-connected-components.js](../10-graph-bfs-dfs/02-connected-components.js),
     solved with union-find instead of DFS
   - Pattern: [Variant 1](01-union-find-core.js) — the structure itself, via `count`

2. **Redundant Connection** (LeetCode 684)
   - Task: find the one edge that creates a cycle
   - Pattern: [Variant 2](02-cycle-detection.js) — `union()`'s return value IS the check

3. **Min Cost to Connect All Points** (LeetCode 1584) / classic MST
   - Task: minimum total edge weight to connect every node
   - Pattern: [Variant 3](03-kruskals-mst.js) — sort by weight + cycle-avoidance

4. **Number of Islands II** (LeetCode 305)
   - Task: report the island count after each land cell is added, one at a time
   - Pattern: [Variant 4](04-dynamic-connectivity.js) — online queries, incremental count

5. **Accounts Merge** (LeetCode 721)
   - Task: merge accounts sharing at least one email, return grouped emails
   - Pattern: [Variant 5](05-accounts-merge.js) — union-find over arbitrary keys

6. **Making A Large Island** (LeetCode 827)
   - Task: flip exactly one water cell to land; find the largest resulting island
   - Pattern: [Variant 6](06-largest-island-with-flip.js) — size tracked per root, hardest classic

7. **Graph Valid Tree** (revisit from [10-graph-bfs-dfs/problems.md](../10-graph-bfs-dfs/problems.md))
   - Task: determine whether n nodes and a list of edges form a valid tree
   - Pattern: [Variant 1](01-union-find-core.js) — connected (`count === 1`) AND no cycle
     (every `union()` call returns true) at the same time

## After this module
Move to `13-two-heaps` (see [../index.md](../index.md)) — an unrelated
mechanism (balancing two heaps), next on the roadmap.
