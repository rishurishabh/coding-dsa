# Data Structures

A separate track from the [27 interview patterns](../index.md) above it —
this one is about building the core data structures **from scratch**: what
operations they support, why those operations cost what they cost, and the
classic problems each structure is the natural fit for. Several pattern
modules (Two Heaps, Top K Elements, K-way Merge) already use a heap
built this way as a building block; this track is where that block itself
gets built and explained.

Legend: `[ ]` not started · `[x]` done

- [x] 01. [Stack](01-stack/README.md) — LIFO at one end, array-backed vs linked-list-backed
- [ ] 02. Queue — FIFO, the mirror image of a stack
- [ ] 03. Linked List — from-scratch singly/doubly linked list operations
- [ ] 04. Hash Map — from-scratch hashing and collision resolution
- [ ] 05. Binary Search Tree — from-scratch insert/delete/search
- [ ] 06. Heap / Priority Queue — from-scratch binary heap (the structure
      reused throughout [13-two-heaps](../13-two-heaps/README.md),
      [14-top-k-elements](../14-top-k-elements/README.md), and
      [15-k-way-merge](../15-k-way-merge/README.md))
- [ ] 07. Trie — from-scratch prefix tree (also pattern 25 in the main roadmap)
- [ ] 08. Graph — from-scratch adjacency list/matrix representations

## Conventions
Same as the pattern modules: each numbered folder gets a `README.md`
(theory + diagram), `problems.md` (practice list), `diagram.svg`/`diagram.html`
(visual mechanism map), and one runnable `.js` file per variant.

## Relationship to the pattern modules
The pattern modules (in `../`) assume familiarity with these structures and
focus on the techniques applied ON TOP of them — this track fills in the
"how is this thing built" layer underneath. Worth visiting whichever comes
first for you: build the structure, then see it used in a pattern; or hit
a pattern that leans on a structure you want to understand more deeply
first, then come here.
