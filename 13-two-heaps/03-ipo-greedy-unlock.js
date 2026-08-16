// Pattern: two heaps for a gate, not a balance point — unlike variants 1-2,
// these two heaps don't split one dataset in half; one heap holds
// NOT-YET-AFFORDABLE options, the other holds CURRENTLY-AFFORDABLE ones.
// When:
//   - pick up to k projects to maximize final capital, where each project
//     needs a minimum capital to start and yields a profit that becomes
//     available capital for the next pick (LeetCode 502, "IPO")
// Why:
//   - sorting by capital requirement into a min-heap means "everything
//     currently affordable" can be found by popping while its top's
//     requirement <= current capital — those get moved into a max-heap of
//     profits, and greedily taking the highest available profit each round
//     is optimal because an unaffordable project TODAY only becomes more
//     affordable later (capital only grows), never less

function Heap(compare) {
  this.data = [];
  this.compare = compare;
}
Heap.prototype.push = function (val) {
  this.data.push(val);
  let i = this.data.length - 1;
  while (i > 0) {
    const parent = (i - 1) >> 1;
    if (this.compare(this.data[parent], this.data[i]) <= 0) break;
    [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
    i = parent;
  }
};
Heap.prototype.pop = function () {
  const top = this.data[0];
  const last = this.data.pop();
  if (this.data.length > 0) {
    this.data[0] = last;
    let i = 0;
    while (true) {
      let best = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < this.data.length && this.compare(this.data[left], this.data[best]) < 0) best = left;
      if (right < this.data.length && this.compare(this.data[right], this.data[best]) < 0) best = right;
      if (best === i) break;
      [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
      i = best;
    }
  }
  return top;
};
Heap.prototype.peek = function () { return this.data[0]; };
Object.defineProperty(Heap.prototype, "size", { get() { return this.data.length; } });

function findMaximizedCapital(k, w, profits, capital) {
  const byCapital = new Heap((a, b) => a[0] - b[0]); // min-heap: [capitalNeeded, profit]
  for (let i = 0; i < profits.length; i++) byCapital.push([capital[i], profits[i]]);

  const byProfit = new Heap((a, b) => b - a); // max-heap: profits currently affordable

  for (let round = 0; round < k; round++) {
    while (byCapital.size > 0 && byCapital.peek()[0] <= w) {
      byProfit.push(byCapital.pop()[1]); // this project just became affordable
    }
    if (byProfit.size === 0) break; // nothing affordable, and never will be with more capital... unless w grows
    w += byProfit.pop(); // take the best available profit
  }
  return w;
}

// Demo
if (require.main === module) {
  console.log(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1])); // 4
  console.log(findMaximizedCapital(3, 0, [1, 2, 3], [0, 1, 2])); // 6
}

module.exports = { Heap, findMaximizedCapital };
