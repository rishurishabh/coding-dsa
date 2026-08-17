# Coding DSA

A pattern-by-pattern DSA practice repo in JavaScript — 28 modules
(1 prerequisite + 27 interview patterns), each with theory, a visual
mechanism map, a practice list, and runnable code for every variant.

![DSA roadmap progress map: 18 of 28 modules complete, grouped by section](roadmap.svg)

**[Full roadmap → index.md](index.md)** · **[Interactive roadmap → roadmap.html](roadmap.html)**
(open `roadmap.html` in a browser — GitHub only renders it as source, not live;
click any done module there to jump straight to its README)

## How each module is structured

Every numbered folder follows the same shape:

```
0X-pattern-name/
  README.md       theory: what the pattern is, when to use it, why it works,
                   a table of every variant — plus an embedded diagram.svg
  problems.md      practice problems in suggested order, each mapped to a variant
  diagram.svg      static visual mechanism map (embedded in the README)
  diagram.html     the same diagram, interactive, open directly in a browser
  01-*.js … 0N-*.js  one file per variant — self-contained, runnable with
                   `node 0X-pattern-name/01-*.js`, prints a demo to stdout
```

Variant counts aren't padded to a round number — some patterns have 3
genuinely distinct mechanisms, others have 11. The README for each module
says so explicitly where the count is unusually low or high.

## Progress: 18 / 28

| # | Module | Status |
|---|---|---|
| 00 | [Sorting Algorithms](00-sorting-algorithms/README.md) | ✅ |
| 01 | [Sliding Window](01-sliding-window/README.md) | ✅ |
| 02 | [Two Pointers](02-two-pointers/README.md) | ✅ |
| 03 | [Fast & Slow Pointers](03-fast-slow-pointers/README.md) | ✅ |
| 04 | [Merge Intervals](04-merge-intervals/README.md) | ✅ |
| 05 | [Cyclic Sort](05-cyclic-sort/README.md) | ✅ |
| 06 | [In-place Linked List Reversal](06-in-place-linked-list-reversal/README.md) | ✅ |
| 07 | [Monotonic Stack](07-monotonic-stack/README.md) | ✅ |
| 08 | [Tree BFS](08-tree-bfs/README.md) | ✅ |
| 09 | [Tree DFS](09-tree-dfs/README.md) | ✅ |
| 10 | [Graph BFS/DFS](10-graph-bfs-dfs/README.md) | ✅ |
| 11 | [Topological Sort](11-topological-sort/README.md) | ✅ |
| 12 | [Union Find](12-union-find/README.md) | ✅ |
| 13 | [Two Heaps](13-two-heaps/README.md) | ✅ |
| 14 | [Top K Elements](14-top-k-elements/README.md) | ✅ |
| 15 | K-way Merge | ⬜ |
| 16 | [Modified Binary Search](16-modified-binary-search/README.md) | ✅ |
| 17 | Subsets / Backtracking | ⬜ |
| 18 | [Bitwise XOR](18-bitwise-xor/README.md) | ✅ |
| 19 | [0/1 Knapsack](19-01-knapsack/README.md) | ✅ |
| 20 | Unbounded Knapsack | ⬜ |
| 21 | LCS Family | ⬜ |
| 22 | Palindromic Subsequence | ⬜ |
| 23 | DP on Grids | ⬜ |
| 24 | Greedy | ⬜ |
| 25 | Trie | ⬜ |
| 26 | Segment / Fenwick Tree | ⬜ |
| 27 | Graph Shortest Path | ⬜ |

See [index.md](index.md) for the same list grouped by section, with the why
behind the ordering.

## Running the code

No dependencies — just Node:

```
node 01-sliding-window/01-fixed-size.js
```

Every variant file is self-contained (`module.exports` + an inline demo
guarded by `require.main === module`), so it can be run directly or
imported from a test.
