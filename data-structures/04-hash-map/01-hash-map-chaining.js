// Structure: an array of buckets, where a hash function decides which
// bucket a key belongs to, and each bucket holds a small list of
// [key, value] pairs — colliding keys just live in the same bucket.
// When:
//   - O(1) average-case get/put/delete by key, without needing keys to
//     be sortable or numeric
// Why:
//   - the hash function converts a key into a bucket index — average
//     case O(1) relies on keys spreading roughly evenly across buckets,
//     which is why a decent hash function matters
//   - collisions (two keys landing in the same bucket) are resolved by
//     just appending to that bucket's list — put/get degrade to a short
//     linear scan WITHIN one bucket, not across the whole table
//   - resizing (growing the bucket array and rehashing everything) keeps
//     the average bucket length small as more keys are added — without
//     it, every bucket would eventually become one long list, and
//     lookups would degrade toward O(n)

function HashMapChaining(initialCapacity = 8) {
  this.buckets = new Array(initialCapacity).fill(null).map(() => []);
  this.count = 0;
}
HashMapChaining.prototype._hash = function (key) {
  const str = String(key);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % this.buckets.length;
  }
  return hash;
};
HashMapChaining.prototype._resize = function () {
  const old = this.buckets;
  this.buckets = new Array(old.length * 2).fill(null).map(() => []);
  this.count = 0;
  for (const bucket of old) {
    for (const [k, v] of bucket) this.put(k, v);
  }
};
HashMapChaining.prototype.put = function (key, val) {
  const bucket = this.buckets[this._hash(key)];
  const existing = bucket.find((pair) => pair[0] === key);
  if (existing) {
    existing[1] = val;
    return;
  }
  bucket.push([key, val]);
  this.count++;
  if (this.count > this.buckets.length * 0.75) this._resize();
};
HashMapChaining.prototype.get = function (key) {
  const bucket = this.buckets[this._hash(key)];
  const pair = bucket.find((p) => p[0] === key);
  return pair ? pair[1] : undefined;
};
HashMapChaining.prototype.has = function (key) {
  return this.buckets[this._hash(key)].some((pair) => pair[0] === key);
};
HashMapChaining.prototype.delete = function (key) {
  const bucket = this.buckets[this._hash(key)];
  const idx = bucket.findIndex((pair) => pair[0] === key);
  if (idx === -1) return false;
  bucket.splice(idx, 1);
  this.count--;
  return true;
};

// Demo
if (require.main === module) {
  const map = new HashMapChaining(4);
  map.put("apple", 1);
  map.put("banana", 2);
  map.put("apple", 10); // overwrite
  console.log(map.get("apple")); // 10
  console.log(map.has("banana")); // true
  map.delete("banana");
  console.log(map.has("banana")); // false
}

module.exports = { HashMapChaining };
