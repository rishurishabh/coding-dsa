// Pattern: monotonic deque — window max/min in O(n) total.
// When:
//   - "max of every window of size k"; sum-style +/- doesn't work for max/min
//     because removing the leaving element might have BEEN the max, forcing a rescan
// Why:
//   - deque holds indices in decreasing value order (for max)
//   - each index is pushed once and popped at most once => O(n) total, despite
//     the nested-looking loop

function maxSlidingWindow(nums, k) {
  const dq = []; // stores indices; nums[dq[i]] is decreasing
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) {
      dq.pop(); // smaller elements behind a bigger new one can never win
    }
    dq.push(i);

    if (dq[0] <= i - k) dq.shift(); // drop index that fell out of window

    if (i >= k - 1) result.push(nums[dq[0]]);
  }
  return result;
}

// Mirror of maxSlidingWindow: deque increasing instead of decreasing
function minSlidingWindow(nums, k) {
  const dq = []; // increasing value order
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    while (dq.length && nums[dq[dq.length - 1]] >= nums[i]) {
      dq.pop();
    }
    dq.push(i);

    if (dq[0] <= i - k) dq.shift();

    if (i >= k - 1) result.push(nums[dq[0]]);
  }
  return result;
}

// Demo
if (require.main === module) {
  const nums = [1, 3, -1, -3, 5, 3, 6, 7];
  const k = 3;
  console.log("max window:", maxSlidingWindow(nums, k)); // [3,3,5,5,6,7]
  console.log("min window:", minSlidingWindow(nums, k)); // [-1,-3,-3,-3,3,3]
}

module.exports = { maxSlidingWindow, minSlidingWindow };
