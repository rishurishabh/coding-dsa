// Pattern: non-comparison sort — count how many times each value occurs,
// then read the counts back out in order. No two elements are ever
// compared to each other at all.
// When:
//   - values are integers in a known, reasonably small range (not
//     arbitrary comparable objects) — same "known small range" precondition
//     as 05-cyclic-sort/README.md, applied to counting instead of placement
// Why:
//   - every comparison-based sort has a proven floor of O(n log n) — but
//     that floor only applies when the algorithm's only tool is
//     "compare two elements". Counting sort never compares; it just tallies,
//     which sidesteps the bound entirely
//   - O(n + k) time and O(k) space, where k is the value range — extremely
//     fast when k is small, but wasteful or unusable when k is huge (a
//     range of a billion needs a billion counting slots, whether or not
//     n is small)
//   - STABLE if built with a running prefix sum + placing from the end,
//     as done here — equal elements keep their original relative order

function countingSort(arr) {
  if (arr.length === 0) return [];

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;

  const counts = new Array(range).fill(0);
  for (const val of arr) counts[val - min]++;

  for (let i = 1; i < range; i++) counts[i] += counts[i - 1]; // prefix sum: counts[i] = how many values <= i belong before/at this bucket

  const result = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) { // iterate from the end to keep it stable
    const val = arr[i];
    counts[val - min]--;
    result[counts[val - min]] = val;
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log(countingSort([5, 2, 9, 1, 5, 6])); // [1,2,5,5,6,9]
  console.log(countingSort([4, 2, 2, 8, 3, 3, 1])); // [1,2,2,3,3,4,8]
}

module.exports = { countingSort };
