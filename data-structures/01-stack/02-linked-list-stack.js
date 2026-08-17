// Structure: a stack backed by a singly linked list — the HEAD of the list
// is the top of the stack, so push/pop only ever touch the first node.
// Why this instead of variant 1 (array-backed):
//   - every push and pop is O(1) WORST CASE, not just amortized — there's
//     no underlying buffer that occasionally needs to double in size and
//     copy every existing element; each node is allocated independently
//   - the trade-off: more memory overhead per element (each node carries a
//     pointer, not just a value) and worse cache locality (nodes can be
//     scattered in memory, unlike an array's contiguous block) — which is
//     exactly why arrays are still the default choice unless that O(1)
//     worst-case guarantee specifically matters
// Why a stack at all:
//   - LIFO order is what the problem needs — undo history, call frames,
//     matching nested structure — see variants 3-5 for concrete uses

function Node(val, next = null) {
  this.val = val;
  this.next = next;
}

function LinkedListStack() {
  this.head = null;
  this.count = 0;
}
LinkedListStack.prototype.push = function (val) {
  this.head = new Node(val, this.head); // new node becomes the head in one step
  this.count++;
};
LinkedListStack.prototype.pop = function () {
  if (this.isEmpty()) throw new Error("pop from empty stack");
  const val = this.head.val;
  this.head = this.head.next;
  this.count--;
  return val;
};
LinkedListStack.prototype.peek = function () {
  if (this.isEmpty()) throw new Error("peek at empty stack");
  return this.head.val;
};
LinkedListStack.prototype.isEmpty = function () {
  return this.head === null;
};
Object.defineProperty(LinkedListStack.prototype, "size", { get() { return this.count; } });

// Demo
if (require.main === module) {
  const stack = new LinkedListStack();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  console.log("peek:", stack.peek()); // 3
  console.log("pop:", stack.pop()); // 3
  console.log("size:", stack.size); // 2
}

module.exports = { Node, LinkedListStack };
