# Big-Omega and Big-Theta — Practice Problems

1. **By hand, no code**: for binary search, is the best case (target is
   exactly the middle element) different from the worst case (target is
   absent)? What are the Ω and O bounds? Check your reasoning against
   [01-best-and-worst-case.js](01-best-and-worst-case.js)'s framing.
   - Answer: Ω(1) best case (found immediately), O(log n) worst case —
     same shape as linear search's gap, just both bounds shifted down

2. **Classify these five operations as "gap" (O ≠ Ω) or "tight" (Θ)**:
   summing an array; searching an unsorted array for a value; searching
   a SORTED array for a value with binary search; copying an array;
   checking if an array is sorted (with early exit on the first
   out-of-order pair).
   - Pattern: [Variant 2](02-when-bounds-match-theta.js)'s test — "can
     this ever finish without looking at every element, given SOME
     lucky arrangement of the input?" If yes, there's a gap; if the
     algorithm is forced to check everything no matter what, it's Θ

3. **Bubble Sort — best case vs. worst case**
   - Task: implement bubble sort with an early-exit optimization (stop
     if a full pass makes zero swaps), then run it once on an
     already-sorted array and once on a reverse-sorted array, counting
     comparisons for each
   - What to expect: Ω(n) on the already-sorted input (one pass, no
     swaps, exits immediately), O(n²) on the reverse-sorted input — a
     real algorithm with the SAME shape of gap as linear search's

4. **Find the Min and Max Together** — an extension of
   [02-when-bounds-match-theta.js](02-when-bounds-match-theta.js)
   - Task: write a function that finds both the min AND max in one pass
   - What to notice: still Θ(n) — every element still has to be looked
     at exactly once, whether you're tracking one running value or two

## This is the last module in this track
See [../index.md](../index.md) for the full list. From here: revisit any
pattern module's README and notice which complexity claims are Big-O
(worst case, the usual default), and which ones — if you look closely —
are really Θ claims stated using O's more familiar name.
