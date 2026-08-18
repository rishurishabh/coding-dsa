// Structure: two singly linked lists, each digit a node, LEAST
// significant digit first — added the way long addition works on paper,
// one column at a time, carrying into the next.
// When:
//   - a number too large for a normal integer type is represented as a
//     linked list of digits, and needs to be added to another one
// Why:
//   - storing least-significant-digit first means both lists can be
//     walked left to right in lockstep, exactly matching the order
//     digits are actually summed in grade-school addition
//   - a dummy head (same trick as variant 3) avoids special-casing the
//     first digit of the result
//   - the loop continues as long as EITHER list has digits left, OR
//     there's still a carry to place — a carry can create one final
//     extra digit even after both inputs are exhausted (e.g. 5 + 5 = 10)

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let tail = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    carry = Math.floor(sum / 10);
    tail.next = new ListNode(sum % 10);
    tail = tail.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return dummy.next;
}

function toArray(node) {
  const out = [];
  while (node) {
    out.push(node.val);
    node = node.next;
  }
  return out;
}
function fromArray(arr) {
  const dummy = new ListNode(0);
  let tail = dummy;
  for (const v of arr) {
    tail.next = new ListNode(v);
    tail = tail.next;
  }
  return dummy.next;
}

// Demo
if (require.main === module) {
  const l1 = fromArray([2, 4, 3]); // represents 342
  const l2 = fromArray([5, 6, 4]); // represents 465
  console.log(toArray(addTwoNumbers(l1, l2))); // [7,0,8] -> 807 = 342 + 465
}

module.exports = { ListNode, addTwoNumbers, toArray, fromArray };
