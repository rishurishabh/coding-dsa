# Stack — Practice Problems

Work in this order; implement the structure first, then apply it.

1. **Implement Stack using Arrays** (classic exercise)
   - Task: build push/pop/peek/isEmpty from scratch, array-backed
   - Pattern: [Variant 1](01-array-stack.js) — array-backed stack

2. **Implement Stack using Linked List** (classic exercise)
   - Task: same operations, linked-list-backed — compare the trade-offs
   - Pattern: [Variant 2](02-linked-list-stack.js) — linked-list-backed stack

3. **Valid Parentheses** (LeetCode 20)
   - Task: determine whether brackets in a string are validly nested
   - Pattern: [Variant 3](03-valid-parentheses.js) — bracket matching

4. **Min Stack** (LeetCode 155)
   - Task: design a stack supporting push/pop/top/getMin all in O(1)
   - Pattern: [Variant 4](04-min-stack.js) — O(1) minimum tracking

5. **Evaluate Reverse Polish Notation** (LeetCode 150)
   - Task: evaluate a postfix arithmetic expression
   - Pattern: [Variant 5](05-evaluate-rpn.js) — postfix expression evaluation

6. **Implement Queue using Stacks** (LeetCode 232)
   - Task: build FIFO behavior out of two LIFO stacks
   - Pattern: [Variant 1](01-array-stack.js) or [Variant 2](02-linked-list-stack.js) —
     a good bridge into the next data-structures module, Queue

## After this module
Move to `data-structures/02-queue` (once built) — FIFO order, the mirror
image of everything here.
