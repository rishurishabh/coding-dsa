# Graph — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Find if Path Exists in Graph** (LeetCode 1971)
   - Task: given edges, check whether two vertices are connected at all
   - Pattern: [Variant 1](01-adjacency-list.js) — build the representation,
     then any traversal reaches the answer

2. **Clone Graph** (LeetCode 133)
   - Task: deep copy a connected graph, cycles included
   - Pattern: [Variant 3](03-clone-graph.js) — DFS + map to break cycles

3. **Number of Connected Components in an Undirected Graph** (LeetCode 323)
   - Task: count how many separate pieces a graph splits into
   - Pattern: [Variant 4](04-connected-components-count.js) — DFS from every
     unvisited vertex; compare with the union-find approach in
     [12-union-find](../../12-union-find/README.md)

4. **Course Schedule** (LeetCode 207)
   - Task: can all courses be completed given prerequisite pairs (i.e. is
     the dependency graph acyclic)
   - Pattern: [Variant 5](05-course-schedule-cycle-detection.js) — three-state
     DFS cycle detection

5. **Course Schedule II** (LeetCode 210)
   - Task: same as problem 4, but return a valid completion ORDER, not
     just true/false
   - Pattern: [Variant 5](05-course-schedule-cycle-detection.js)'s DFS,
     extended to record finish order — or see
     [11-topological-sort](../../11-topological-sort/README.md)'s
     Kahn's-algorithm approach for the same question

6. **Is Graph Bipartite?** (LeetCode 785)
   - Task: can every vertex be colored one of two colors with no edge
     connecting same-colored vertices
   - Pattern: [Variant 1](01-adjacency-list.js)'s representation, walked
     with BFS/DFS while 2-coloring as it goes — see
     [10-graph-bfs-dfs](../../10-graph-bfs-dfs/README.md) for the
     traversal pattern itself

## After this module
See [../index.md](../index.md) for what's left in the Data Structures
track — Trie is the one remaining structure.
