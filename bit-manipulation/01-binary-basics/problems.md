# Binary Basics — Practice Problems

These are meant to be easy — the point is to build confidence converting
back and forth, not to trick you.

1. **By hand, no code**: convert 5, 9, 20, and 100 to binary. Check your
   work by converting each answer back to decimal.

2. **Convert to Binary** (LeetCode-style, or just write a function)
   - Task: given a positive integer, return its binary representation as a string
   - Pattern: [Variant 1](01-decimal-to-binary.js) — repeated division by 2

3. **Add Binary** (LeetCode 67)
   - Task: given two binary strings, return their sum as a binary string
   - Pattern: convert both with [Variant 2](02-binary-to-decimal.js), add as
     numbers, convert back with [Variant 1](01-decimal-to-binary.js) — a
     good way to double-check both directions work together

4. **Number Complement** (LeetCode 476)
   - Task: flip every bit of a number's binary representation
   - Pattern: write out the binary by hand first (module 1's skill) before
     trying it in code — this one gets much easier in
     [04-bit-tricks](../04-bit-tricks/README.md) once you know the trick

## After this module
See [../index.md](../index.md) — next up is
[02-bitwise-operators](../02-bitwise-operators/README.md), the four rules
everything else in this track is built from.
