# Cyclic Sort

![Cyclic sort mechanism map: the placement swap loop, and a diagram for each of the 6 variants](diagram.svg)

Interactive version: [diagram.html](diagram.html) (open in a browser)

## What
- For an array holding n values drawn from a **known small range** (usually
  `[1,n]` or `[0,n]`), every value has exactly one correct index — place it
  there directly by swapping instead of comparing values pairwise
- After placement, whatever's left in the "wrong" spot isn't noise — it's a
  direct readout of what's missing, duplicated, or both
- One swap loop, five different ways to read its leftovers

## When to use it
Applies when:
1. The array's values are a **known range**, not arbitrary numbers — usually
   stated as "contains numbers from 1 to n" or "n distinct numbers in [0,n]"
2. The question is about **missing, duplicate, or corrupted** values relative
   to that expected range, not about ordering the array itself
3. You need O(n) time and O(1) extra space — the alternative (a hashset of
   seen values) is also O(n) time but costs O(n) space; cyclic sort trades
   that space for one pass of in-place swapping

## Why it works
- Value `v`'s home is index `v-1` (or `v` for a 0-indexed range) — a fact
  known immediately, with no comparison against any other element needed
- Every swap seats at least one value in its permanent home, so the
  placement loop does at most n swaps total, even though it looks nested
- Once placement finishes, index `i` not holding its expected value is
  provably informative: either that value was never in the array (missing),
  or a duplicate is squatting on someone else's home (found)

## Six variants — the honest count
Same principle as the last two modules: this is really one swap loop, read
five different ways. No padding to hit a round number.

| File | Variant | Use when |
|---|---|---|
| [01-basic-placement.js](01-basic-placement.js) | The placement loop itself | sort an array in place when values are a known 1..n permutation |
| [02-find-missing-number.js](02-find-missing-number.js) | First mismatch | exactly one number missing from a [0,n] range |
| [03-find-all-missing.js](03-find-all-missing.js) | Every mismatch, missing side | some numbers in [1,n] are duplicated, so others are missing — find all of them |
| [04-find-duplicates.js](04-find-duplicates.js) | Every mismatch, duplicate side | find the one duplicate, or all duplicates, in [1,n] |
| [05-corrupt-pair.js](05-corrupt-pair.js) | One mismatch, two answers | exactly one duplicate AND one missing value — a single leftover index reveals both |
| [06-first-missing-positive.js](06-first-missing-positive.js) | Placement with a range guard | values are arbitrary (negative, zero, huge) — only [1,n] can ever be the answer |

Each file is runnable standalone: `node 0X-name.js` prints a demo run.

See [problems.md](problems.md) for a suggested practice order.
