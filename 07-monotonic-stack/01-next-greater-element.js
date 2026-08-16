// Pattern: decreasing stack, resolve on POP — push indices while the stack
// stays decreasing top-to-bottom; when a bigger element arrives, it's the
// answer for everything it just popped.
// When:
//   - for every element, find the next element to its RIGHT that's bigger
//     (LeetCode 739, "Daily Temperatures")
// Why:
//   - a naive O(n²) scan checks every element against every later one; the
//     stack instead holds only "elements still waiting for their answer" —
//     each index is pushed once and popped at most once, so it's O(n) total
//   - the answer for a popped element isn't known until something bigger
//     shows up LATER — that's why this reads right, unlike variant 2

function dailyTemperatures(temps) {
  const answer = new Array(temps.length).fill(0);
  const stack = []; // indices, decreasing temps top-to-bottom

  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[stack[stack.length - 1]] < temps[i]) {
      const idx = stack.pop();
      answer[idx] = i - idx; // days until a warmer temperature
    }
    stack.push(i);
  }
  return answer; // indices left on the stack never found a warmer day: stays 0
}

// Demo
if (require.main === module) {
  console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1,1,4,2,1,1,0,0]
}

module.exports = { dailyTemperatures };
