// Structure: a stack backed by a plain array — the array's own end IS the
// top of the stack, so every operation only ever touches that one end.
// When:
//   - LIFO (last-in, first-out) order is what the problem actually needs:
//     undo history, function call frames, matching nested structure
// Why:
//   - push/pop at the END of an array is O(1) amortized — no shifting of
//     other elements, unlike inserting/removing at the FRONT (which would
//     be O(n), since everything after it has to move)
//   - "amortized" is the key word: most pushes are O(1), but the
//     underlying array occasionally needs to grow and copy everything —
//     JS engines handle that resize automatically, which is exactly the
//     trade-off variant 2 (linked-list-backed) avoids entirely

function ArrayStack() {
  this.data = [];
}
ArrayStack.prototype.push = function (val) {
  this.data.push(val);
};
ArrayStack.prototype.pop = function () {
  if (this.isEmpty()) throw new Error("pop from empty stack");
  return this.data.pop();
};
ArrayStack.prototype.peek = function () {
  if (this.isEmpty()) throw new Error("peek at empty stack");
  return this.data[this.data.length - 1];
};
ArrayStack.prototype.isEmpty = function () {
  return this.data.length === 0;
};
Object.defineProperty(ArrayStack.prototype, "size", { get() { return this.data.length; } });

// Demo
if (require.main === module) {
  const stack = new ArrayStack();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  console.log("peek:", stack.peek()); // 3
  console.log("pop:", stack.pop()); // 3
  console.log("size:", stack.size); // 2
}

module.exports = { ArrayStack };
