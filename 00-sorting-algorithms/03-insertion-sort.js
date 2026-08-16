// Pattern: grow a sorted prefix, one insertion at a time — everything to
// the left of the current index is already sorted; shift the current
// element backward until it finds its place among them.
// When:
//   - data is nearly sorted already, or arrives one element at a time
//     (each new element just gets inserted into the sorted prefix so far)
// Why:
//   - unlike bubble/selection sort, insertion sort's cost is proportional
//     to how UNSORTED the input actually is: O(n) best case (already
//     sorted — inner loop never runs), O(n²) worst case (reverse sorted)
//   - O(1) space, STABLE (an element only shifts past strictly greater
//     ones, so equal elements keep their relative order)

function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const current = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > current) {
      a[j + 1] = a[j]; // shift the bigger element right
      j--;
    }
    a[j + 1] = current; // insert into the gap just opened
  }
  return a;
}

// Demo
if (require.main === module) {
  console.log(insertionSort([5, 2, 9, 1, 5, 6])); // [1,2,5,5,6,9]
}

module.exports = { insertionSort };
