// The whole technique, in one sentence: SEQUENTIAL steps ADD their
// complexities, NESTED steps MULTIPLY theirs. Everything below is that
// one rule, applied to four shapes that are easy to mix up.

function singleLoop(n) {
  let operations = 0;
  for (let i = 0; i < n; i++) operations++;
  return operations; // O(n) — one loop, one pass
}

function twoSequentialLoops(n) {
  let operations = 0;
  for (let i = 0; i < n; i++) operations++; // O(n)
  for (let j = 0; j < n; j++) operations++; // + O(n)
  return operations; // O(n) + O(n) = O(2n) -> drop the constant -> still O(n)
}

function nestedLoop(n) {
  let operations = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) operations++; // inner loop runs n times...
  } // ...for EACH of the outer loop's n iterations -> O(n) x O(n) = O(n²)
  return operations;
}

// The inner bound DEPENDS on the outer variable — easy to misjudge as
// "not really quadratic" because the inner loop shrinks. It still is:
// summing 1+2+3+...+n = n(n+1)/2, and dropping constants/lower terms
// from n²/2 + n/2 still leaves O(n²).
function triangularNestedLoop(n) {
  let operations = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) operations++;
  }
  return operations;
}

module.exports = { singleLoop, twoSequentialLoops, nestedLoop, triangularNestedLoop };

if (require.main === module) {
  for (const n of [10, 20, 40]) {
    console.log(`n = ${n}`);
    console.log(`  singleLoop            : ${singleLoop(n)}          (O(n))`);
    console.log(`  twoSequentialLoops     : ${twoSequentialLoops(n)}          (O(n)+O(n) -> still O(n))`);
    console.log(`  nestedLoop             : ${nestedLoop(n)}        (O(n) x O(n) = O(n²))`);
    console.log(`  triangularNestedLoop   : ${triangularNestedLoop(n)}         (also O(n²), just with a smaller constant)`);
  }

  console.log("\nWatch nestedLoop vs triangularNestedLoop as n doubles (20 -> 40):");
  console.log("  nestedLoop      : ", nestedLoop(20), "->", nestedLoop(40), " (quadruples)");
  console.log("  triangularLoop  : ", triangularNestedLoop(20), "->", triangularNestedLoop(40), " (also roughly quadruples)");
}
