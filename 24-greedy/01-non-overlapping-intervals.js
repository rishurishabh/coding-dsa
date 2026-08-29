// Pattern: Greedy — interval scheduling (exchange argument)
// When: you need to pick/remove intervals from a set of possibly-overlapping
//       intervals, optimizing a count (max intervals kept / min removed).
// Why it works: sort by END time. Greedily keep the interval that frees up
//       the earliest room for what comes next. Exchange argument: if an
//       optimal solution ever kept an interval ending later instead of the
//       earliest-ending candidate, swapping it for the earliest-ending one
//       never hurts (it ends no later, so it conflicts with no more future
//       intervals) and never keeps fewer total intervals. So the greedy
//       choice is always at least as good — no backtracking needed.
//
// LC435: Non-overlapping Intervals — minimum removals to make the rest
// non-overlapping.

function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);

  let removed = 0;
  let lastEnd = sorted[0][1];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    if (start < lastEnd) {
      // Overlaps the kept interval — remove this one (it ends later or
      // equal, since we sorted by end, so keeping lastEnd is never worse).
      removed++;
    } else {
      lastEnd = end;
    }
  }

  return removed;
}

module.exports = { eraseOverlapIntervals };

if (require.main === module) {
  console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])); // 1
  console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])); // 2
  console.log(eraseOverlapIntervals([[1, 2], [2, 3]])); // 0
}
