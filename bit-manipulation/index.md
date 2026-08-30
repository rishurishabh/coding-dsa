# Bit Manipulation — From Zero

A third track, separate from [patterns](../index.md) and
[data structures](../data-structures/index.md). This one assumes NOTHING —
not even that you remember what binary is. It starts at "what is a bit"
and builds up, one small idea at a time, to the point where
[18-bitwise-xor](../18-bitwise-xor/README.md) (an interview PATTERN that
uses bits to solve problems) actually makes sense.

If a sentence like `n & (n - 1)` looks like nonsense right now, that's
exactly who this track is for. By the end of module 4 it'll look obvious.

Legend: `[ ]` not started · `[x]` done

- [x] 01. [Binary Basics](01-binary-basics/README.md) — what a bit even is, and how to read/write binary by hand
- [x] 02. [Bitwise Operators](02-bitwise-operators/README.md) — AND, OR, NOT, XOR — four tiny rules, applied one column at a time
- [x] 03. [Shift Operators](03-shift-operators/README.md) — sliding bits left/right, and why that's the same as multiplying/dividing by 2
- [x] 04. [Bit Tricks](04-bit-tricks/README.md) — the recipe box: check/set/clear/toggle a bit, count bits, spot a power of two
- [x] 05. [Bitmasking for Subsets](05-bitmasking-subsets/README.md) — using one number's bits to represent "which items are in this group"

## How to actually use this track
Do them in order — each module leans on the one before it. Don't skip to
module 4 hoping the "tricks" will make sense without module 2's rules;
they won't, they're built directly out of them.

## Conventions
Same shape as the other two tracks: each numbered folder has a
`README.md` (explained slowly, with analogies, not just facts),
`problems.md` (a short practice list — these are meant to be easy once
you've read the README), `diagram.svg` / `diagram.html` (a visual you can
point at instead of just reading prose), and a couple of small runnable
`.js` files per module.

## Where this leads
Once module 5 clicks, two things elsewhere in this repo unlock:
- [18-bitwise-xor](../18-bitwise-xor/README.md) — the interview pattern
  built on top of the XOR identity from module 2
- [17-subsets-backtracking](../17-subsets-backtracking/README.md) and
  problems that ask you to try "every possible subset" — module 5's
  bitmask trick is a faster, simpler way to do that than recursion
