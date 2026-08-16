// Pattern: greedy, sorted by END not start — the interval-scheduling
// mechanism, distinct from every other variant here sorting by start.
// When:
//   - minimum number of intervals to remove so none overlap (LeetCode 435)
//   - equivalently: the maximum set of non-overlapping intervals you can keep
// Why:
//   - sorting by end time and always keeping the interval that finishes
//     soonest is provably optimal: it leaves the most room for everything
//     that comes after — sorting by START can't make this guarantee, since
//     an early-starting interval might drag on and block many others

function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;

  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let removals = 0;
  let lastEnd = sorted[0][1];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    if (start < lastEnd) {
      removals++; // this interval conflicts — drop it, keep the earlier-ending one
    } else {
      lastEnd = end; // no conflict, this becomes the new "last kept" interval
    }
  }
  return removals;
}

// Demo
if (require.main === module) {
  console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])); // 1
  console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])); // 2
}

module.exports = { eraseOverlapIntervals };
