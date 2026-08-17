// Pattern: one heap slot per source — a min-heap holds exactly one
// candidate from each of the K sorted lists at a time; popping the overall
// smallest and pushing that same list's next node keeps every list
// represented until it runs out.
// When:
//   - merge K sorted linked lists into one sorted list (LeetCode 23)
// Why:
//   - merging two lists at a time (K-1 pairwise merges) works, but
//     re-scans earlier merged output repeatedly; a heap instead always
//     knows the smallest AVAILABLE head across all K lists in O(log K),
//     touching each of the n total nodes exactly once — O(n log K) instead
//     of O(nK)
//   - the heap never holds more than K elements at once: one "frontier"
//     node per list, exactly like variant 1 of 14-top-k-elements holds a
//     fixed K, just for a different reason (K sources, not K best-so-far)

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}
function arrayToList(arr) {
  const dummy = new ListNode(0);
  let tail = dummy;
  for (const v of arr) { tail.next = new ListNode(v); tail = tail.next; }
  return dummy.next;
}
function listToArray(head) {
  const out = [];
  for (let n = head; n; n = n.next) out.push(n.val);
  return out;
}

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
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < this.data.length && this.compare(this.data[l], this.data[best]) < 0) best = l;
      if (r < this.data.length && this.compare(this.data[r], this.data[best]) < 0) best = r;
      if (best === i) break;
      [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
      i = best;
    }
  }
  return top;
};
Object.defineProperty(Heap.prototype, "size", { get() { return this.data.length; } });

function mergeKLists(lists) {
  const heap = new Heap((a, b) => a.val - b.val);
  for (const head of lists) if (head) heap.push(head);

  const dummy = new ListNode(0);
  let tail = dummy;
  while (heap.size > 0) {
    const node = heap.pop();
    tail.next = node;
    tail = node;
    if (node.next) heap.push(node.next); // this list's next candidate re-enters the heap
  }
  return dummy.next;
}

// Demo
if (require.main === module) {
  const lists = [[1, 4, 5], [1, 3, 4], [2, 6]].map(arrayToList);
  console.log(listToArray(mergeKLists(lists))); // [1,1,2,3,4,4,5,6]
}

module.exports = { ListNode, arrayToList, listToArray, Heap, mergeKLists };
