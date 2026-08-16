// Pattern: decreasing stack, resolve a BOUNDED region on pop — instead of a
// single value, popping resolves a whole horizontal slab of trapped water.
// When:
//   - trapping rain water (LeetCode 42) — solved with two pointers in
//     02-two-pointers/03-running-max-both-sides.js; this is the stack-based
//     alternative, layer by layer instead of side by side
// Why:
//   - when a taller bar arrives, the just-popped (shorter) bar was a basin
//     floor; its water is bounded above by the SHORTER of the new bar and
//     whatever's now exposed on the stack below, and bounded left/right by
//     those two walls — width and height both fall out of the pop itself
//   - each layer of water gets counted exactly once as its floor is popped,
//     rather than once per unit cell scanned from both sides inward

function trap(height) {
  const stack = []; // indices, decreasing heights top-to-bottom
  let water = 0;

  for (let i = 0; i < height.length; i++) {
    while (stack.length && height[stack[stack.length - 1]] < height[i]) {
      const floor = stack.pop();
      if (stack.length === 0) break; // no left wall — nothing trapped here
      const left = stack[stack.length - 1];
      const width = i - left - 1;
      const boundedHeight = Math.min(height[i], height[left]) - height[floor];
      water += width * boundedHeight;
    }
    stack.push(i);
  }
  return water;
}

// Demo
if (require.main === module) {
  console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
}

module.exports = { trap };
