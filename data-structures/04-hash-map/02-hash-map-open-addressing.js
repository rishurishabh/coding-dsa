// Structure: one flat array of slots (no buckets) — a colliding key just
// probes forward to the next slot instead of joining a list.
// When:
//   - the same O(1) average lookup as chaining, but with better cache
//     locality (everything lives in one contiguous array) at the cost of
//     more careful deletion bookkeeping
// Why:
//   - linear probing: if a key's home slot is taken, try the next slot,
//     then the next, until an empty one is found — clustering can grow
//     if too many keys land near each other, which is why load factor
//     needs to stay well under 1.0
//   - deletion can't just clear a slot to "empty" — a later key that
//     probed PAST this slot during insertion would become unreachable,
//     since probing stops at the first empty slot it sees. A tombstone
//     (a distinct "deleted, but keep probing past me" marker) fixes this
//     without needing to shift or rehash on every delete

const DELETED = Symbol("deleted");

function HashMapOpenAddressing(initialCapacity = 8) {
  this.capacity = initialCapacity;
  this.keys = new Array(this.capacity).fill(undefined);
  this.values = new Array(this.capacity).fill(undefined);
  this.count = 0; // live entries only, tombstones not counted
}
HashMapOpenAddressing.prototype._hash = function (key) {
  const str = String(key);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % this.capacity;
  }
  return hash;
};
HashMapOpenAddressing.prototype._resize = function () {
  const oldKeys = this.keys;
  const oldValues = this.values;
  this.capacity *= 2;
  this.keys = new Array(this.capacity).fill(undefined);
  this.values = new Array(this.capacity).fill(undefined);
  this.count = 0;
  for (let i = 0; i < oldKeys.length; i++) {
    if (oldKeys[i] !== undefined && oldKeys[i] !== DELETED) {
      this.put(oldKeys[i], oldValues[i]);
    }
  }
};
HashMapOpenAddressing.prototype.put = function (key, val) {
  if (this.count > this.capacity * 0.6) this._resize();
  let i = this._hash(key);
  let firstTombstone = -1;
  while (this.keys[i] !== undefined) {
    if (this.keys[i] === key) {
      this.values[i] = val;
      return;
    }
    if (this.keys[i] === DELETED && firstTombstone === -1) firstTombstone = i;
    i = (i + 1) % this.capacity;
  }
  const slot = firstTombstone !== -1 ? firstTombstone : i;
  this.keys[slot] = key;
  this.values[slot] = val;
  this.count++;
};
HashMapOpenAddressing.prototype._findSlot = function (key) {
  let i = this._hash(key);
  let probes = 0;
  while (this.keys[i] !== undefined && probes < this.capacity) {
    if (this.keys[i] === key) return i;
    i = (i + 1) % this.capacity;
    probes++;
  }
  return -1;
};
HashMapOpenAddressing.prototype.get = function (key) {
  const slot = this._findSlot(key);
  return slot === -1 ? undefined : this.values[slot];
};
HashMapOpenAddressing.prototype.has = function (key) {
  return this._findSlot(key) !== -1;
};
HashMapOpenAddressing.prototype.delete = function (key) {
  const slot = this._findSlot(key);
  if (slot === -1) return false;
  this.keys[slot] = DELETED;
  this.values[slot] = undefined;
  this.count--;
  return true;
};

// Demo
if (require.main === module) {
  const map = new HashMapOpenAddressing(4);
  map.put("apple", 1);
  map.put("banana", 2);
  map.delete("apple");
  map.put("cherry", 3); // may probe past apple's now-tombstoned slot
  console.log(map.get("banana")); // 2
  console.log(map.get("cherry")); // 3
  console.log(map.has("apple")); // false
}

module.exports = { HashMapOpenAddressing };
