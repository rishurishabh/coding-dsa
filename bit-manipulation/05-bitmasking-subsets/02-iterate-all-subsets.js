// Every number from 0 to 2^n - 1, written in binary with n digits, is a
// different combination of included/excluded items — so just counting
// through that range visits every possible subset exactly once.

function decodeSubset(items, mask) {
  const result = [];
  for (let i = 0; i < items.length; i++) {
    if ((mask >> i) & 1) result.push(items[i]);
  }
  return result;
}

function allSubsets(items) {
  const n = items.length;
  const total = 1 << n; // 2^n
  const subsets = [];

  for (let mask = 0; mask < total; mask++) {
    subsets.push(decodeSubset(items, mask));
  }

  return subsets;
}

module.exports = { allSubsets };

if (require.main === module) {
  const items = ["Apple", "Bread", "Milk"];
  const subsets = allSubsets(items);

  console.log(`${items.length} items -> ${subsets.length} subsets (2^${items.length})`);
  subsets.forEach((s, mask) => {
    console.log(" ", mask.toString(2).padStart(3, "0"), "=", s.length ? `{${s.join(", ")}}` : "{} (empty set)");
  });

  // A common use: brute-force over every subset to find one matching a
  // condition, when n is small enough that 2^n is cheap (n <= ~20).
  const prices = { Apple: 2, Bread: 3, Milk: 4 };
  const budget = 5;
  const affordable = subsets.filter((s) => s.reduce((sum, item) => sum + prices[item], 0) <= budget);
  console.log("subsets costing <= $5:", affordable.map((s) => `{${s.join(",")}}`));
}
