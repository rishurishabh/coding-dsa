// Pattern: separate start/end sweep — counts CONCURRENT overlap instead of
// merging into a union. The question isn't "what's covered" (variant 1),
// it's "how many intervals are active at the busiest single moment".
// When:
//   - minimum meeting rooms needed to host every meeting (LeetCode 253)
// Why:
//   - sorting starts and ends independently and sweeping both in time order
//     turns "count active intervals" into "+1 on every start, −1 on every
//     end, track the running total's peak" — no need to track WHICH
//     intervals overlap, only how many do at once

function minMeetingRooms(intervals) {
  const starts = intervals.map((iv) => iv[0]).sort((a, b) => a - b);
  const ends = intervals.map((iv) => iv[1]).sort((a, b) => a - b);

  let rooms = 0;
  let maxRooms = 0;
  let s = 0;
  let e = 0;

  while (s < starts.length) {
    if (starts[s] < ends[e]) {
      rooms++; // a meeting starts before the earliest currently-running one ends
      s++;
    } else {
      rooms--; // a meeting ended — free up its room first
      e++;
    }
    maxRooms = Math.max(maxRooms, rooms);
  }
  return maxRooms;
}

// Demo
if (require.main === module) {
  console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]])); // 2
  console.log(minMeetingRooms([[7, 10], [2, 4]])); // 1
}

module.exports = { minMeetingRooms };
