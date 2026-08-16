// Pattern: merge, then read the COMPLEMENT — the answer is the space
// BETWEEN merged intervals, not the merged intervals themselves.
// When:
//   - find every common free-time gap across several schedules (LeetCode 759)
// Why:
//   - "free" is only meaningful relative to "busy" — merging first (variant
//     1) collapses every schedule into the true busy periods, and whatever
//     falls strictly between two consecutive merged intervals is, by
//     definition, free for everyone

function mergeIntervals(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0].slice()];
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    const [start, end] = sorted[i];
    if (start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
}

function findFreeTimeGaps(schedules) {
  const allIntervals = schedules.flat();
  if (allIntervals.length === 0) return [];

  const merged = mergeIntervals(allIntervals);
  const gaps = [];
  for (let i = 1; i < merged.length; i++) {
    gaps.push([merged[i - 1][1], merged[i][0]]); // the hole between two busy blocks
  }
  return gaps;
}

// Demo
if (require.main === module) {
  const schedules = [[[1, 2], [5, 6]], [[1, 3]], [[4, 10]]];
  console.log(findFreeTimeGaps(schedules)); // [[3,4]]
}

module.exports = { mergeIntervals, findFreeTimeGaps };
