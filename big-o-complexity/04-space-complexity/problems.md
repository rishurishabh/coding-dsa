# Space Complexity — Practice Problems

1. **By hand, no code**: does a function that creates a `Set` from an
   input array to check for duplicates use O(1) or O(n) auxiliary space?
   Check your reasoning against
   [01-auxiliary-vs-input-space.js](01-auxiliary-vs-input-space.js)'s
   definition of auxiliary space.

2. **Convert a recursive solution to iterative**
   - Task: take `factorialRecursive` from
     [02-recursive-call-stack-space.js](02-recursive-call-stack-space.js)
     and confirm you understand WHY the iterative version drops from
     O(n) to O(1) space — what specifically disappears?
   - Answer: the call stack frames. Iteration reuses one frame's worth
     of variables across every step; recursion keeps one frame ALIVE per
     unfinished call, all the way until the base case unwinds them

3. **Find the hidden O(n) space**
   - Task: `arr.slice()`, `[...arr]`, `arr.map(...)`, and string
     concatenation in a loop (`str += x`) all silently allocate new
     memory. For each, is the allocation O(1) or does it scale with
     input size?
   - Pattern: same "everything else" checklist idea as
     [03-calculating-time-complexity](../03-calculating-time-complexity/README.md) —
     library calls can hide costs that aren't obvious from the call site

4. **Reverse a Linked List** (LeetCode 206) — do it both ways
   - Task: reverse a linked list iteratively (O(1) space) and
     recursively (O(n) space from the call stack)
   - Pattern: [Variant 2](02-recursive-call-stack-space.js)'s exact
     tradeoff, applied to
     [06-in-place-linked-list-reversal](../../06-in-place-linked-list-reversal/README.md)

## After this module
See [../index.md](../index.md) — next up is
[05-applying-big-o](../05-applying-big-o/README.md): time-space
tradeoffs, and why any of this matters outside of an interview room.
