// Pattern: fast/slow with a termination condition instead of a meeting point —
// no cycle involved, fast simply runs out of list first.
// When:
//   - find the middle node of a linked list in one pass, no length count needed
// Why:
//   - fast covers 2 nodes for every 1 slow covers, so when fast reaches the
//     end, slow has covered exactly half the distance — where fast STARTS
//     decides which middle you land on for even-length lists

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

// even-length lists land on the SECOND of the two middle nodes
function findMiddleUpper(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

// even-length lists land on the FIRST of the two middle nodes:
// starting fast one node ahead shifts which node slow ends on
function findMiddleLower(head) {
  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

// Demo
if (require.main === module) {
  const odd = arrayToList([1, 2, 3, 4, 5]);
  console.log("middle of odd-length list:", findMiddleUpper(odd).val); // 3

  const even = arrayToList([1, 2, 3, 4, 5, 6]);
  console.log("upper middle of even-length list:", findMiddleUpper(even).val); // 4
  console.log("lower middle of even-length list:", findMiddleLower(even).val); // 3
}

module.exports = { ListNode, arrayToList, findMiddleUpper, findMiddleLower };
