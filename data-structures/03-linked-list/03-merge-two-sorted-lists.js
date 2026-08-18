// Structure: two singly linked lists, each already sorted, merged into
// one sorted list by re-linking existing nodes — no new nodes allocated,
// no array copy, just pointer rewiring.
// When:
//   - two already-sorted linked lists need to become one sorted list
//     (the linked-list analog of the merge step in merge sort)
// Why:
//   - a dummy head node avoids special-casing "is this the first node
//     I've attached yet?" — the real result always starts at dummy.next
//   - at each step only the smaller of the two current heads can
//     possibly be the next smallest value overall, since both lists are
//     already sorted — so one comparison is enough to pick correctly
//   - whichever list still has leftover nodes when the other runs out is
//     already sorted internally, so it can be attached as one final chunk

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function mergeTwoSortedLists(a, b) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (a && b) {
    if (a.val <= b.val) {
      tail.next = a;
      a = a.next;
    } else {
      tail.next = b;
      b = b.next;
    }
    tail = tail.next;
  }
  tail.next = a || b;
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
  const a = fromArray([1, 2, 4]);
  const b = fromArray([1, 3, 4]);
  console.log(toArray(mergeTwoSortedLists(a, b))); // [1,1,2,3,4,4]
}

module.exports = { ListNode, mergeTwoSortedLists, toArray, fromArray };
