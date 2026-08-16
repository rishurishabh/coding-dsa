# Bitwise XOR

![Bitwise XOR mechanism map: pair cancellation, and a diagram for each of the 6 variants](diagram.svg)

Interactive version: [diagram.html](diagram.html) (open in a browser)

## What
- One identity does most of the work: `a ^ a = 0` and `a ^ 0 = a` — XOR-ing
  a value with itself cancels to nothing, XOR-ing with nothing changes nothing
- Duplicates in a sequence cancel each other out when XORed together,
  regardless of order — that single fact solves a surprising range of
  "find the odd one out" problems in O(n) time and O(1) space, no hashset needed
- What changes between variants is what still needs XOR cancellation to
  fail gracefully into — when there are two survivors instead of one, when
  duplicates come in threes instead of pairs, when the "duplicate" is a
  range of indices instead of literal repeated values

## When to use it
Applies when:
1. The question is "find the value(s) that break a pattern" — appears once
   instead of twice, missing from an otherwise-complete range, the one bit
   position that differs
2. A hashset/counting approach works but costs O(n) space — XOR tricks
   solve the same class of problem in O(1) space, when the structure fits
3. You're manipulating bits directly — flipping, counting, or clearing
   them — where arithmetic operators either can't express the operation or
   are far slower

## Why it works
- XOR is commutative and associative: `a ^ b ^ c` gives the same result
  regardless of grouping or order, so accumulating one running XOR across
  an entire array is always safe
- Every bit position is independent — XOR, AND, and the identities below
  operate on each bit in isolation, which is what lets a single pass
  extract information no comparison-based scan could get as cheaply

## Six variants — the honest count
Six genuinely different ways XOR's cancellation property gets pushed
further, or where a related bit trick takes over where XOR alone can't.

| File | Variant | Use when |
|---|---|---|
| [01-single-number-cancellation.js](01-single-number-cancellation.js) | XOR cancellation | one value appears once, everything else twice |
| [02-single-number-two-uniques.js](02-single-number-two-uniques.js) | Partition by a differing bit | TWO values appear once each — split by a bit they don't share, then cancel within each half |
| [03-single-number-triple-appearing.js](03-single-number-triple-appearing.js) | Bit-count state machine | duplicates come in THREES, not pairs — plain XOR stops canceling |
| [04-missing-number-xor.js](04-missing-number-xor.js) | XOR indices against values | the "duplicate" to cancel is a known index range, not a repeated value |
| [05-complement-flip-bits.js](05-complement-flip-bits.js) | Mask + XOR to flip | flip only the significant bits of a number, not its infinite leading zeros |
| [06-counting-bits-kernighan.js](06-counting-bits-kernighan.js) | `n & (n-1)` clears the lowest bit | count set bits without checking every bit position one by one |

Each file is runnable standalone: `node 0X-name.js` prints a demo run.

See [problems.md](problems.md) for a suggested practice order.
