# Bitwise Operators — Practice Problems

1. **By hand, no code**: write 6 and 11 in binary, then compute AND, OR,
   and XOR of them by hand, one column at a time. Check with
   [01-and-or-not.js](01-and-or-not.js) / [02-xor-basics.js](02-xor-basics.js).

2. **Single Number** (LeetCode 136)
   - Task: every number in an array appears twice except one — find it
   - Pattern: [Variant 2](02-xor-basics.js) — XOR everything, pairs cancel

3. **Check if a number is even or odd using bits, not `%`**
   - Task: use `n & 1` instead of `n % 2`
   - Pattern: [Variant 1](01-and-or-not.js) — AND with 1 keeps only the last column

4. **Determine if Two Strings Are Close** or any "compare two masks"-style
   warmup — build two small bitmasks (see
   [05-bitmasking-subsets](../05-bitmasking-subsets/README.md) once you get
   there) and combine them with AND/OR to answer "shared" and "combined" questions.

## After this module
See [../index.md](../index.md) — next up is
[03-shift-operators](../03-shift-operators/README.md), which slides these
same columns left and right.
