// Pattern: cycle detection on a VIRTUAL linked list — there's no `.next`
// pointer anywhere; "next" is whatever a function/rule computes from the
// current value, but Floyd's algorithm doesn't care that the list is real.
// When:
//   - does repeatedly summing the squares of a number's digits reach 1, or
//     loop forever? (Happy Number, LeetCode 202)
//   - an array of n+1 values in [1,n] must contain a duplicate by pigeonhole
//     — find it without extra space or mutating the array (LeetCode 287)
// Why:
//   - any deterministic "what comes next" rule defines an implicit linked
//     list (value -> next value); if that rule ever revisits a value, walking
//     it forms a cycle, and Floyd's tortoise/hare finds it in O(1) space
//   - for the duplicate-number case, nums[i] IS the "next pointer" — treating
//     indices as nodes turns the array into exactly that kind of list, and
//     the pigeonhole guarantee (n+1 values, range [1,n]) is what forces a cycle to exist

function sumOfSquaredDigits(n) {
  let sum = 0;
  while (n > 0) {
    const d = n % 10;
    sum += d * d;
    n = Math.floor(n / 10);
  }
  return sum;
}

function isHappy(n) {
  let slow = n;
  let fast = sumOfSquaredDigits(n);
  while (fast !== 1 && slow !== fast) {
    slow = sumOfSquaredDigits(slow);
    fast = sumOfSquaredDigits(sumOfSquaredDigits(fast));
  }
  return fast === 1;
}

function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}

// Demo
if (require.main === module) {
  console.log("is 19 happy:", isHappy(19)); // true
  console.log("is 2 happy:", isHappy(2)); // false (loops)
  console.log("duplicate in [1,3,4,2,2]:", findDuplicate([1, 3, 4, 2, 2])); // 2
}

module.exports = { sumOfSquaredDigits, isHappy, findDuplicate };
