// Pattern: union-find over ARBITRARY keys — the things being grouped
// (email addresses) aren't small integers, so they need a lookup table to
// and from array indices before union-find's usual machinery applies.
// When:
//   - merge accounts that share at least one email in common, and return
//     each merged group as a sorted list of emails (LeetCode 721)
// Why:
//   - union-find's parent array is indexed by integer, but emails are
//     strings — a Map from email to a freshly assigned index handles that
//     translation once, up front
//   - after unioning every email within each account together, the actual
//     merged groups fall out of grouping every email by its find() root —
//     the SAME operation that answers "same component?" elsewhere here
//     doubles as "which final group does this belong to?"

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

function accountsMerge(accounts) {
  const emailToIndex = new Map();
  const emailToName = new Map();

  for (const [name, ...emails] of accounts) {
    for (const email of emails) {
      if (!emailToIndex.has(email)) emailToIndex.set(email, emailToIndex.size);
      emailToName.set(email, name);
    }
  }

  const dsu = new UnionFind(emailToIndex.size);
  for (const [, ...emails] of accounts) {
    const firstIdx = emailToIndex.get(emails[0]);
    for (let i = 1; i < emails.length; i++) {
      dsu.union(firstIdx, emailToIndex.get(emails[i]));
    }
  }

  const groups = new Map(); // root index -> list of emails
  for (const [email, idx] of emailToIndex) {
    const root = dsu.find(idx);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(email);
  }

  const result = [];
  for (const emails of groups.values()) {
    emails.sort();
    result.push([emailToName.get(emails[0]), ...emails]);
  }
  return result;
}

// Demo
if (require.main === module) {
  const accounts = [
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["Mary", "mary@mail.com"],
    ["John", "johnnybravo@mail.com"],
  ];
  console.log(JSON.stringify(accountsMerge(accounts)));
  // [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
  //  ["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
}

module.exports = { UnionFind, accountsMerge };
