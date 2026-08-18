// Structure: like variant 1, but each node also holds a pointer BACK to
// the previous node — the list can be walked in either direction, and a
// node can remove ITSELF without anyone having to walk to find it first.
// When:
//   - a node reference is already in hand and needs O(1) removal, or
//     backward traversal is needed — the exact shape an LRU cache needs
//     (see variant 4), since it removes arbitrary nodes by reference
// Why:
//   - deleting a node given only a pointer to it is O(1) here: splice out
//     via node.prev.next = node.next and node.next.prev = node.prev — a
//     singly linked list can't do this without also having the PREVIOUS
//     node, which normally means walking from the head to find it, O(n)
//   - the cost is one extra pointer per node, and every insert/delete
//     has to keep both directions consistent, not just one

function DNode(val) {
  this.val = val;
  this.prev = null;
  this.next = null;
}
function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.count = 0;
}
DoublyLinkedList.prototype.insertAtHead = function (val) {
  const node = new DNode(val);
  node.next = this.head;
  if (this.head) this.head.prev = node;
  this.head = node;
  if (!this.tail) this.tail = node;
  this.count++;
  return node;
};
DoublyLinkedList.prototype.insertAtTail = function (val) {
  const node = new DNode(val);
  node.prev = this.tail;
  if (this.tail) this.tail.next = node;
  this.tail = node;
  if (!this.head) this.head = node;
  this.count++;
  return node;
};
DoublyLinkedList.prototype.removeNode = function (node) {
  if (node.prev) node.prev.next = node.next;
  else this.head = node.next;
  if (node.next) node.next.prev = node.prev;
  else this.tail = node.prev;
  node.prev = node.next = null;
  this.count--;
};
DoublyLinkedList.prototype.toArray = function () {
  const out = [];
  let cur = this.head;
  while (cur) {
    out.push(cur.val);
    cur = cur.next;
  }
  return out;
};
DoublyLinkedList.prototype.toArrayBackward = function () {
  const out = [];
  let cur = this.tail;
  while (cur) {
    out.push(cur.val);
    cur = cur.prev;
  }
  return out;
};

// Demo
if (require.main === module) {
  const list = new DoublyLinkedList();
  list.insertAtTail(1);
  const two = list.insertAtTail(2);
  list.insertAtTail(3);
  console.log(list.toArray()); // [1, 2, 3]
  list.removeNode(two); // O(1), no search needed — the reference is already in hand
  console.log(list.toArray()); // [1, 3]
  console.log(list.toArrayBackward()); // [3, 1]
}

module.exports = { DNode, DoublyLinkedList };
