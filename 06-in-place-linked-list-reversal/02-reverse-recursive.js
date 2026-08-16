// Pattern: recursive relink — the same reversal as variant 1, but the
// rewrite happens on the way BACK UP the call stack instead of on the way down.
// When:
//   - asked for a recursive solution specifically, or the problem composes
//     naturally with recursion (e.g. k-group reversal, variant 4)
// Why:
//   - recursing to the end of the list first, then relinking as each call
//     returns, means "the rest of the list is already reversed" is a true
//     statement by the time any given node does its own relinking — the
//     classic recursive trust: assume it works for a shorter list, use that
//     to solve one node more
//   - trade-off: O(n) call stack space, unlike variant 1's O(1)

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function arrayToList(arr) {
  const dummy = new ListNode(0);
  let tail = dummy;
  for (const v of arr) {
    tail.next = new ListNode(v);
    tail = tail.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const out = [];
  for (let node = head; node; node = node.next) out.push(node.val);
  return out;
}

function reverseListRecursive(head) {
  if (!head || !head.next) return head; // 0 or 1 node: already "reversed"

  const newHead = reverseListRecursive(head.next); // reverse everything after head
  head.next.next = head; // the node right after head now points back to head
  head.next = null; // head becomes the new tail
  return newHead;
}

// Demo
if (require.main === module) {
  console.log(listToArray(reverseListRecursive(arrayToList([1, 2, 3, 4, 5])))); // [5,4,3,2,1]
}

module.exports = { ListNode, arrayToList, listToArray, reverseListRecursive };
