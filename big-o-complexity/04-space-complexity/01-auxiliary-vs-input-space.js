// Space complexity asks the SAME question as time complexity — "how does
// this grow as n grows?" — but about MEMORY instead of steps. The
// specific thing we usually mean by "space complexity" in interviews is
// AUXILIARY space: memory the function allocates ON TOP OF its input,
// not counting the input itself (the input has to exist either way).
//
// Two functions doing the "same job" can have wildly different space
// complexity depending on whether they reuse the input's memory or
// allocate a fresh copy.

function reverseInPlace(arr) {
  // O(1) auxiliary space — only a couple of extra variables (left,
  // right, temp), regardless of how big arr is. The array itself is
  // mutated, not copied.
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}

function reverseWithCopy(arr) {
  // O(n) auxiliary space — a brand new array, the same size as the
  // input, gets allocated. Same OUTPUT as reverseInPlace, very
  // different space cost.
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

module.exports = { reverseInPlace, reverseWithCopy };

if (require.main === module) {
  const original = [1, 2, 3, 4, 5];
  console.log("reverseInPlace  :", reverseInPlace([...original])); // [5,4,3,2,1] — O(1) extra space
  console.log("reverseWithCopy :", reverseWithCopy(original)); // [5,4,3,2,1] — O(n) extra space

  console.log("\nSame result, same time complexity (O(n), both touch every");
  console.log("element once) — but DIFFERENT space complexity. Time and");
  console.log("space are independent axes; a function's Big-O time doesn't");
  console.log("tell you anything about its Big-O space, and vice versa.");
}
