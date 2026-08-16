// Pattern: Floyd's tortoise and hare — two pointers on the SAME list, moving
// at different speeds (1 step vs 2 steps), not from different ends.
// When:
//   - does a linked list have a cycle? (LeetCode 141)
//   - if so, which node does the cycle start at? (LeetCode 142)
// Why:
//   - if a cycle exists, the gap between slow and fast shrinks by 1 every step
//     once both are inside the cycle, so they're guaranteed to meet — no
//     extra memory needed to track visited nodes
//   - after they meet, resetting one pointer to head and moving both one step
//     at a time makes them meet again exactly at the cycle's start node; this
//     falls out of the meeting-point distance algebra (proof in problems.md)

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

// pos = index the tail connects back to, or -1 for no cycle
function buildCyclicList(arr, pos = -1) {
  const nodes = arr.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0) nodes[nodes.length - 1].next = nodes[pos];
  return nodes[0] || null;
}

function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

function detectCycleStart(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }
  return null;
}

// Demo
if (require.main === module) {
  const withCycle = buildCyclicList([3, 2, 0, -4], 1);
  console.log("has cycle:", hasCycle(withCycle)); // true
  console.log("cycle starts at value:", detectCycleStart(withCycle).val); // 2

  const noCycle = buildCyclicList([1, 2, 3]);
  console.log("has cycle:", hasCycle(noCycle)); // false
}

module.exports = { ListNode, buildCyclicList, hasCycle, detectCycleStart };
