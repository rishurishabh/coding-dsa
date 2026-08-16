// Pattern: prefix-sum + monotonic deque — sliding window that survives NEGATIVE numbers.
// When:
//   - "shortest subarray with sum at least K" where nums can contain negatives;
//     plain variable-size window (file 02) breaks because sum stops being monotonic
//     as the window grows (adding a negative can shrink the sum)
// Why:
//   - build prefix sums P[0..n]; want the shortest j-i where P[j]-P[i] >= K
//   - a monotonic increasing deque of prefix-sum indices finds, for each j, the best
//     (largest, closest) i in O(1) amortized — same push-once/pop-once argument as
//     file 05, applied to indices into the prefix-sum array instead of raw values

function shortestSubarray(nums, k) {
  const n = nums.length;
  const prefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

  const dq = []; // indices into prefix[], increasing prefix value
  let best = Infinity;

  for (let j = 0; j <= n; j++) {
    // prefix[j] can close out any earlier index i where prefix[j] - prefix[i] >= k
    while (dq.length && prefix[j] - prefix[dq[0]] >= k) {
      best = Math.min(best, j - dq.shift());
    }
    // prefix[j] is a better (smaller) future subtractor than any larger prefix behind it
    while (dq.length && prefix[dq[dq.length - 1]] >= prefix[j]) {
      dq.pop();
    }
    dq.push(j);
  }
  return best === Infinity ? -1 : best;
}

// Demo
if (require.main === module) {
  console.log("shortest subarray sum>=7:", shortestSubarray([2, -1, 2], 3)); // 3
  console.log("shortest subarray sum>=4:", shortestSubarray([1, 2], 4)); // -1
  console.log("shortest subarray sum>=51:", shortestSubarray([48, 99, 37, 4, -31], 51)); // 1 ([99] or [37,4] len2 -> shortest is 1: [99])
}

module.exports = { shortestSubarray };
