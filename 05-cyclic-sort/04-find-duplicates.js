// Pattern: place, then collect mismatches from the OTHER side — variant 3
// reads a mismatch as "this index's rightful value went missing"; this reads
// the exact same mismatch as "this index is occupied by an intruder that
// duplicates the value already sitting at its own home".
// When:
//   - array of size n holds values in [1, n], each appearing once or twice —
//     find the one duplicate (LeetCode 287-style, via a different technique
//     than 03-fast-slow-pointers/03-cycle-in-implicit-sequence.js's Floyd's
//     approach) or all of the duplicates (LeetCode 442)
// Why:
//   - the placement loop naturally stalls on a duplicate: swapping never
//     progresses once two equal values both want the same home index, so
//     the mismatch left behind after placement finishes IS the duplicate

function findAllDuplicates(nums) {
  const arr = [...nums];
  let i = 0;
  while (i < arr.length) {
    const correctIndex = arr[i] - 1;
    if (arr[i] !== arr[correctIndex]) {
      [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]];
    } else {
      i++;
    }
  }

  const duplicates = [];
  for (let idx = 0; idx < arr.length; idx++) {
    if (arr[idx] !== idx + 1) duplicates.push(arr[idx]);
  }
  return duplicates;
}

function findDuplicate(nums) {
  const found = findAllDuplicates(nums);
  return found.length > 0 ? found[0] : -1;
}

// Demo
if (require.main === module) {
  console.log(findAllDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); // [3,2] (order not guaranteed)
  console.log(findDuplicate([1, 3, 4, 2, 2])); // 2
}

module.exports = { findAllDuplicates, findDuplicate };
