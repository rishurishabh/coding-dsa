// Pattern: bound the reversal, then splice it back in — unlike variant 1,
// most of the list must stay untouched, so the piece before and after the
// reversed segment both need to reconnect correctly afterward.
// When:
//   - reverse only the nodes between position `left` and `right`, 1-indexed
//     (LeetCode 92)
// Why:
//   - a dummy node before `head` means "the sublist starts at position 1"
//     needs no special case
//   - repeatedly moving the node right after the sublist's first node to the
//     FRONT of the sublist ("head insertion") reverses it in place using
//     only the one `prev` pointer marking where the sublist begins — no
//     separate save/restore of the boundary nodes needed

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

function reverseBetween(head, left, right) {
  const dummy = new ListNode(0, head);
  let prev = dummy;
  for (let i = 0; i < left - 1; i++) prev = prev.next; // node just before the sublist

  const curr = prev.next; // will end up as the sublist's tail
  for (let i = 0; i < right - left; i++) {
    const moved = curr.next;
    curr.next = moved.next;
    moved.next = prev.next;
    prev.next = moved; // moved node becomes the new front of the sublist
  }
  return dummy.next;
}

// Demo
if (require.main === module) {
  console.log(listToArray(reverseBetween(arrayToList([1, 2, 3, 4, 5]), 2, 4))); // [1,4,3,2,5]
}

module.exports = { ListNode, arrayToList, listToArray, reverseBetween };
