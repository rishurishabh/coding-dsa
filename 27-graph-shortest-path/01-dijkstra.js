// Pattern: Dijkstra's algorithm — single-source shortest path, non-negative weights
// When: finding the shortest distance from one source to every other node,
//       and no edge weight is negative.
// Why it works: always finalize the closest unvisited node next (via a min
//       heap). Because all weights are >= 0, no edge discovered later could
//       ever create a shorter path to a node that's already been finalized
//       at its minimum distance — greedy finalization is provably safe.
//       Breaks the moment a negative edge exists (see 02-bellman-ford.js).

class MinHeap {
  constructor() {
    this.heap = []; // [distance, node]
  }

  size() {
    return this.heap.length;
  }

  push(item) {
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._bubbleDown(0);
    }
    return top;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[parent][0] <= this.heap[i][0]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
      if (right < n && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}

// graph: Map<node, Array<[neighbor, weight]>>
function dijkstra(graph, start) {
  const dist = new Map();
  for (const node of graph.keys()) dist.set(node, Infinity);
  dist.set(start, 0);

  const heap = new MinHeap();
  heap.push([0, start]);

  while (heap.size() > 0) {
    const [d, node] = heap.pop();
    if (d > dist.get(node)) continue; // stale entry, a shorter path already won

    for (const [neighbor, weight] of graph.get(node) || []) {
      const newDist = d + weight;
      if (newDist < dist.get(neighbor)) {
        dist.set(neighbor, newDist);
        heap.push([newDist, neighbor]);
      }
    }
  }

  return dist;
}

module.exports = { dijkstra, MinHeap };

if (require.main === module) {
  const graph = new Map([
    ["A", [["B", 4], ["C", 1]]],
    ["B", [["D", 1]]],
    ["C", [["B", 2], ["D", 5]]],
    ["D", [["E", 3]]],
    ["E", []],
  ]);

  console.log([...dijkstra(graph, "A")]);
  // [ [ 'A', 0 ], [ 'B', 3 ], [ 'C', 1 ], [ 'D', 4 ], [ 'E', 7 ] ]
}
