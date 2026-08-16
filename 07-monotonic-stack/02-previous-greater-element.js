// Pattern: decreasing stack, resolve IMMEDIATELY — same stack shape as
// variant 1, but the question points the other direction, so the answer for
// index i is knowable the moment i is processed, not later.
// When:
//   - for every element, find the nearest element to its LEFT that's bigger
// Why:
//   - popping everything <= the current element first clears away anything
//     that could never be anyone's "previous greater" again (blocked by the
//     current, bigger element being nearer) — whatever survives on top IS
//     the answer for the current index, right now
//   - this immediate-resolution shape is what variant 4 (histogram) leans on
//     for finding each bar's nearest shorter neighbor on one side

function previousGreaterElements(nums) {
  const answer = new Array(nums.length).fill(-1);
  const stack = []; // values, decreasing top-to-bottom

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && stack[stack.length - 1] <= nums[i]) {
      stack.pop(); // can never be a "previous greater" for anything from here on
    }
    if (stack.length) answer[i] = stack[stack.length - 1];
    stack.push(nums[i]);
  }
  return answer;
}

// Demo
if (require.main === module) {
  console.log(previousGreaterElements([4, 10, 5, 3, 8, 9])); // [-1,-1,10,5,10,10]
}

module.exports = { previousGreaterElements };
