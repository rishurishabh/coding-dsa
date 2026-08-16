# In-place Linked List Reversal — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Reverse Linked List** (LeetCode 206)
   - Task: reverse a whole singly linked list, O(1) space
   - Pattern: [Variant 1](01-reverse-entire-list.js) — iterative three-pointer relink

2. **Reverse Linked List** (LeetCode 206, recursive follow-up)
   - Task: same problem, recursive solution
   - Pattern: [Variant 2](02-reverse-recursive.js) — recursive relink

3. **Reverse Linked List II** (LeetCode 92)
   - Task: reverse only the nodes between positions `left` and `right`
   - Pattern: [Variant 3](03-reverse-sublist.js) — bound + splice back

4. **Reverse Nodes in k-Group** (LeetCode 25)
   - Task: reverse every group of k nodes; leave a short trailing group as-is
   - Pattern: [Variant 4](04-reverse-k-group.js) — bounded reversal, repeated

5. **Reverse alternating K nodes** (classic interview extension, no single LeetCode number)
   - Task: reverse the 1st, 3rd, 5th... group of k nodes; leave the rest untouched
   - Pattern: [Variant 5](05-reverse-alternating-k-group.js) — reverse, skip, repeat

6. **Palindrome Linked List** (LeetCode 234)
   - Task: check whether a list reads the same forwards and backwards, O(1) space
   - Pattern: [03-fast-slow-pointers/05-middle-plus-reverse.js](../03-fast-slow-pointers/05-middle-plus-reverse.js) —
     composes variant 1's reversal with fast/slow's middle-finding

7. **Swap Nodes in Pairs** (LeetCode 24)
   - Task: swap every two adjacent nodes
   - Pattern: [Variant 4](04-reverse-k-group.js) with `k = 2` — a direct special case, good sanity check

## After this module
Move to `07-monotonic-stack` (see [../index.md](../index.md)) — an unrelated
mechanism (a stack that maintains sorted order), next on the roadmap.
