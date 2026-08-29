// Pattern: Fenwick Tree for order statistics (counting, not summing)
// When: you need "how many elements seen so far are less than X" repeated
//       for every element — a frequency-table BIT answers that in
//       O(log n), where a brute-force scan per element costs O(n).
// Why it works: coordinate-compress the values to ranks 1..m, then walk the
//       array right to left. At each element, query the BIT for the count
//       of ranks strictly less than this element's rank — that's exactly
//       the count of elements to its right that are smaller and have
//       already been inserted — then insert this element's own rank. The
//       BIT here counts frequencies, not sums; same structure, different
//       meaning of "add" and "prefix".
//
// LC315: Count of Smaller Numbers After Self — for each nums[i], count how
// many elements to its right are smaller than it.

function countSmaller(nums) {
  const sortedUnique = [...new Set(nums)].sort((a, b) => a - b);
  const rank = new Map();
  sortedUnique.forEach((v, i) => rank.set(v, i + 1)); // 1-indexed ranks

  const m = sortedUnique.length;
  const tree = new Array(m + 1).fill(0);

  const update = (i) => {
    for (; i <= m; i += i & -i) tree[i]++;
  };
  const query = (i) => {
    let count = 0;
    for (; i > 0; i -= i & -i) count += tree[i];
    return count;
  };

  const result = new Array(nums.length).fill(0);
  for (let i = nums.length - 1; i >= 0; i--) {
    const r = rank.get(nums[i]);
    result[i] = query(r - 1); // how many smaller ranks already inserted
    update(r);
  }

  return result;
}

module.exports = { countSmaller };

if (require.main === module) {
  console.log(countSmaller([5, 2, 6, 1])); // [2, 1, 1, 0]
  console.log(countSmaller([-1, -1])); // [0, 0]
}
