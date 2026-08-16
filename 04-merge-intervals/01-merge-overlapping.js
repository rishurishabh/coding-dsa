// Pattern: sort by start, then sweep — the canonical merge-intervals shape.
// When:
//   - collapse a list of possibly-overlapping intervals into their union
// Why:
//   - after sorting by start time, any interval that overlaps the one being
//     built can only be the NEXT one in order (an earlier interval would
//     already have been merged in), so a single left-to-right sweep suffices
//   - "overlap" reduces to one comparison: does the next interval's start
//     fall at or before the current merged interval's end?

function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals.slice();

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0].slice()];

  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    const [start, end] = sorted[i];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end); // extend, don't just replace
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

// Demo
if (require.main === module) {
  console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]])); // [[1,6],[8,10],[15,18]]
}

module.exports = { mergeIntervals };
