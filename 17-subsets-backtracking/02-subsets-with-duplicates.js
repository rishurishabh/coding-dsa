// Pattern: variant 1 + a same-level duplicate skip — sorting first groups
// equal values together, so "have I already tried this value at this
// exact branching point" becomes a simple adjacent check.
// When:
//   - generate every UNIQUE subset when the input has duplicate values
//     (LeetCode 90)
// Why:
//   - without a guard, [2a, 2b] (two different 2's) and [2b, 2a] would
//     both fire the same recursive branch and produce the identical
//     subset [2,2] twice — sorting first means duplicates sit adjacent,
//     so skipping `nums[i] === nums[i-1]` UNLESS this is the first choice
//     at this level (`i === start`) prunes the redundant branch itself,
//     not the duplicate output after the fact

function subsetsWithDup(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = [];
  const path = [];

  function backtrack(start) {
    result.push([...path]);

    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) continue; // same value already tried at this level
      path.push(sorted[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

// Demo
if (require.main === module) {
  console.log(subsetsWithDup([1, 2, 2]));
  // [[],[1],[1,2],[1,2,2],[2],[2,2]]
}

module.exports = { subsetsWithDup };
