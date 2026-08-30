// Module 1 said "don't use a stopwatch to DISCOVER Big-O" — noise makes
// that unreliable. But once you already KNOW two algorithms' complexity
// classes, timing them is a great way to see what that difference
// actually costs in practice. This file does exactly that: the same
// O(n²) vs O(n) duplicate-check from 01-time-space-tradeoff.js, timed
// on genuinely growing input sizes.

function hasDuplicateNestedLoop(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

function hasDuplicateWithSet(arr) {
  const seen = new Set();
  for (const value of arr) {
    if (seen.has(value)) return true;
    seen.add(value);
  }
  return false;
}

function timeIt(fn, arr) {
  const start = performance.now();
  fn(arr);
  return performance.now() - start;
}

module.exports = { hasDuplicateNestedLoop, hasDuplicateWithSet };

if (require.main === module) {
  console.log("Worst case for both (no duplicate exists — full scan required):\n");
  console.log("n".padStart(8), "O(n²) ms".padStart(12), "O(n) ms".padStart(12), "  ratio");

  for (const n of [1000, 2000, 4000, 8000]) {
    const arr = new Array(n).fill(0).map((_, i) => i); // all unique, worst case

    const nestedMs = timeIt(hasDuplicateNestedLoop, arr);
    const setMs = timeIt(hasDuplicateWithSet, arr);
    const ratio = (nestedMs / Math.max(setMs, 0.001)).toFixed(0);

    console.log(
      n.toString().padStart(8),
      nestedMs.toFixed(2).padStart(12),
      setMs.toFixed(2).padStart(12),
      `  ${ratio}x slower`
    );
  }

  console.log("\nWatch the O(n²) column as n doubles each row — it roughly");
  console.log("QUADRUPLES, while the O(n) column barely moves. This is the");
  console.log("real-world consequence of the shapes from");
  console.log("02-time-complexity-classes.js: at small n, the gap barely");
  console.log("matters; at real-world scale (millions of rows in a database,");
  console.log("thousands of users hitting an endpoint), O(n²) code that felt");
  console.log("fine in testing can take a production service down.");
}
