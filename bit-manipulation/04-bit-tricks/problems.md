# Bit Tricks — Practice Problems

1. **By hand, no code**: for `n = 10` (`1010`), work out `setBit(n, 0)`,
   `clearBit(n, 1)`, and `toggleBit(n, 3)` on paper, then check with
   [01-check-set-clear-toggle-bit.js](01-check-set-clear-toggle-bit.js).

2. **Power of Two** (LeetCode 231)
   - Task: determine if a number is a power of two
   - Pattern: [Variant 2](02-power-of-two-and-bit-count.js) — `n & (n-1) === 0`

3. **Number of 1 Bits** (LeetCode 191)
   - Task: count the set bits in a number
   - Pattern: [Variant 2](02-power-of-two-and-bit-count.js) — Brian Kernighan's trick

4. **Counting Bits** (LeetCode 338)
   - Task: count set bits for every number from 0 to n
   - Pattern: [Variant 2](02-power-of-two-and-bit-count.js)'s idea, run once per number

5. **Number Complement** (LeetCode 476)
   - Task: flip every SIGNIFICANT bit of a number (not its infinite
     leading zeros — that's what makes this harder than plain `~n`)
   - Pattern: [Variant 1](01-check-set-clear-toggle-bit.js)'s `toggleBit`,
     applied to every bit position up to the number's highest set bit

## After this module
See [../index.md](../index.md) — next up is
[05-bitmasking-subsets](../05-bitmasking-subsets/README.md), the final
module: using an entire number's worth of bits at once to represent a
whole group of items.
