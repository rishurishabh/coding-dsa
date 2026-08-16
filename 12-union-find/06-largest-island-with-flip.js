// Pattern: union-find tracking SIZE per root, then a hypothetical query
// against it — every earlier variant answers "are these connected" or
// "how many groups"; this asks "what WOULD happen if one more cell joined".
// When:
//   - flip exactly one water cell to land; find the largest possible
//     island afterward (LeetCode 827, the hardest classic of this pattern)
// Why:
//   - first union all existing land into islands and record each root's
//     size — then, for every water cell, look at its (up to 4) land
//     neighbors, collect their DISTINCT roots (a set, so one island
//     touched twice doesn't get double-counted), and sum those roots'
//     sizes plus 1 for the flipped cell itself
//   - this only works because size was tracked incrementally during the
//     union pass — recomputing it per water cell from scratch would be
//     much slower

function UnionFind(n) {
  this.parent = Array.from({ length: n }, (_, i) => i);
  this.rank = new Array(n).fill(0);
  this.size = new Array(n).fill(1);
}
UnionFind.prototype.find = function (x) {
  if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
  return this.parent[x];
};
UnionFind.prototype.union = function (x, y) {
  let rootX = this.find(x);
  let rootY = this.find(y);
  if (rootX === rootY) return;
  if (this.rank[rootX] < this.rank[rootY]) [rootX, rootY] = [rootY, rootX];
  this.parent[rootY] = rootX;
  this.size[rootX] += this.size[rootY]; // merge sizes along with the sets
  if (this.rank[rootX] === this.rank[rootY]) this.rank[rootX]++;
};

function largestIsland(grid) {
  const n = grid.length;
  const dsu = new UnionFind(n * n);

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] !== 1) continue;
      if (r > 0 && grid[r - 1][c] === 1) dsu.union(r * n + c, (r - 1) * n + c);
      if (c > 0 && grid[r][c - 1] === 1) dsu.union(r * n + c, r * n + c - 1);
    }
  }

  let best = 0;
  let hasWater = false;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] !== 0) continue;
      hasWater = true;
      const roots = new Set();
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          roots.add(dsu.find(nr * n + nc));
        }
      }
      let sum = 1; // the flipped cell itself
      for (const root of roots) sum += dsu.size[root];
      best = Math.max(best, sum);
    }
  }

  return hasWater ? best : n * n; // no water at all: the whole grid is already one island
}

// Demo
if (require.main === module) {
  console.log(largestIsland([[1, 0], [0, 1]])); // 3
  console.log(largestIsland([[1, 1], [1, 0]])); // 4
  console.log(largestIsland([[1, 1], [1, 1]])); // 4 (no water to flip)
}

module.exports = { UnionFind, largestIsland };
