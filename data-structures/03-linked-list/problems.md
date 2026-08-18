# Linked List — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Design Linked List** (LeetCode 707)
   - Task: implement get/addAtHead/addAtTail/addAtIndex/deleteAtIndex from scratch
   - Pattern: [Variant 1](01-singly-linked-list.js) — core CRUD

2. **Merge Two Sorted Lists** (LeetCode 21)
   - Task: merge two sorted linked lists into one, in place
   - Pattern: [Variant 3](03-merge-two-sorted-lists.js) — re-link, don't reallocate

3. **Add Two Numbers** (LeetCode 2)
   - Task: add two numbers represented as linked lists of digits
   - Pattern: [Variant 5](05-add-two-numbers.js) — digit-by-digit with carry

4. **LRU Cache** (LeetCode 146)
   - Task: O(1) get/put cache with least-recently-used eviction
   - Pattern: [Variant 2](02-doubly-linked-list.js) + [Variant 4](04-lru-cache.js) —
     doubly linked list for O(1) removal, hash map for O(1) lookup

5. **Reverse Linked List** (LeetCode 206)
   - Task: reverse a singly linked list in place
   - Pattern: covered in [06-in-place-linked-list-reversal](../../06-in-place-linked-list-reversal/README.md),
     built on this module's [Variant 1](01-singly-linked-list.js) node shape

6. **Linked List Cycle** (LeetCode 141)
   - Task: detect whether a linked list has a cycle
   - Pattern: covered in [03-fast-slow-pointers](../../03-fast-slow-pointers/README.md),
     built on this module's [Variant 1](01-singly-linked-list.js) node shape

## After this module
Move to `04-hash-map` (see [../index.md](../index.md)) — the LRU Cache
in this module already leaned on a hash map for O(1) lookup; the next
module builds that structure itself, from scratch.
