// Pattern: reverse, skip, repeat — variant 4 reverses every group; this
// alternates between reversing a group and leaving the next one untouched,
// toggling each time.
// When:
//   - reverse the 1st, 3rd, 5th... group of k nodes, leaving the 2nd, 4th...
//     groups exactly as they were (a common interview extension of LeetCode 25)
// Why:
//   - the "skip" phase still has to relink one pointer: the last node of a
//     reversed group must point to the first node of the next skipped group,
//     and the last node of a skipped group must point to the head of the
//     next reversed group — recursion makes this natural, since each call
//     only has to solve "attach my result to whatever the rest resolves to"

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

function skipThenReverse(head, k) {
  let node = head;
  for (let i = 1; i < k && node; i++) node = node.next; // walk to the end of the skip block
  if (node) node.next = reverseAlternatingKGroup(node.next, k);
  return head; // the skip block's own order is untouched
}

function reverseAlternatingKGroup(head, k) {
  if (!head) return null;

  let curr = head;
  let prev = null;
  let count = 0;
  while (curr && count < k) { // reverse up to k nodes (fewer is fine at the tail)
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    count++;
  }

  head.next = curr ? skipThenReverse(curr, k) : curr; // old head is now this block's tail
  return prev; // new head of this reversed block
}

// Demo
if (require.main === module) {
  console.log(listToArray(reverseAlternatingKGroup(arrayToList([1, 2, 3, 4, 5, 6, 7, 8]), 2))); // [2,1,3,4,6,5,7,8]
}

module.exports = { ListNode, arrayToList, listToArray, reverseAlternatingKGroup };
