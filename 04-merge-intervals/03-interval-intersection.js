// Pattern: two-pointer sweep across TWO independent interval lists — the
// interval-domain sibling of 02-two-pointers/07-two-array-merge.js.
// When:
//   - find every overlap between two separate sorted, non-overlapping lists
// Why:
//   - each interval can only overlap a contiguous run of intervals in the
//     other list; whichever interval ends first can't overlap anything
//     further ahead, so it's always safe to advance that pointer alone

function intervalIntersection(A, B) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < A.length && j < B.length) {
    const start = Math.max(A[i][0], B[j][0]);
    const end = Math.min(A[i][1], B[j][1]);
    if (start <= end) result.push([start, end]);

    if (A[i][1] < B[j][1]) i++; // A's interval is exhausted first
    else j++;
  }
  return result;
}

// Demo
if (require.main === module) {
  const A = [[0, 2], [5, 10], [13, 23], [24, 25]];
  const B = [[1, 5], [8, 12], [15, 24], [25, 26]];
  console.log(intervalIntersection(A, B)); // [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
}

module.exports = { intervalIntersection };
