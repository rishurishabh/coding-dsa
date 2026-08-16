// Pattern: cycle length via the meeting point, then reuse the FIXED-GAP
// technique from 02-two-pointers/10-fixed-gap.js to relocate the cycle start.
// When:
//   - you need the cycle's length, not just whether one exists
//   - as an alternative to file 01's reset-to-head trick for finding the
//     cycle's start node
// Why:
//   - once slow/fast meet inside the cycle, walking either pointer forward
//     until it returns to that same node counts exactly one full lap — no
//     separate bookkeeping needed, the meeting node IS the lap marker
//   - with the length L known, moving a lead pointer L steps ahead of a
//     trail pointer and then advancing both together (file 10's fixed-gap
//     idea) also lands both pointers on the cycle start — a second, independent
//     proof of the same fact file 01 finds via the reset-and-meet-again trick

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function buildCyclicList(arr, pos = -1) {
  const nodes = arr.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0) nodes[nodes.length - 1].next = nodes[pos];
  return nodes[0] || null;
}

function findMeetingNode(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return slow;
  }
  return null;
}

function cycleLength(meetingNode) {
  if (!meetingNode) return 0;
  let length = 1;
  for (let ptr = meetingNode.next; ptr !== meetingNode; ptr = ptr.next) length++;
  return length;
}

function detectCycleStartViaGap(head) {
  const meetingNode = findMeetingNode(head);
  if (!meetingNode) return null;

  const length = cycleLength(meetingNode);
  let lead = head;
  for (let i = 0; i < length; i++) lead = lead.next; // open a fixed gap of `length`

  let trail = head;
  while (lead !== trail) { // same rule as 02-two-pointers/10-fixed-gap.js
    lead = lead.next;
    trail = trail.next;
  }
  return trail;
}

// Demo
if (require.main === module) {
  const list = buildCyclicList([3, 2, 0, -4], 1);
  const meeting = findMeetingNode(list);
  console.log("cycle length:", cycleLength(meeting)); // 3
  console.log("cycle start via fixed-gap:", detectCycleStartViaGap(list).val); // 2
}

module.exports = { ListNode, buildCyclicList, findMeetingNode, cycleLength, detectCycleStartViaGap };
