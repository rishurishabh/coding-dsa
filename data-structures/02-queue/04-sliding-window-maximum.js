// Structure: a DEQUE (double-ended queue) used as a monotonic queue —
// values are pushed in at the back and popped from either end, kept in
// strictly decreasing order so the front is always the current max.
// When:
//   - the maximum (or minimum) of every fixed-size window in an array is
//     needed, without recomputing each window from scratch
// Why:
//   - before pushing a new value, pop off every smaller value already at
//     the back — they can NEVER be the max of any future window once a
//     bigger value has arrived after them, so keeping them around is
//     wasted space
//   - the front of the deque is evicted once its index falls outside the
//     current window — everything still inside the deque is a candidate,
//     in decreasing order, so the front is always this window's max
//   - each index is pushed once and popped at most once — O(n) total,
//     not O(n·k) from recomputing every window

function maxSlidingWindow(nums, k) {
  const deque = []; // stores indices, values at those indices stay decreasing
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]
}

module.exports = { maxSlidingWindow };
