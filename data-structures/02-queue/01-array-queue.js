// Structure: a queue backed by a circular buffer — head and tail are
// indices that wrap around the array instead of the array physically
// shifting every time an element leaves the front.
// When:
//   - FIFO (first-in, first-out) order is what the problem needs, and the
//     queue is built directly on an array rather than linked nodes
// Why:
//   - a naive array queue that calls Array.shift() on dequeue is O(n) per
//     call, because every remaining element has to slide left one slot
//   - wrapping head and tail around a fixed-size buffer means enqueue and
//     dequeue only ever touch one slot each — O(1) — at the cost of an
//     occasional O(n) resize (amortized O(1)) when the buffer fills up

function ArrayQueue(initialCapacity = 4) {
  this.data = new Array(initialCapacity);
  this.head = 0;
  this.tail = 0;
  this.count = 0;
}
ArrayQueue.prototype._resize = function (newCapacity) {
  const resized = new Array(newCapacity);
  for (let i = 0; i < this.count; i++) {
    resized[i] = this.data[(this.head + i) % this.data.length];
  }
  this.data = resized;
  this.head = 0;
  this.tail = this.count;
};
ArrayQueue.prototype.enqueue = function (val) {
  if (this.count === this.data.length) this._resize(this.data.length * 2);
  this.data[this.tail] = val;
  this.tail = (this.tail + 1) % this.data.length;
  this.count++;
};
ArrayQueue.prototype.dequeue = function () {
  if (this.isEmpty()) throw new Error("dequeue from empty queue");
  const val = this.data[this.head];
  this.data[this.head] = undefined;
  this.head = (this.head + 1) % this.data.length;
  this.count--;
  return val;
};
ArrayQueue.prototype.peek = function () {
  if (this.isEmpty()) throw new Error("peek at empty queue");
  return this.data[this.head];
};
ArrayQueue.prototype.isEmpty = function () {
  return this.count === 0;
};
Object.defineProperty(ArrayQueue.prototype, "size", { get() { return this.count; } });

// Demo
if (require.main === module) {
  const q = new ArrayQueue(2);
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3); // triggers a resize past initial capacity 2
  console.log("peek:", q.peek()); // 1
  console.log("dequeue:", q.dequeue()); // 1
  console.log("size:", q.size); // 2
}

module.exports = { ArrayQueue };
