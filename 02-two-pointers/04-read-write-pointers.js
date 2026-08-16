// Pattern: same-direction read/write pointers — one scans ahead, one marks the
// next slot to overwrite.
// When:
//   - remove duplicates from a sorted array in place
//   - move all zeroes to the end in place, preserving order
// Why:
//   - `write` only advances when the element at `read` is confirmed to belong
//     in the result, so the array is compacted in a single O(n) pass with O(1)
//     extra space — no second array, no shifting

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let write = 1;
  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[write - 1]) {
      nums[write] = nums[read];
      write++;
    }
  }
  return write; // new length; nums[0..write) holds the deduped values
}

function moveZeroes(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      [nums[write], nums[read]] = [nums[read], nums[write]];
      write++;
    }
  }
  return nums;
}

// Demo
if (require.main === module) {
  const sorted = [1, 1, 2, 2, 2, 3];
  const len = removeDuplicates(sorted);
  console.log("deduped length:", len, "→", sorted.slice(0, len)); // 3 -> [1,2,3]

  console.log("zeroes moved:", moveZeroes([0, 1, 0, 3, 12])); // [1,3,12,0,0]
}

module.exports = { removeDuplicates, moveZeroes };
