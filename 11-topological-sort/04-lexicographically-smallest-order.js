// Pattern: Kahn's algorithm with a min-heap instead of a plain queue — when
// MULTIPLE nodes are simultaneously safe to output, which one gets picked
// first is otherwise arbitrary (whatever a plain array happened to insert first).
// When:
//   - among all valid topological orders, find the lexicographically
//     smallest one
// Why:
//   - a plain queue's order among "currently available" nodes depends on
//     insertion order, not value — swapping it for a min-heap means every
//     time there's a choice, the smallest available option is always the
//     one taken, which is exactly what "lexicographically smallest" requires

function MinHeap() {
  this.data = [];
}
MinHeap.prototype.push = function (val) {
  this.data.push(val);
  let i = this.data.length - 1;
  while (i > 0) {
    const parent = (i - 1) >> 1;
    if (this.data[parent] <= this.data[i]) break;
    [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
    i = parent;
  }
};
MinHeap.prototype.pop = function () {
  const top = this.data[0];
  const last = this.data.pop();
  if (this.data.length > 0) {
    this.data[0] = last;
    let i = 0;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < this.data.length && this.data[left] < this.data[smallest]) smallest = left;
      if (right < this.data.length && this.data[right] < this.data[smallest]) smallest = right;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
  return top;
};

function smallestTopologicalOrder(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);
  for (const [from, to] of edges) {
    adj[from].push(to);
    indegree[to]++;
  }

  const heap = new MinHeap();
  for (let node = 0; node < n; node++) {
    if (indegree[node] === 0) heap.push(node);
  }

  const order = [];
  while (heap.data.length) {
    const node = heap.pop(); // smallest of everything currently available
    order.push(node);
    for (const neighbor of adj[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) heap.push(neighbor);
    }
  }
  return order.length === n ? order : null;
}

// Demo
if (require.main === module) {
  console.log(smallestTopologicalOrder(4, [[0, 3], [1, 3], [2, 3]])); // [0,1,2,3]
}

module.exports = { MinHeap, smallestTopologicalOrder };
