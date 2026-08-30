// Big-Theta (Θ) is what you get when the upper bound (O) and lower
// bound (Ω) happen to be the SAME function — meaning there's no "best
// case" vs "worst case" gap at all, the algorithm does the SAME amount
// of work every single time, regardless of how the input happens to be
// arranged. Θ(f(n)) means "grows EXACTLY like f(n)," not just "at most"
// or "at least."
//
// "Find the maximum value in an unsorted array" is the clean contrast to
// linear search from file 1: there is NO way to guarantee you've found
// the true maximum without having looked at every single element (the
// max could always be hiding in the one spot you skipped) — so best
// case and worst case are IDENTICAL.

function findMaxCountingOps(arr) {
  let operations = 0;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    operations++; // one comparison per remaining element, no way to skip any
    if (arr[i] > max) max = arr[i];
  }
  return { max, operations };
}

module.exports = { findMaxCountingOps };

if (require.main === module) {
  console.log("findMax — does it matter WHERE the maximum is?\n");

  const maxFirst = [100, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const maxLast = [1, 2, 3, 4, 5, 6, 7, 8, 9, 100];
  const maxMiddle = [1, 2, 3, 100, 5, 6, 7, 8, 9, 4];

  console.log("  max at the front :", findMaxCountingOps(maxFirst).operations, "operations");
  console.log("  max at the back  :", findMaxCountingOps(maxLast).operations, "operations");
  console.log("  max in the middle:", findMaxCountingOps(maxMiddle).operations, "operations");

  console.log("\nAll three are IDENTICAL (n-1 operations, every time) — the position");
  console.log("of the max never changes the operation count. Compare that to");
  console.log("01-best-and-worst-case.js's linear search, where position changed");
  console.log("the count from 1 all the way up to n.");

  console.log("\nBecause findMax's best case and worst case are the SAME function,");
  console.log("findMax is Θ(n) — not just O(n) (an upper bound) or Ω(n) (a lower");
  console.log("bound) individually, but a genuinely TIGHT description: this");
  console.log("algorithm's work grows EXACTLY like n, full stop, no asterisks.");
}
