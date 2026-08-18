// Structure: a chain of nodes, each holding a value and a pointer to the
// NEXT node only — the list itself is just a reference to the first one.
// When:
//   - insertion/removal at the front needs to be O(1) and random access
//     by index is not needed (unlike an array, no index arithmetic works
//     here — reaching node i always means walking i steps from the head)
// Why:
//   - inserting/removing at the head only ever touches one pointer,
//     regardless of how long the list is — O(1), where an array's
//     unshift/shift is O(n) because everything else has to slide
//   - the cost is paid on the other end: reaching the TAIL, or any
//     specific index, requires walking node by node — O(n), since there's
//     no random-access shortcut the way array indexing has

function Node(val) {
  this.val = val;
  this.next = null;
}
function SinglyLinkedList() {
  this.head = null;
  this.count = 0;
}
SinglyLinkedList.prototype.insertAtHead = function (val) {
  const node = new Node(val);
  node.next = this.head;
  this.head = node;
  this.count++;
};
SinglyLinkedList.prototype.insertAtTail = function (val) {
  const node = new Node(val);
  if (!this.head) {
    this.head = node;
  } else {
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }
  this.count++;
};
SinglyLinkedList.prototype.deleteValue = function (val) {
  if (!this.head) return false;
  if (this.head.val === val) {
    this.head = this.head.next;
    this.count--;
    return true;
  }
  let cur = this.head;
  while (cur.next && cur.next.val !== val) cur = cur.next;
  if (!cur.next) return false;
  cur.next = cur.next.next;
  this.count--;
  return true;
};
SinglyLinkedList.prototype.find = function (val) {
  let cur = this.head;
  while (cur) {
    if (cur.val === val) return cur;
    cur = cur.next;
  }
  return null;
};
SinglyLinkedList.prototype.toArray = function () {
  const out = [];
  let cur = this.head;
  while (cur) {
    out.push(cur.val);
    cur = cur.next;
  }
  return out;
};

// Demo
if (require.main === module) {
  const list = new SinglyLinkedList();
  list.insertAtTail(1);
  list.insertAtTail(2);
  list.insertAtHead(0);
  console.log(list.toArray()); // [0, 1, 2]
  list.deleteValue(1);
  console.log(list.toArray()); // [0, 2]
  console.log(list.find(2).val); // 2
}

module.exports = { Node, SinglyLinkedList };
