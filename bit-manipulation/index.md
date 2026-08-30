# Bit Manipulation — From Zero

A third track, separate from [patterns](../index.md) and
[data structures](../data-structures/index.md). This one assumes NOTHING —
not even that you remember what binary is. It starts at "what is a bit"
and builds up, one small idea at a time, to the point where
[18-bitwise-xor](../18-bitwise-xor/README.md) (an interview PATTERN that
uses bits to solve problems) actually makes sense.

If a sentence like `n & (n - 1)` looks like nonsense right now, that's
exactly who this track is for. By the end of module 4 it'll look obvious.

## Why do we need bit manipulation, really?
Fair question — if you can already write `n % 2`, `arr.includes(x)`, or
`Math.pow(2, k)`, why learn a whole second way to do similar things? Four
honest reasons:

**1. It's the fastest thing a computer can do.** Every other operation
you use — `+`, `*`, `%`, array lookups — is eventually BUILT from bit
operations happening in the processor's hardware. AND/OR/XOR/shift aren't
an abstraction layer on top of "real" math; they're closer to the metal
than the math is. That's why `n & 1` (module 4) to check even/odd is
faster than `n % 2` — modulo has to do actual division work; `& 1` just
reads one wire.

**2. It packs a LOT of information into very little space.** A single
32-bit number can represent 32 independent yes/no flags at once (module
5's whole idea). Instead of an array of 32 booleans — 32 separate memory
slots — you get one number, one variable, one comparison. This isn't a
micro-optimization: file permissions (`chmod 755`), network subnet masks,
RGB colors packed into one hex value, and database "bitmap indexes" all
lean on exactly this trick because the space savings are real at scale.

**3. A specific, recurring category of interview problems gets MUCH
easier.** "Find the one element that doesn't repeat," "does this number
have a repeating power-of-two pattern," "generate every possible
subset" — these have obvious `O(n)` extra-space solutions (a hash set, a
recursive tree) and much less obvious `O(1)`-space bit solutions. Once
you've seen the trick you can't unsee it, but it does have to be seen
once — nobody derives `n & (n-1)` from first principles under interview
pressure without having met it before.

**4. It explains things you've probably already used without knowing
why they work.** `chmod 755`, IP subnet masks like `/24`, hex colors
like `#FF8800`, "flags" arguments in APIs that accept combinations like
`READ | WRITE` — all of these ARE bitmasks. This track won't just make
you faster at LeetCode, it'll make several corners of "how computers
actually work" stop feeling like memorized trivia.

None of this means you should reach for bit tricks by default — a
readable `arr.includes(x)` beats a clever bitmask nobody else on your
team can read, most of the time. The point is having the tool available
for the specific, recurring situations where it's the right one.

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
