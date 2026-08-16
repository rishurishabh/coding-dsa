# Topological Sort — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Course Schedule** (LeetCode 207)
   - Task: can all courses be finished given prerequisite pairs (yes/no)
   - Pattern: [Variant 1](01-kahns-bfs.js) — Kahn's algorithm, check whether every node gets output

2. **Course Schedule II** (LeetCode 210)
   - Task: same setup, return a valid course order (or empty if impossible)
   - Pattern: [Variant 1](01-kahns-bfs.js) — same algorithm, return the order itself

3. **Course Schedule** (DFS follow-up, same LeetCode 207/210)
   - Task: solve problems 1–2 using DFS instead of BFS
   - Pattern: [Variant 2](02-dfs-postorder.js) — DFS postorder, reversed

4. **Parallel Courses** (LeetCode 1136)
   - Task: minimum number of rounds/semesters to finish all courses, taking
     everything possible in parallel each round
   - Pattern: [Variant 3](03-course-schedule-levels.js) — Kahn's, drained level by level

5. **Sequence Reconstruction** (LeetCode 444)
   - Task: determine whether a set of sequences uniquely determines one
     specific topological order
   - Pattern: [Variant 1](01-kahns-bfs.js)'s shape — unique order exists only
     if exactly one node has in-degree 0 at every step

6. **Course Schedule with smallest lexicographical order** (common interview
   extension of LeetCode 210, no separate LeetCode number)
   - Task: among all valid course orders, return the smallest one
   - Pattern: [Variant 4](04-lexicographically-smallest-order.js) — Kahn's + min-heap

7. **All valid topological orders** (classic interview problem, no single
   LeetCode number)
   - Task: return every possible valid ordering, not just one
   - Pattern: [Variant 5](05-all-topological-orders.js) — Kahn's, backtracked

8. **Alien Dictionary** (LeetCode 269)
   - Task: derive the alphabet order implied by a sorted word list
   - Pattern: [Variant 6](06-alien-dictionary.js) — build the graph, then sort it, hardest classic

## After this module
Move to `12-union-find` (see [../index.md](../index.md)) — a different
mechanism (dynamic connectivity) for a related class of questions: does
adding this edge create a cycle, without redoing a full traversal.
