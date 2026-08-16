// Pattern: greedy stack construction — the stack isn't answering a query
// about the input, it IS the output being built, one greedy decision at a time.
// When:
//   - remove k digits from a number to make the smallest possible result,
//     keeping the remaining digits in order (LeetCode 402)
// Why:
//   - a smaller digit earlier outweighs any digit after it (100 < 999), so
//     whenever the current digit is smaller than the stack's top AND
//     removals are still available, popping the top is provably an
//     improvement — this is the same "pop while it violates the order"
//     shape as every other variant here, but each pop directly SPENDS one
//     unit of the removal budget instead of just resolving a lookup

function removeKdigits(num, k) {
  const stack = [];

  for (const digit of num) {
    while (k > 0 && stack.length && stack[stack.length - 1] > digit) {
      stack.pop();
      k--;
    }
    stack.push(digit);
  }

  while (k > 0) { // budget left over: the number was already non-decreasing, trim the end
    stack.pop();
    k--;
  }

  const result = stack.join("").replace(/^0+/, ""); // drop leading zeros
  return result.length ? result : "0";
}

// Demo
if (require.main === module) {
  console.log(removeKdigits("1432219", 3)); // "1219"
  console.log(removeKdigits("10200", 1)); // "200"
  console.log(removeKdigits("10", 2)); // "0"
}

module.exports = { removeKdigits };
