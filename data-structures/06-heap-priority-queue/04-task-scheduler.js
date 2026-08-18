// Structure: a max-heap of task frequencies — the task with the MOST
// remaining occurrences always gets scheduled first, which is what
// spreads identical tasks as far apart as possible.
// When:
//   - tasks (or any repeated work) need scheduling with a mandatory
//     cooldown between two occurrences of the SAME task, minimizing
//     total time including idle slots
// Why:
//   - greedily running the most-frequent remaining task first is what
//     minimizes idle time: a task with many occurrences needs to start
//     "using up" its cooldown windows as early as possible, or it'll
//     force idle slots later when nothing else is left to fill them
//   - a max-heap (built here by flipping the compare function, not by
//     writing separate logic) gives O(log k) access to "which of the k
//     distinct tasks has the most left," instead of rescanning all
//     frequencies every slot
//   - one full cycle is n+1 slots long (the task itself plus n cooldown
//     slots) — filling each cycle with the next-most-frequent tasks,
//     and only leaving a slot idle if NOTHING is available, is what the
//     inner loop does

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
Object.defineProperty(Heap.prototype, "size", { get() { return this.data.length; } });

function leastInterval(tasks, n) {
  const freq = new Map();
  for (const t of tasks) freq.set(t, (freq.get(t) || 0) + 1);

  const maxHeap = new Heap((a, b) => b - a); // reversed compare = max-heap
  for (const count of freq.values()) maxHeap.push(count);

  let time = 0;
  while (maxHeap.size > 0) {
    const cycle = [];
    for (let slot = 0; slot <= n; slot++) {
      if (maxHeap.size > 0) {
        const count = maxHeap.pop();
        if (count - 1 > 0) cycle.push(count - 1);
      }
      time++;
      if (maxHeap.size === 0 && cycle.length === 0) break; // no idle needed at the very end
    }
    for (const c of cycle) maxHeap.push(c);
  }
  return time;
}

// Demo
if (require.main === module) {
  console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2)); // 8
  console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 0)); // 6, no cooldown needed
}

module.exports = { leastInterval };
