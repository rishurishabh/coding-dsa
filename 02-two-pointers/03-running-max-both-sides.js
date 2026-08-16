// Pattern: converging pointers that each carry running state (leftMax/rightMax).
// When:
//   - trapping rain water — water trapped above a bar is bounded by the SHORTER
//     of the tallest wall to its left and the tallest wall to its right
// Why:
//   - whichever side currently has the smaller running max is the side whose
//     trapped-water amount is already fully determined (the other side is
//     guaranteed to have an equal-or-taller wall somewhere further along), so
//     that pointer is safe to resolve and advance — one pass, O(1) extra state

function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}

// Demo
if (require.main === module) {
  console.log("trapped water:", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
}

module.exports = { trap };
