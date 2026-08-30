// O(n²) — QUADRATIC: a loop inside a loop, both running roughly n times
// — work grows with the SQUARE of the input. Double n, and the work
// roughly QUADRUPLES, not doubles.
//
// O(2^n) — EXPONENTIAL: work DOUBLES with every single additional
// element — the classic sign is naive recursion that branches into two
// (or more) calls per level, like the textbook recursive Fibonacci.
// This grows so fast that even modest n (30, 40) becomes impractically
// slow — the whole reason 21-lcs-family and friends use DP instead.

function allPairsCountingOps(arr) {
  let operations = 0;
  let pairs = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      operations++;
      if (arr[i] === arr[j] && i !== j) pairs++;
    }
  }
  return { pairs, operations };
}

// Deliberately the SLOW, naive version — this is what O(2^n) looks like
// before memoization. Kept tiny on purpose; see 04-bit-tricks or
// 19-01-knapsack for why nobody ships this version.
function naiveFibonacciCountingOps(n, counter = { operations: 0 }) {
  counter.operations++;
  if (n <= 1) return { value: n, operations: counter.operations };
  const left = naiveFibonacciCountingOps(n - 1, counter);
  const right = naiveFibonacciCountingOps(n - 2, counter);
  return { value: left.value + right.value, operations: counter.operations };
}

module.exports = { allPairsCountingOps, naiveFibonacciCountingOps };

if (require.main === module) {
  console.log("O(n²) — compare every element against every other element:");
  for (const n of [10, 20, 40, 80]) {
    const arr = new Array(n).fill(0).map((_, i) => i);
    const { operations } = allPairsCountingOps(arr);
    console.log(`  n = ${n.toString().padStart(4)}  ->  ${operations} operations  (n² = ${n * n})`);
  }
  console.log("  n doubled each row -> operations roughly QUADRUPLED each row.");

  console.log("\nO(2^n) — naive recursive Fibonacci, no memoization:");
  for (const n of [10, 15, 20, 25]) {
    const { operations } = naiveFibonacciCountingOps(n);
    console.log(`  n = ${n.toString().padStart(4)}  ->  ${operations} operations`);
  }
  console.log("  Each +5 to n roughly 11x'd the operation count — that explosion");
  console.log("  is why exponential algorithms become unusable so fast.");
}
