// Pattern: three-phase scan — no sort needed, because the input is ALREADY
// sorted and non-overlapping; only the new interval needs placing.
// When:
//   - insert one new interval into an already-merged, sorted list
// Why:
//   - re-sorting and re-merging everything (variant 1) would be O(n log n)
//     for no reason — since the existing list is already clean, a single
//     pass splits cleanly into "ends before the new one starts", "overlaps
//     the new one", and "starts after the new one ends"

function insertInterval(intervals, newInterval) {
  const result = [];
  let [start, end] = newInterval;
  let i = 0;

  while (i < intervals.length && intervals[i][1] < start) {
    result.push(intervals[i]); // entirely before — no overlap possible
    i++;
  }

  while (i < intervals.length && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]); // absorb every overlapping interval
    end = Math.max(end, intervals[i][1]);
    i++;
  }
  result.push([start, end]);

  while (i < intervals.length) {
    result.push(intervals[i]); // entirely after
    i++;
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log(insertInterval([[1, 3], [6, 9]], [2, 5])); // [[1,5],[6,9]]
  console.log(insertInterval([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])); // [[1,2],[3,10],[12,16]]
}

module.exports = { insertInterval };
