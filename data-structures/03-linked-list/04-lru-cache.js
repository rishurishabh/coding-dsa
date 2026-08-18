// Structure: a doubly linked list (variant 2) kept in "most recently
// used" order, PLUS a hash map from key to the exact node holding it —
// the map is what makes get() and put() O(1) instead of O(n).
// When:
//   - a fixed-capacity cache needs O(1) get/put, and eviction always
//     removes whatever was used least recently
// Why:
//   - the hash map gives O(1) access to a node by key — without it,
//     finding a node to move or remove would mean walking the list,
//     O(n)
//   - the doubly linked list gives O(1) removal of an arbitrary node by
//     reference (this is exactly why variant 2 needs prev pointers, not
//     variant 1 — removing via just a "next" pointer would still require
//     walking from the head to find the node BEFORE it)
//   - most-recently-used is always moved to one end (the head, here);
//     least-recently-used naturally ends up at the other end (the tail),
//     ready to evict in O(1) with no search

function DNode(key, val) {
  this.key = key;
  this.val = val;
  this.prev = null;
  this.next = null;
}

function LRUCache(capacity) {
  this.capacity = capacity;
  this.map = new Map(); // key -> DNode
  this.head = null; // most recently used
  this.tail = null; // least recently used
}
LRUCache.prototype._remove = function (node) {
  if (node.prev) node.prev.next = node.next;
  else this.head = node.next;
  if (node.next) node.next.prev = node.prev;
  else this.tail = node.prev;
  node.prev = node.next = null;
};
LRUCache.prototype._insertAtHead = function (node) {
  node.next = this.head;
  if (this.head) this.head.prev = node;
  this.head = node;
  if (!this.tail) this.tail = node;
};
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;
  const node = this.map.get(key);
  this._remove(node);
  this._insertAtHead(node);
  return node.val;
};
LRUCache.prototype.put = function (key, val) {
  if (this.map.has(key)) {
    const node = this.map.get(key);
    node.val = val;
    this._remove(node);
    this._insertAtHead(node);
    return;
  }
  if (this.map.size === this.capacity) {
    this.map.delete(this.tail.key);
    this._remove(this.tail);
  }
  const node = new DNode(key, val);
  this.map.set(key, node);
  this._insertAtHead(node);
};

// Demo
if (require.main === module) {
  const cache = new LRUCache(2);
  cache.put(1, "a");
  cache.put(2, "b");
  console.log(cache.get(1)); // "a" — 1 is now most recently used
  cache.put(3, "c"); // capacity 2 full — evicts 2 (least recently used)
  console.log(cache.get(2)); // -1, evicted
  console.log(cache.get(3)); // "c"
}

module.exports = { LRUCache };
