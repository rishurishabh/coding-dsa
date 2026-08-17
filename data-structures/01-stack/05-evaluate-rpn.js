// Application: operands wait on a stack until their operator arrives — RPN
// (postfix notation) is defined so that every operator applies to
// whatever was computed MOST RECENTLY, which is LIFO order again.
// When:
//   - evaluate an arithmetic expression written in Reverse Polish
//     Notation, e.g. ["2","1","+","3","*"] means (2 + 1) * 3 (LeetCode 150)
// Why:
//   - postfix notation removes the need for parentheses or operator
//     precedence rules entirely — an operator always combines the two
//     values closest to it that haven't been consumed yet, which are
//     exactly the top two values on a stack
//   - push numbers as they arrive; on an operator, pop twice (second-popped
//     is the LEFT operand, first-popped is the RIGHT — order matters for
//     subtraction and division), compute, push the result back

function evalRPN(tokens) {
  const stack = [];
  const ops = new Set(["+", "-", "*", "/"]);

  for (const token of tokens) {
    if (ops.has(token)) {
      const right = stack.pop();
      const left = stack.pop();
      let result;
      if (token === "+") result = left + right;
      else if (token === "-") result = left - right;
      else if (token === "*") result = left * right;
      else result = Math.trunc(left / right); // truncate toward zero, per RPN spec
      stack.push(result);
    } else {
      stack.push(Number(token));
    }
  }
  return stack.pop();
}

// Demo
if (require.main === module) {
  console.log(evalRPN(["2", "1", "+", "3", "*"])); // 9  — (2+1)*3
  console.log(evalRPN(["4", "13", "5", "/", "+"])); // 6  — 4 + (13/5)
}

module.exports = { evalRPN };
