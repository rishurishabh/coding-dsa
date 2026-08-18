# Binary Search Tree — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Search in a Binary Search Tree** (LeetCode 700)
   - Task: find a value in a BST
   - Pattern: [Variant 1](01-bst-core.js) — search, following the ordering rule

2. **Insert into a Binary Search Tree** (LeetCode 701)
   - Task: insert a value while keeping the BST property valid
   - Pattern: [Variant 1](01-bst-core.js) — insert

3. **Delete Node in a BST** (LeetCode 450)
   - Task: delete a value, handling all three deletion cases
   - Pattern: [Variant 1](01-bst-core.js) — delete, especially the two-children case

4. **Validate Binary Search Tree** (LeetCode 98)
   - Task: confirm a binary tree actually satisfies the BST property everywhere
   - Pattern: [Variant 2](02-bst-traversals-validate.js) — running [min, max] bounds

5. **Kth Smallest Element in a BST** (LeetCode 230)
   - Task: the kth smallest value, without a full sort
   - Pattern: [Variant 3](03-kth-smallest-element.js) — early-stopped inorder traversal

6. **Lowest Common Ancestor of a BST** (LeetCode 235)
   - Task: LCA of two nodes, given the tree is a BST
   - Pattern: [Variant 4](04-lowest-common-ancestor-bst.js) — one directed walk

7. **Convert Sorted Array to Binary Search Tree** (LeetCode 108)
   - Task: build a height-balanced BST from sorted input
   - Pattern: [Variant 5](05-balanced-bst-from-sorted-array.js) — recursive midpoint construction

## After this module
See [../index.md](../index.md) for what's next in the Data Structures
track — Heap/Priority Queue (already used as a building block throughout
[13-two-heaps](../../13-two-heaps/README.md),
[14-top-k-elements](../../14-top-k-elements/README.md), and
[15-k-way-merge](../../15-k-way-merge/README.md)), then Trie and Graph.
