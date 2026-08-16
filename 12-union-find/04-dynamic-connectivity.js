// Pattern: union-find as an ONLINE structure — queries and updates are
// interleaved, so the answer has to be maintained incrementally instead of
// recomputed from scratch each time.
// When:
//   - land cells are added to a grid one at a time; report the number of
//     islands after EACH addition (LeetCode 305)
// Why:
//   - re-running flood fill (10-graph-bfs-dfs/01-grid-flood-fill.js) after
//     every single addition would be O(cells) per query — union-find
//     instead updates a running component count in O(α(n)) per addition:
//     start count at 0, add 1 when new land appears, subtract 1 for every
//     successful union with an already-land neighbor

function UnionFind(n) {
  this.parent = Array.from({ length: n }, (_, i) => i);
  this.rank = new Array(n).fill(0);
}
UnionFind.prototype.find = function (x) {
  if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
  return this.parent[x];
};
UnionFind.prototype.union = function (x, y) {
  const rootX = this.find(x);
  const rootY = this.find(y);
  if (rootX === rootY) return false;
  if (this.rank[rootX] < this.rank[rootY]) this.parent[rootX] = rootY;
  else if (this.rank[rootX] > this.rank[rootY]) this.parent[rootY] = rootX;
  else { this.parent[rootY] = rootX; this.rank[rootX]++; }
  return true;
};

function numIslands2(rows, cols, positions) {
  const dsu = new UnionFind(rows * cols);
  const isLand = new Array(rows * cols).fill(false);
  const result = [];
  let count = 0;

  for (const [r, c] of positions) {
    const idx = r * cols + c;
    if (isLand[idx]) { // duplicate position: no change
      result.push(count);
      continue;
    }
    isLand[idx] = true;
    count++;

    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && isLand[nr * cols + nc]) {
        if (dsu.union(idx, nr * cols + nc)) count--; // merged two islands into one
      }
    }
    result.push(count);
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log(numIslands2(3, 3, [[0, 0], [0, 1], [1, 2], [2, 1]])); // [1,1,2,3]
}

module.exports = { UnionFind, numIslands2 };
