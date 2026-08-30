// Every recursive call adds a new "frame" to the call stack — memory
// holding that call's local variables and where to resume once it
// returns. Those frames don't get freed until the call returns, so
// recursion that goes N levels deep is using O(N) stack space, even if
// each individual frame only holds a couple of variables.
//
// The iterative version of the same algorithm reuses ONE set of
// variables across the whole loop — O(1) space, no matter how large n is.

function factorialRecursive(n, depthTracker = { current: 0, max: 0 }) {
  depthTracker.current++;
  depthTracker.max = Math.max(depthTracker.max, depthTracker.current);

  let result;
  if (n <= 1) result = 1;
  else result = n * factorialRecursive(n - 1, depthTracker).value;

  depthTracker.current--; // this frame is about to return, stack shrinks back
  return { value: result, maxDepth: depthTracker.max };
}

function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i; // same two variables, every iteration
  return result;
}

module.exports = { factorialRecursive, factorialIterative };

if (require.main === module) {
  console.log("Recursive factorial — stack depth grows WITH n:");
  for (const n of [5, 10, 20]) {
    const { maxDepth } = factorialRecursive(n);
    console.log(`  n = ${n.toString().padStart(3)}  ->  max call stack depth: ${maxDepth}  (O(n) space)`);
  }

  console.log("\nIterative factorial — no growth at all, same 2 variables every time:");
  console.log("  n = 5, 10, 20, or 20,000 — always exactly one `result` and one `i`.");
  console.log("  factorialIterative(20) =", factorialIterative(20), " (O(1) space)");

  console.log("\nWhy this matters beyond theory — an actual crash:");
  try {
    factorialRecursive(1_000_000);
  } catch (err) {
    console.log("  factorialRecursive(1,000,000) threw:", err.constructor.name);
    console.log("  (\"Maximum call stack size exceeded\" — O(n) space isn't just");
    console.log("   an abstract label, it's a real ceiling the call stack has.)");
  }
}
