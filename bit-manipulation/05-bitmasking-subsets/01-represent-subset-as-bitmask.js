// Encode a subset of a list as a single number: bit i set means "item i
// is included". Decode it back by checking each bit — the exact same
// checkBit trick from 04-bit-tricks, just applied to every position in
// the list instead of one specific position.

function encodeSubset(items, includedItems) {
  let mask = 0;
  for (const item of includedItems) {
    const i = items.indexOf(item);
    mask = mask | (1 << i); // set bit i
  }
  return mask;
}

function decodeSubset(items, mask) {
  const result = [];
  for (let i = 0; i < items.length; i++) {
    if ((mask >> i) & 1) result.push(items[i]); // bit i is set
  }
  return result;
}

module.exports = { encodeSubset, decodeSubset };

if (require.main === module) {
  const items = ["Apple", "Bread", "Milk"]; // Apple=bit0, Bread=bit1, Milk=bit2

  const mask = encodeSubset(items, ["Apple", "Milk"]);
  console.log("mask =", mask.toString(2).padStart(3, "0"), `(${mask})`); // 101 (5)
  console.log("decoded:", decodeSubset(items, mask)); // [ 'Apple', 'Milk' ]

  // Comparing two subsets for overlap: one AND, no loop needed.
  const wantToBuy = encodeSubset(items, ["Apple", "Bread"]); // 011
  const inCart = encodeSubset(items, ["Bread", "Milk"]); // 110
  const overlap = wantToBuy & inCart;
  console.log("already in cart:", decodeSubset(items, overlap)); // [ 'Bread' ]

  // Combining two subsets: one OR, no loop needed.
  const combined = wantToBuy | inCart;
  console.log("combined shopping list:", decodeSubset(items, combined)); // all three
}
