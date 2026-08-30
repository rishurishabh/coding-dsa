# Shift Operators — Practice Problems

1. **By hand, no code**: compute `6 << 2` and `40 >> 3` by sliding digits
   on paper first, then check with
   [01-left-shift.js](01-left-shift.js) / [02-right-shift.js](02-right-shift.js).

2. **Power of Two** (LeetCode 231, the shift-based half of the idea)
   - Task: is `n` an exact power of two?
   - Pattern: `1 << k` generates every power of two — compare against it, or
     see [04-bit-tricks](../04-bit-tricks/README.md) for the one-line trick

3. **Binary search midpoint, safely**
   - Task: compute `mid` without a `/2` — use `(low + high) >> 1`
   - Pattern: [Variant 2](02-right-shift.js) — the exact line real binary
     search code uses

4. **Reverse Bits** (LeetCode 190)
   - Task: reverse the bits of a 32-bit number
   - Pattern: repeatedly read the last bit with `& 1`, shift it into a
     result with `<<`, then shift the source right with `>>` — both
     variants working together

## After this module
See [../index.md](../index.md) — next up is
[04-bit-tricks](../04-bit-tricks/README.md), where AND/OR/XOR/shift
combine into short, memorizable recipes.
