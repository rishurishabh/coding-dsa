// Pattern: converging pointers, greedy "move the smaller side".
// When:
//   - container with most water — area is capped by the shorter wall
// Why:
//   - area(l, r) = (r - l) * min(height[l], height[r]); moving the TALLER wall
//     inward can only shrink or keep the width while the cap stays the same or
//     drops, so it can never beat the current area — moving the shorter wall is
//     the only pointer move that has any chance of finding something better

function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    const width = right - left;
    const cap = Math.min(height[left], height[right]);
    best = Math.max(best, width * cap);

    if (height[left] < height[right]) left++;
    else right--;
  }
  return best;
}

// Demo
if (require.main === module) {
  console.log("max water area:", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
}

module.exports = { maxArea };
