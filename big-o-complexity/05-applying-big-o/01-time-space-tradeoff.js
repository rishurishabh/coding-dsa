// The classic tradeoff: spend MORE space to get LESS time, or spend
// LESS space and accept MORE time. Neither version is "wrong" — which
// one is better depends on what's scarce for your specific problem
// (memory-constrained device? huge n where O(n²) is unacceptable?).

// O(n²) time, O(1) extra space — check every pair directly.
function hasDuplicateNestedLoop(arr) {
  let operations = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      operations++;
      if (arr[i] === arr[j]) return { found: true, operations };
    }
  }
  return { found: false, operations };
}

// O(n) time, O(n) extra space — trade memory for speed using a Set.
function hasDuplicateWithSet(arr) {
  let operations = 0;
  const seen = new Set();
  for (const value of arr) {
    operations++;
    if (seen.has(value)) return { found: true, operations, spaceUsed: seen.size };
    seen.add(value);
  }
  return { found: false, operations, spaceUsed: seen.size };
}

module.exports = { hasDuplicateNestedLoop, hasDuplicateWithSet };

if (require.main === module) {
  // No duplicate at all — the worst case for the nested loop, since it
  // can't exit early and must check every single pair.
  const arr = new Array(2000).fill(0).map((_, i) => i);

  const nested = hasDuplicateNestedLoop(arr);
  const withSet = hasDuplicateWithSet(arr);
  const ratio = Math.round(nested.operations / withSet.operations);

  console.log("Same question (\"any duplicates?\"), same answer, two different costs:");
  console.log(`  nested loop : ${nested.operations} operations,  O(1) extra space`);
  console.log(`  Set lookup  : ${withSet.operations} operations,  O(n) extra space (${withSet.spaceUsed} items stored)`);
  console.log(`\nThe Set version does ~${ratio}x fewer operations here by spending O(n)`);
  console.log("memory instead of O(1) — that's the trade, made concrete.");
}
