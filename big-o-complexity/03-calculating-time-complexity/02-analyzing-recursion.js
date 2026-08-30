// Two questions turn any recursive function into a Big-O answer:
//   1. How many calls does it make (does it branch into more than one
//      call per level, or stay at one)?
//   2. How much NON-recursive work happens per call, and how many
//      "levels" deep does the recursion go?
//
// Linear recursion (one call per level) -> calls === depth -> O(depth).
// Divide-and-conquer (splits in half, O(n) work to recombine) ->
// depth is O(log n), but total work across all levels is
// "work per level" x "number of levels" = O(n) x O(log n) = O(n log n).

function factorialCountingCalls(n, counter = { calls: 0 }) {
  counter.calls++;
  if (n <= 1) return { value: 1, calls: counter.calls };
  const sub = factorialCountingCalls(n - 1, counter);
  return { value: n * sub.value, calls: counter.calls };
}

function countRecursionDepth(n) {
  // How many times can you halve n before reaching 1? That count IS the
  // recursion depth of any "split in half each call" algorithm.
  let depth = 0;
  let size = n;
  while (size > 1) {
    size = Math.floor(size / 2);
    depth++;
  }
  return depth;
}

function divideAndConquerTotalWork(n) {
  // At EVERY level of a merge-sort-shaped recursion, the combined
  // recombination work across all the subproblems at that level is
  // still roughly n (n/2 + n/2 at level 1, n/4 x4 at level 2, etc. —
  // it always sums back to n per level). Multiply by the depth to get
  // total work across the whole recursion.
  const depth = countRecursionDepth(n);
  const workPerLevel = n;
  const totalWork = workPerLevel * depth;
  return { depth, workPerLevel, totalWork };
}

module.exports = { factorialCountingCalls, countRecursionDepth, divideAndConquerTotalWork };

if (require.main === module) {
  console.log("Linear recursion (factorial) — one call per level:");
  for (const n of [5, 10, 20]) {
    const { calls } = factorialCountingCalls(n);
    console.log(`  n = ${n.toString().padStart(3)}  ->  ${calls} calls  (calls === n, this IS O(n))`);
  }

  console.log("\nDivide-and-conquer (merge-sort shape) — split in half, O(n) work per level:");
  for (const n of [16, 256, 4096]) {
    const { depth, totalWork } = divideAndConquerTotalWork(n);
    const nLogN = Math.round(n * Math.log2(n));
    console.log(`  n = ${n.toString().padStart(5)}  ->  depth ${depth} (≈log2(n)), total work ${totalWork}  (n·log2(n) ≈ ${nLogN})`);
  }

  console.log("\nContrast with naive Fibonacci's O(2^n) shape from module 2:");
  console.log("  that one branches into TWO recursive calls per level instead of");
  console.log("  splitting the input — 'how many calls per level' is exactly the");
  console.log("  question that separates O(n), O(log n) depth, and O(2^n) recursion.");
}
