// Pattern: increasing stack — the composed application of variant 2's
// "nearest smaller on the left" idea, plus "nearest smaller on the right"
// resolved the same way variant 1 resolves on pop, both at once.
// When:
//   - largest rectangle area in a histogram (LeetCode 84, the hardest
//     classic of this pattern)
// Why:
//   - a rectangle at bar i can extend exactly as far as the nearest bar
//     SHORTER than it on either side — those are precisely a "previous
//     smaller" and "next smaller" lookup, and both come for free from one
//     pass: when a bar gets popped because a shorter one arrived, the new
//     arrival is its next-smaller, and whatever's left on the stack below
//     it is its previous-smaller
//   - appending a sentinel height of 0 at the end forces every remaining
//     bar on the stack to be resolved, instead of leaving some unpopped

function largestRectangleArea(heights) {
  const stack = []; // indices, increasing heights top-to-bottom
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i]; // sentinel flushes the stack
    while (stack.length && heights[stack[stack.length - 1]] >= h) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}

// Demo
if (require.main === module) {
  console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
}

module.exports = { largestRectangleArea };
