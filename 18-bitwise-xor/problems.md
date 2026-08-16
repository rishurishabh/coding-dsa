# Bitwise XOR — Practice Problems

Work in this order; each problem builds on the pattern before it.

1. **Single Number** (LeetCode 136)
   - Task: one value appears once, every other value appears exactly twice — find it
   - Pattern: [Variant 1](01-single-number-cancellation.js) — XOR cancellation

2. **Single Number III** (LeetCode 260)
   - Task: TWO values appear once each, everything else twice — find both
   - Pattern: [Variant 2](02-single-number-two-uniques.js) — partition by a differing bit

3. **Single Number II** (LeetCode 137)
   - Task: one value appears once, every other value appears exactly THREE times
   - Pattern: [Variant 3](03-single-number-triple-appearing.js) — bit-count state machine

4. **Missing Number** (LeetCode 268, revisited)
   - Task: n distinct numbers from [0,n], find the one missing — compare
     against the cyclic-sort solution in
     [05-cyclic-sort/02-find-missing-number.js](../05-cyclic-sort/02-find-missing-number.js)
   - Pattern: [Variant 4](04-missing-number-xor.js) — XOR indices against values

5. **Complement of Base 10 Integer** (LeetCode 1009 / 476)
   - Task: flip every significant bit of a number
   - Pattern: [Variant 5](05-complement-flip-bits.js) — mask + XOR to flip

6. **Number of 1 Bits** (LeetCode 191)
   - Task: count the set bits in a number
   - Pattern: [Variant 6](06-counting-bits-kernighan.js) — `n & (n-1)` clears the lowest bit

7. **Counting Bits** (LeetCode 338)
   - Task: count set bits for every number from 0 to n at once
   - Pattern: [Variant 6](06-counting-bits-kernighan.js)'s `countBits` — reuse an
     already-computed smaller answer instead of recounting from scratch

## After this module
Move to `19-01-knapsack` (see [../index.md](../index.md)) — an unrelated
mechanism (dynamic programming over a capacity/weight axis), starting the
Dynamic Programming section.
