# Tree DFS — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Binary Tree Preorder / Inorder / Postorder Traversal** (LeetCode 144 / 94 / 145)
   - Task: return node values in the given traversal order
   - Pattern: [Variant 1](01-traversal-orders.js) — recursive descent, three orders

2. **Path Sum** (LeetCode 112)
   - Task: does any root-to-leaf path sum to a target value
   - Pattern: [Variant 2](02-path-sum-target.js) — top-down, accumulate down

3. **Path Sum II** (LeetCode 113)
   - Task: return every root-to-leaf path that sums to a target
   - Pattern: [Variant 3](03-all-paths-with-backtrack.js) — top-down + explicit backtrack

4. **Validate Binary Search Tree** (LeetCode 98)
   - Task: verify the BST property holds everywhere, not just parent-to-child
   - Pattern: [Variant 4](04-validate-bst-range.js) — top-down, shrink a constraint

5. **Diameter of Binary Tree** (LeetCode 543)
   - Task: longest path between any two nodes, in edges
   - Pattern: [Variant 5](05-diameter-of-tree.js) — bottom-up + side channel

6. **Binary Tree Maximum Path Sum** (LeetCode 124)
   - Task: maximum sum along any node-to-node path, values may be negative
   - Pattern: [Variant 6](06-max-path-sum.js) — bottom-up + side channel + clamping, hardest classic

7. **Lowest Common Ancestor of a Binary Tree** (LeetCode 236)
   - Task: find the deepest node that has both p and q as descendants
   - Pattern: [Variant 7](07-lowest-common-ancestor.js) — bottom-up search

8. **Balanced Binary Tree** (LeetCode 110)
   - Task: determine whether every subtree's left/right heights differ by at most 1
   - Pattern: [Variant 5](05-diameter-of-tree.js)'s shape — return height, but the
     "side channel" here is an early-exit failure flag instead of a running max

## After this module
Move to `10-graph-bfs-dfs` (see [../index.md](../index.md)) — the same two
traversal shapes (BFS and DFS), generalized from trees to arbitrary graphs
and grids, next on the roadmap.
