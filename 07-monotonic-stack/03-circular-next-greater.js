// Pattern: variant 1's stack, walked around twice — the array wraps, so an
// element near the end may need to look for its answer back near the start.
// When:
//   - "next greater element" but the array is circular (LeetCode 503)
// Why:
//   - simulating the wraparound by iterating `2n` times using `i % n` lets
//     every element see one full lap of "what comes after it" without
//     physically duplicating the array
//   - indices are only PUSHED during the first lap (i < n) — the second lap
//     exists purely to give early elements a chance to be popped by
//     something that wraps around to reach them, not to add new candidates

function nextGreaterElementsCircular(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(-1);
  const stack = []; // indices, decreasing values top-to-bottom

  for (let i = 0; i < 2 * n; i++) {
    const idx = i % n;
    while (stack.length && nums[stack[stack.length - 1]] < nums[idx]) {
      answer[stack.pop()] = nums[idx];
    }
    if (i < n) stack.push(idx);
  }
  return answer;
}

// Demo
if (require.main === module) {
  console.log(nextGreaterElementsCircular([1, 2, 1])); // [2,-1,2]
  console.log(nextGreaterElementsCircular([5, 4, 3, 2, 1])); // [-1,5,5,5,5]
}

module.exports = { nextGreaterElementsCircular };
