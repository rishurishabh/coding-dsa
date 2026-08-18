// Structure: a queue backed by a singly linked list with BOTH a head and
// a tail pointer — enqueue appends at tail, dequeue removes from head,
// and neither operation ever has to walk the list.
// When:
//   - FIFO order is needed and the queue may grow unboundedly, without
//     wanting to think about resizing a backing array at all
// Why:
//   - keeping a tail pointer is what makes enqueue O(1): without it,
//     appending to a singly linked list would require walking all the
//     way to the end first, which is O(n)
//   - dequeue is O(1) worst case (no amortized resize cost, unlike
//     variant 1) — the trade-off is a pointer per element and worse
//     cache locality than a contiguous array

function Node(val) {
  this.val = val;
  this.next = null;
}
function LinkedListQueue() {
  this.head = null;
  this.tail = null;
  this.count = 0;
}
LinkedListQueue.prototype.enqueue = function (val) {
  const node = new Node(val);
  if (this.tail) this.tail.next = node;
  else this.head = node;
  this.tail = node;
  this.count++;
};
LinkedListQueue.prototype.dequeue = function () {
  if (this.isEmpty()) throw new Error("dequeue from empty queue");
  const val = this.head.val;
  this.head = this.head.next;
  if (!this.head) this.tail = null;
  this.count--;
  return val;
};
LinkedListQueue.prototype.peek = function () {
  if (this.isEmpty()) throw new Error("peek at empty queue");
  return this.head.val;
};
LinkedListQueue.prototype.isEmpty = function () {
  return this.count === 0;
};
Object.defineProperty(LinkedListQueue.prototype, "size", { get() { return this.count; } });

// Demo
if (require.main === module) {
  const q = new LinkedListQueue();
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  console.log("peek:", q.peek()); // 1
  console.log("dequeue:", q.dequeue()); // 1
  console.log("size:", q.size); // 2
}

module.exports = { LinkedListQueue };
