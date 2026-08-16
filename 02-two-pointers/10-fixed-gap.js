// Pattern: fixed-gap two pointers — the distance between them is set up front
// and stays constant; once both are moving, they advance together.
// When:
//   - remove the Nth node from the end of a linked list in one pass
// Why:
//   - unlike read/write (file 04), the gap here isn't data-driven — it's fixed
//     at n before the walk even starts. When the lead pointer reaches the end,
//     the trailing pointer is provably exactly n nodes behind it, with no need
//     to know the list's length ahead of time

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

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let lead = dummy;
  let trail = dummy;

  for (let i = 0; i < n; i++) lead = lead.next; // open the gap: n nodes ahead

  while (lead.next) { // walk both until lead falls off the end
    lead = lead.next;
    trail = trail.next;
  }
  trail.next = trail.next.next; // trail is now exactly before the target node
  return dummy.next;
}

// Demo
if (require.main === module) {
  const list = arrayToList([1, 2, 3, 4, 5]);
  const result = removeNthFromEnd(list, 2);
  console.log("after removing 2nd from end:", listToArray(result)); // [1,2,3,5]
}

module.exports = { ListNode, arrayToList, listToArray, removeNthFromEnd };
