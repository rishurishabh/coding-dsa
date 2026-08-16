// Pattern: independent pointers, one per array, each walking its own sequence.
// When:
//   - merge two sorted arrays/lists into one sorted result
//   - check whether one string is a subsequence of another
// Why:
//   - unlike files 01-03, these pointers don't share one array's two ends —
//     each advances independently through its own source; the smaller of the
//     two current elements is always safe to emit next, giving O(n+m) merges

function mergeSorted(a, b) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  while (i < a.length) result.push(a[i++]);
  while (j < b.length) result.push(b[j++]);
  return result;
}

function isSubsequence(s, t) {
  let i = 0; // pointer into s (the candidate subsequence)
  for (let j = 0; j < t.length && i < s.length; j++) {
    if (s[i] === t[j]) i++;
  }
  return i === s.length;
}

// Demo
if (require.main === module) {
  console.log("merged:", mergeSorted([1, 3, 5], [2, 4, 6])); // [1,2,3,4,5,6]
  console.log("is subsequence:", isSubsequence("abc", "ahbgdc")); // true
  console.log("is subsequence:", isSubsequence("axc", "ahbgdc")); // false
}

module.exports = { mergeSorted, isSubsequence };
