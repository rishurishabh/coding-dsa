// O(1) — CONSTANT: the work never changes, no matter how big the input
// gets. Reading arr[0] costs the same whether the array has 5 elements
// or 5 million — there's no loop, no scanning, just one direct jump.
//
// O(log n) — LOGARITHMIC: the work grows, but VERY slowly, because each
// step throws away HALF of what's left to search. Binary search is the
// textbook example — doubling n only adds ONE more step, not a whole
// second pass.

function constantTimeAccess(arr) {
  let operations = 1; // exactly one step, always
  return { value: arr[0], operations };
}

function binarySearchCountingOps(sortedArr, target) {
  let low = 0;
  let high = sortedArr.length - 1;
  let operations = 0;

  while (low <= high) {
    operations++;
    const mid = (low + high) >> 1;
    if (sortedArr[mid] === target) return { found: true, operations };
    if (sortedArr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return { found: false, operations };
}

module.exports = { constantTimeAccess, binarySearchCountingOps };

if (require.main === module) {
  console.log("O(1) — array access, any size array:");
  for (const n of [10, 1000, 1_000_000]) {
    const arr = new Array(n).fill(0).map((_, i) => i);
    console.log(`  n = ${n.toString().padStart(9)}  ->  ${constantTimeAccess(arr).operations} operation`);
  }

  console.log("\nO(log n) — binary search, worst case (target not present):");
  for (const n of [10, 100, 1000, 10000, 100000]) {
    const sorted = new Array(n).fill(0).map((_, i) => i * 2); // even numbers, target below is odd -> never found
    const { operations } = binarySearchCountingOps(sorted, -1);
    console.log(`  n = ${n.toString().padStart(9)}  ->  ${operations} operations`);
  }
  console.log("\nn went from 10 to 100,000 (10,000x bigger) but operations");
  console.log("barely grew — that's the whole point of O(log n).");
}
