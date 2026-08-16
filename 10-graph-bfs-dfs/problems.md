# Graph BFS/DFS — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Number of Islands** (LeetCode 200)
   - Task: count connected regions of land cells in a grid
   - Pattern: [Variant 1](01-grid-flood-fill.js) — DFS flood fill

2. **Number of Provinces** (LeetCode 547)
   - Task: count connected components given a graph as edges/adjacency
   - Pattern: [Variant 2](02-connected-components.js) — DFS + visited set, adjacency list

3. **Rotting Oranges** (LeetCode 994)
   - Task: minutes until every fresh orange rots, spreading from all rotten ones at once
   - Pattern: [Variant 3](03-multi-source-bfs.js) — BFS seeded with all sources at once

4. **Shortest Path in Binary Matrix** (LeetCode 1091)
   - Task: shortest 8-directional path from top-left to bottom-right
   - Pattern: [Variant 4](04-shortest-path-bfs.js) — single-source BFS, track distance

5. **Clone Graph** (LeetCode 133)
   - Task: deep-copy a graph given one starting node, graph may contain cycles
   - Pattern: [Variant 5](05-clone-graph.js) — DFS + visited map storing clones

6. **Graph Valid Tree** (classic interview problem, related to LeetCode 261 premium)
   - Task: determine whether n nodes and a list of edges form a valid tree
     (connected, no cycles)
   - Pattern: [Variant 6](06-cycle-detection-undirected.js) — DFS + remembered parent,
     plus checking the whole graph is one component

7. **Course Schedule** (LeetCode 207)
   - Task: can all courses be finished given prerequisite pairs (is the
     prerequisite graph acyclic)
   - Pattern: [Variant 7](07-cycle-detection-directed.js) — DFS + three states

8. **Is Graph Bipartite?** (LeetCode 785)
   - Task: can the graph's nodes be split into two groups with no edge inside a group
   - Pattern: [Variant 8](08-bipartite-check.js) — BFS + 2-coloring

## After this module
Move to `11-topological-sort` (see [../index.md](../index.md)) — builds
directly on variant 7's cycle detection: a valid ordering only exists when
the dependency graph is acyclic.
