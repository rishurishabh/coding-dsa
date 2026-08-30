// O(n) — LINEAR: touch every element once. Double the input, double the
// work — a straight-line relationship.
//
// O(n log n) — LINEARITHMIC: touch every element, but ALSO do a
// log-n-shaped amount of extra work per pass — the signature shape of
// any "divide the problem in half, then recombine" algorithm, like merge
// sort. It's the best possible complexity for comparison-based sorting.

function linearScanCountingOps(arr) {
  let operations = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    operations++;
  }
  return { sum, operations };
}

// A merge sort that also counts every comparison it makes, to show the
// n log n shape directly instead of just trusting the label.
function mergeSortCountingOps(arr) {
  let operations = 0;

  function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      operations++; // one comparison per merge step
      if (left[i] <= right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }
    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(right[j++]);
    return result;
  }

  function sort(a) {
    if (a.length <= 1) return a;
    const mid = a.length >> 1;
    return merge(sort(a.slice(0, mid)), sort(a.slice(mid)));
  }

  const sorted = sort(arr);
  return { sorted, operations };
}

module.exports = { linearScanCountingOps, mergeSortCountingOps };

if (require.main === module) {
  console.log("O(n) — sum every element once:");
  for (const n of [10, 100, 1000, 10000]) {
    const arr = new Array(n).fill(1);
    console.log(`  n = ${n.toString().padStart(6)}  ->  ${linearScanCountingOps(arr).operations} operations`);
  }

  console.log("\nO(n log n) — merge sort comparisons:");
  for (const n of [10, 100, 1000, 10000]) {
    const arr = new Array(n).fill(0).map(() => Math.random());
    const { operations } = mergeSortCountingOps(arr);
    const nLogN = Math.round(n * Math.log2(n));
    console.log(`  n = ${n.toString().padStart(6)}  ->  ${operations} comparisons  (n·log2(n) ≈ ${nLogN})`);
  }
  console.log("\nThe comparison count tracks n·log2(n) closely — that IS what");
  console.log("'n log n' looks like when you actually count it.");
}
