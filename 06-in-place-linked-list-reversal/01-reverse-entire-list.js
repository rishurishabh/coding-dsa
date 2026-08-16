// Pattern: three-pointer relink — walk the list once, flipping each node's
// `.next` to point backward instead of forward.
// When:
//   - reverse a whole singly linked list, O(1) extra space (LeetCode 206)
// Why:
//   - a linked list can't be walked backward, so "reversing" isn't a read
//     operation like it is on an array — every node's `.next` has to be
//     physically rewritten
//   - `prev` and `curr` walk together one step apart; `next` is saved before
//     the rewrite so the rest of the list isn't lost the moment `curr.next`
//     gets overwritten

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

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next; // save before overwriting
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev; // prev ends on the old tail — the new head
}

// Demo
if (require.main === module) {
  console.log(listToArray(reverseList(arrayToList([1, 2, 3, 4, 5])))); // [5,4,3,2,1]
}

module.exports = { ListNode, arrayToList, listToArray, reverseList };
