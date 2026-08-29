# Trie — Practice Problems

Work in this order; each problem builds on the trie walk before it.

1. **Implement Trie (Prefix Tree)** (LeetCode 208)
   - Task: build insert / search / startsWith from scratch
   - Pattern: [Variant 1](01-trie-core.js) — core structure

2. **Word Search II** (LeetCode 212)
   - Task: find every word from a list that appears in a letter grid
   - Pattern: [Variant 2](02-word-search-ii.js) — trie + grid backtracking

3. **Design Add and Search Words Data Structure** (LeetCode 211)
   - Task: support search patterns where `.` matches any single letter
   - Pattern: [Variant 3](03-add-and-search-word.js) — wildcard branching search

4. **Longest Word in Dictionary** (LeetCode 720)
   - Task: find the longest word buildable one letter at a time from other words
   - Pattern: [Variant 4](04-longest-word-in-dictionary.js) — DFS restricted to "buildable" paths

5. **Replace Words** (LeetCode 648)
   - Task: replace each word in a sentence with its shortest matching dictionary root
   - Pattern: [Variant 5](05-replace-words.js) — shortest-prefix match

## After this module
See [../index.md](../index.md) for what's left — Segment/Fenwick Tree,
then Graph Shortest Path.
