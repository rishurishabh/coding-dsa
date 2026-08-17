// Application: matching nested structure — a stack of "still open"
// brackets is the natural fit, because the most recently opened bracket
// must always be the next one closed.
// When:
//   - determine whether a string of brackets is validly nested/matched
//     (LeetCode 20)
// Why:
//   - every closing bracket must match the MOST RECENTLY opened one still
//     unmatched — that's exactly LIFO order, so pushing on every open and
//     popping on every close (checking the popped value matches) is a
//     direct translation of the rule into code
//   - a leftover, non-empty stack at the end means something was opened
//     but never closed; popping from an empty stack means something was
//     closed that was never opened — both are validity failures

function isValid(s) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0; // nothing left unmatched
}

// Demo
if (require.main === module) {
  console.log(isValid("()[]{}")); // true
  console.log(isValid("(]")); // false
  console.log(isValid("([)]")); // false — wrong order
  console.log(isValid("{[]}")); // true
}

module.exports = { isValid };
