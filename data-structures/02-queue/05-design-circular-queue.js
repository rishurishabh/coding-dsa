// Structure: the same circular buffer idea as variant 1, but exposed as
// a FIXED-capacity queue with explicit isFull/isEmpty checks — the shape
// LeetCode's "Design Circular Queue" asks for directly.
// When:
//   - a queue needs a hard capacity limit (bounded buffers, producer/
//     consumer queues with backpressure) rather than growing forever
// Why:
//   - with a fixed-size array, head and tail wrapping via modulo is
//     enough on its own — no resize step is needed, since the capacity
//     is never meant to grow
//   - isFull has to be checked explicitly since head === tail is
//     ambiguous on its own — it means empty when count is 0, and full
//     when count equals capacity, so an explicit count resolves it

function MyCircularQueue(k) {
  this.data = new Array(k);
  this.capacity = k;
  this.head = 0;
  this.tail = 0;
  this.count = 0;
}
MyCircularQueue.prototype.enQueue = function (val) {
  if (this.isFull()) return false;
  this.data[this.tail] = val;
  this.tail = (this.tail + 1) % this.capacity;
  this.count++;
  return true;
};
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false;
  this.head = (this.head + 1) % this.capacity;
  this.count--;
  return true;
};
MyCircularQueue.prototype.Front = function () {
  return this.isEmpty() ? -1 : this.data[this.head];
};
MyCircularQueue.prototype.Rear = function () {
  return this.isEmpty() ? -1 : this.data[(this.tail - 1 + this.capacity) % this.capacity];
};
MyCircularQueue.prototype.isEmpty = function () {
  return this.count === 0;
};
MyCircularQueue.prototype.isFull = function () {
  return this.count === this.capacity;
};

// Demo
if (require.main === module) {
  const q = new MyCircularQueue(3);
  console.log(q.enQueue(1)); // true
  console.log(q.enQueue(2)); // true
  console.log(q.enQueue(3)); // true
  console.log(q.enQueue(4)); // false, full
  console.log(q.Rear()); // 3
  console.log(q.isFull()); // true
  console.log(q.deQueue()); // true
  console.log(q.enQueue(4)); // true
  console.log(q.Rear()); // 4
}

module.exports = { MyCircularQueue };
