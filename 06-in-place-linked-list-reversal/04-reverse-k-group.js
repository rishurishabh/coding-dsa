// Pattern: bounded reversal, repeated — the same head-insertion technique as
// variant 3, applied to consecutive fixed-size groups instead of one range.
// When:
//   - reverse every group of k nodes; a trailing group shorter than k stays
//     as-is (LeetCode 25)
// Why:
//   - checking a full k nodes exist BEFORE reversing is what makes the
//     "leave a short trailing group alone" rule correct — reversing then
//     checking would already have scrambled a group that shouldn't move
//   - `groupPrev` tracks where the previous (already-reversed) group ended,
//     so each new group splices onto the correct node regardless of how
//     many groups came before it

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

function hasKNodes(node, k) {
  let count = 0;
  while (node && count < k) {
    node = node.next;
    count++;
  }
  return count === k;
}

function reverseKGroup(head, k) {
  const dummy = new ListNode(0, head);
  let groupPrev = dummy;

  while (hasKNodes(groupPrev.next, k)) {
    const curr = groupPrev.next; // becomes this group's tail once reversed
    for (let i = 0; i < k - 1; i++) {
      const moved = curr.next;
      curr.next = moved.next;
      moved.next = groupPrev.next;
      groupPrev.next = moved;
    }
    groupPrev = curr; // curr is now the last (reversed) node of this group
  }
  return dummy.next;
}

// Demo
if (require.main === module) {
  console.log(listToArray(reverseKGroup(arrayToList([1, 2, 3, 4, 5]), 2))); // [2,1,4,3,5]
  console.log(listToArray(reverseKGroup(arrayToList([1, 2, 3, 4, 5]), 3))); // [3,2,1,4,5]
}

module.exports = { ListNode, arrayToList, listToArray, reverseKGroup };
