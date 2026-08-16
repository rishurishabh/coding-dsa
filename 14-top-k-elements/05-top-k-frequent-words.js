// Pattern: variant 2's frequency heap, with a TWO-PART comparator — ties
// need a second rule, or "top K" becomes ambiguous about which tied
// elements survive.
// When:
//   - k most frequent words, ties broken alphabetically (LeetCode 692)
// Why:
//   - the heap's job is still "evict the worst element when oversized",
//     but "worst" is no longer a single number: lower frequency is worse,
//     and among EQUAL frequencies, the alphabetically LATER word is worse
//     (it should lose its spot to an earlier one first)
//   - getting the tie-break direction backwards silently produces a
//     plausible-looking but wrong answer — a good reason to write the
//     comparator as its own explicit step, not inline

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

function topKFrequentWords(words, k) {
  const counts = new Map();
  for (const w of words) counts.set(w, (counts.get(w) || 0) + 1);

  // "smaller" (evicted first) = lower frequency, OR equal frequency + later word
  const heap = new Heap((a, b) => {
    if (a[1] !== b[1]) return a[1] - b[1];
    return b[0].localeCompare(a[0]); // reversed: alphabetically later sorts as "smaller"
  });

  for (const entry of counts) {
    heap.push(entry);
    if (heap.size > k) heap.pop();
  }

  return heap.data
    .map(([word, count]) => [word, count])
    .sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0]))
    .map(([word]) => word);
}

// Demo
if (require.main === module) {
  console.log(topKFrequentWords(["i", "love", "leetcode", "i", "love", "coding"], 2)); // ["i","love"]
  console.log(topKFrequentWords(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4)); // ["the","is","sunny","day"]
}

module.exports = { Heap, topKFrequentWords };
