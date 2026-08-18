// Structure: a min-heap of the END times of currently-active meetings —
// the soonest-ending meeting is always at the root, so "has a room
// freed up yet?" is a single O(1) peek.
// When:
//   - given meeting intervals, find the minimum number of rooms needed
//     so no two overlapping meetings share a room
// Why:
//   - sorting meetings by START time first means they're processed in
//     the exact order rooms would actually be requested
//   - before assigning a new room, popping every heap entry whose end
//     time is already <= the new meeting's start time frees all rooms
//     that have genuinely become available — a single `if` instead of
//     `while` would miss cases where SEVERAL meetings ended before this
//     one starts
//   - the heap's size at any point IS the number of rooms in
//     simultaneous use — tracking the max size reached across the whole
//     scan gives the peak concurrent demand, which is exactly the
//     minimum rooms needed

function Heap(compare) {
  this.data = [];
  this.compare = compare;
}
Heap.prototype._siftUp = function (i) {
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (this.compare(this.data[i], this.data[p]) >= 0) break;
    [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
    i = p;
  }
};
Heap.prototype._siftDown = function (i) {
  const n = this.data.length;
  while (true) {
    const l = 2 * i + 1, r = 2 * i + 2;
    let best = i;
    if (l < n && this.compare(this.data[l], this.data[best]) < 0) best = l;
    if (r < n && this.compare(this.data[r], this.data[best]) < 0) best = r;
    if (best === i) break;
    [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
    i = best;
  }
};
Heap.prototype.push = function (val) {
  this.data.push(val);
  this._siftUp(this.data.length - 1);
};
Heap.prototype.pop = function () {
  const top = this.data[0];
  const last = this.data.pop();
  if (this.data.length > 0) { this.data[0] = last; this._siftDown(0); }
  return top;
};
Heap.prototype.peek = function () { return this.data[0]; };
Object.defineProperty(Heap.prototype, "size", { get() { return this.data.length; } });

function minMeetingRooms(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const endTimes = new Heap((a, b) => a - b);
  let maxRooms = 0;

  for (const [start, end] of sorted) {
    while (endTimes.size > 0 && endTimes.peek() <= start) endTimes.pop();
    endTimes.push(end);
    maxRooms = Math.max(maxRooms, endTimes.size);
  }
  return maxRooms;
}

// Demo
if (require.main === module) {
  console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]])); // 2
  console.log(minMeetingRooms([[7, 10], [2, 4]])); // 1
  console.log(minMeetingRooms([[0, 5], [0, 5], [10, 15]])); // 2 (peak, not final state)
}

module.exports = { minMeetingRooms };
