# Tree BFS — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Binary Tree Level Order Traversal** (LeetCode 102)
   - Task: group node values into arrays by depth
   - Pattern: [Variant 1](01-level-order-traversal.js) — queue + level-size snapshot

2. **Binary Tree Level Order Traversal** (delimiter variant, no single LeetCode number)
   - Task: same result, using a sentinel/delimiter instead of counting queue size
   - Pattern: [Variant 2](02-level-order-sentinel.js) — queue + sentinel marker

3. **Binary Tree Zigzag Level Order Traversal** (LeetCode 103)
   - Task: levels alternate left-to-right and right-to-left
   - Pattern: [Variant 3](03-zigzag-level-order.js) — snapshot + direction toggle

4. **Binary Tree Right Side View** (LeetCode 199)
   - Task: return the values visible from the right side, top to bottom
   - Pattern: [Variant 4](04-right-side-view.js) — snapshot, keep one node

5. **Average of Levels in Binary Tree** (LeetCode 637)
   - Task: return the average value at each depth
   - Pattern: [Variant 1](01-level-order-traversal.js) — same traversal, aggregate the level instead of returning it raw

6. **Minimum Depth of Binary Tree** (LeetCode 111)
   - Task: shortest distance from root to any leaf
   - Pattern: [Variant 5](05-minimum-depth.js) — snapshot + early exit

7. **Populating Next Right Pointers in Each Node** (LeetCode 116)
   - Task: connect every node to its next right neighbor at the same depth
   - Pattern: [Variant 6](06-connect-level-pointers.js) — snapshot, mutate not collect

8. **Populating Next Right Pointers in Each Node II** (LeetCode 117)
   - Task: same as problem 7, but the tree isn't perfect (uneven levels)
   - Pattern: [Variant 6](06-connect-level-pointers.js) — identical code; the queue-based
     approach doesn't care whether the tree is perfect, only the pointer-reuse
     optimization (not covered here) would need to change

## After this module
Move to `09-tree-dfs` (see [../index.md](../index.md)) — same tree
structures, depth-first instead of breadth-first, next on the roadmap.
