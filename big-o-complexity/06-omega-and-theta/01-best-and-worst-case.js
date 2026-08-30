// Big-O describes an UPPER bound — "this algorithm never does MORE than
// this much work." It says nothing on its own about how LITTLE work is
// possible. Big-Omega (Ω) is the mirror image: a LOWER bound — "this
// algorithm never does LESS than this much work."
//
// Linear search is the cleanest example of these being genuinely
// DIFFERENT numbers, not just two names for the same fact: how much
// work it does depends entirely on WHERE the target happens to be.

function linearSearchCountingOps(arr, target) {
  let operations = 0;
  for (let i = 0; i < arr.length; i++) {
    operations++;
    if (arr[i] === target) return { index: i, operations };
  }
  return { index: -1, operations };
}

module.exports = { linearSearchCountingOps };

if (require.main === module) {
  const arr = new Array(1000).fill(0).map((_, i) => i);

  console.log("BEST CASE — target is the very first element:");
  const best = linearSearchCountingOps(arr, arr[0]);
  console.log(`  ${best.operations} operation  ->  this is the Ω(1) case (lower bound)`);

  console.log("\nWORST CASE — target is the last element (or missing entirely):");
  const worst = linearSearchCountingOps(arr, arr[arr.length - 1]);
  console.log(`  ${worst.operations} operations  ->  this is the O(n) case (upper bound)`);

  console.log("\nSame function, same input SIZE, wildly different operation counts");
  console.log("depending on WHERE the target is. That's why linear search gets");
  console.log("described with TWO different bounds instead of one: Ω(1) best");
  console.log("case, O(n) worst case. Neither bound alone tells the whole story.");
}
