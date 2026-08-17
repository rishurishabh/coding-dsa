// Application: a second stack, kept in lockstep — tracking the minimum
// alongside the main stack, instead of scanning for it on demand.
// When:
//   - design a stack that supports push, pop, top, AND getMin, all in
//     O(1) (LeetCode 155)
// Why:
//   - scanning the whole stack for the minimum on every query would be
//     O(n) — instead, a second stack records "what was the minimum at the
//     moment this element was pushed", one entry per push
//   - popping the main stack and popping the min-stack together keeps
//     them in lockstep: the min-stack's top is ALWAYS the correct minimum
//     for whatever's currently in the main stack, because it forgets the
//     old minimum the instant the element that made it relevant is gone

function MinStack() {
  this.stack = [];
  this.minStack = []; // minStack[i] = minimum of stack[0..i]
}
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  const currentMin = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
  this.minStack.push(currentMin);
};
MinStack.prototype.pop = function () {
  this.minStack.pop();
  return this.stack.pop();
};
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

// Demo
if (require.main === module) {
  const ms = new MinStack();
  ms.push(-2);
  ms.push(0);
  ms.push(-3);
  console.log("min:", ms.getMin()); // -3
  ms.pop();
  console.log("top:", ms.top()); // 0
  console.log("min:", ms.getMin()); // -2
}

module.exports = { MinStack };
