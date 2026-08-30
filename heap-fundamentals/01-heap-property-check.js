// The "heap property" is the ONE rule that makes an array a heap at all:
// every parent must be >= both its children (max-heap), or <= both its
// children (min-heap). Nothing about sorting the whole array — just that
// one local rule, true at every parent/child relationship.
//
// A heap is usually stored as a plain array, using index math instead of
// pointers to find parent/child:
//   parent of i  = (i - 1) >> 1
//   left child   = 2*i + 1
//   right child  = 2*i + 2

function parentIndex(i) {
  return (i - 1) >> 1;
}
function leftChildIndex(i) {
  return 2 * i + 1;
}
function rightChildIndex(i) {
  return 2 * i + 2;
}

function isMaxHeap(arr) {
  for (let i = 0; i < arr.length; i++) {
    const left = leftChildIndex(i);
    const right = rightChildIndex(i);
    if (left < arr.length && arr[i] < arr[left]) return false; // parent must be >= child
    if (right < arr.length && arr[i] < arr[right]) return false;
  }
  return true;
}

function isMinHeap(arr) {
  for (let i = 0; i < arr.length; i++) {
    const left = leftChildIndex(i);
    const right = rightChildIndex(i);
    if (left < arr.length && arr[i] > arr[left]) return false; // parent must be <= child
    if (right < arr.length && arr[i] > arr[right]) return false;
  }
  return true;
}

module.exports = { isMaxHeap, isMinHeap, parentIndex, leftChildIndex, rightChildIndex };

if (require.main === module) {
  const maxHeapArr = [9, 5, 6, 1, 4, 2]; // root (9) is the LARGEST
  const minHeapArr = [1, 3, 2, 8, 4, 9]; // root (1) is the SMALLEST
  const notAHeap = [3, 9, 1, 5, 2, 6]; // 3's child 9 is bigger — breaks max, and 3>1 breaks min

  console.log("maxHeapArr", maxHeapArr, "isMaxHeap:", isMaxHeap(maxHeapArr)); // true
  console.log("minHeapArr", minHeapArr, "isMinHeap:", isMinHeap(minHeapArr)); // true
  console.log("notAHeap  ", notAHeap, "isMaxHeap:", isMaxHeap(notAHeap), "isMinHeap:", isMinHeap(notAHeap)); // false false

  // The root (index 0) is always the extreme value — that's WHY heaps
  // exist: "give me the max/min right now" is an O(1) look at index 0,
  // no scanning required.
  console.log("max-heap root (the max):", maxHeapArr[0]); // 9
  console.log("min-heap root (the min):", minHeapArr[0]); // 1
}
