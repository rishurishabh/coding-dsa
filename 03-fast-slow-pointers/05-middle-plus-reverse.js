// Pattern: fast/slow as a building block, composed with another pattern —
// find the middle (this module), reverse the back half (in-place reversal,
// its own pattern), then walk two pointers together to compare (two pointers).
// When:
//   - check whether a linked list reads the same forwards and backwards,
//     in O(1) space, without an array copy (LeetCode 234)
// Why:
//   - fast/slow locates the midpoint in one pass with no length count
//   - reversing only the second half avoids needing random access — a linked
//     list can't be walked backward, so reversal is what makes the back half
//     comparable to the front half at all

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

function reverseList(head) {
  let prev = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

function isPalindrome(head) {
  if (!head || !head.next) return true;

  let slow = head;
  let fast = head;
  while (fast && fast.next) { // slow ends at the upper middle
    slow = slow.next;
    fast = fast.next.next;
  }

  let p2 = reverseList(slow);
  let p1 = head;
  while (p2) { // p2 is shorter or equal length, so it bounds the loop
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
}

// Demo
if (require.main === module) {
  console.log("is palindrome [1,2,3,2,1]:", isPalindrome(arrayToList([1, 2, 3, 2, 1]))); // true
  console.log("is palindrome [1,2,2,1]:", isPalindrome(arrayToList([1, 2, 2, 1]))); // true
  console.log("is palindrome [1,2,3]:", isPalindrome(arrayToList([1, 2, 3]))); // false
}

module.exports = { ListNode, arrayToList, reverseList, isPalindrome };
