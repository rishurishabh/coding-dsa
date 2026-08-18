// Structure: FIFO built entirely out of two LIFO stacks — an "in" stack
// for arriving elements, and an "out" stack that holds them in reversed
// (i.e. FIFO) order once they're needed.
// When:
//   - only a stack primitive is available (or the problem specifically
//     asks for it), but queue behavior is required
// Why:
//   - pushing onto a stack reverses order; pushing that reversed order
//     onto a SECOND stack reverses it again, back to original order —
//     two reversals cancel out into a queue
//   - the out stack is only refilled from the in stack when it's empty,
//     so any single element gets moved at most twice (in→out) across
//     its entire lifetime — amortized O(1) per operation, even though a
//     single dequeue can occasionally be O(n) when the refill happens

function MyQueue() {
  this.inStack = [];
  this.outStack = [];
}
MyQueue.prototype._transfer = function () {
  if (this.outStack.length === 0) {
    while (this.inStack.length > 0) {
      this.outStack.push(this.inStack.pop());
    }
  }
};
MyQueue.prototype.enqueue = function (val) {
  this.inStack.push(val);
};
MyQueue.prototype.dequeue = function () {
  this._transfer();
  if (this.outStack.length === 0) throw new Error("dequeue from empty queue");
  return this.outStack.pop();
};
MyQueue.prototype.peek = function () {
  this._transfer();
  if (this.outStack.length === 0) throw new Error("peek at empty queue");
  return this.outStack[this.outStack.length - 1];
};
MyQueue.prototype.isEmpty = function () {
  return this.inStack.length === 0 && this.outStack.length === 0;
};

// Demo
if (require.main === module) {
  const q = new MyQueue();
  q.enqueue(1);
  q.enqueue(2);
  console.log("peek:", q.peek()); // 1
  console.log("dequeue:", q.dequeue()); // 1
  q.enqueue(3);
  console.log("dequeue:", q.dequeue()); // 2
  console.log("dequeue:", q.dequeue()); // 3
}

module.exports = { MyQueue };
