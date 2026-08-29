// Pattern: Greedy — two-pass, combine via max
// When: a single local rule ("higher rating than a neighbor needs more of
//       X than that neighbor") must hold against BOTH neighbors at once,
//       and a one-directional greedy sweep can only ever satisfy one side.
// Why it works: satisfy the "beats left neighbor" rule in a left-to-right
//       pass, then separately satisfy "beats right neighbor" in a
//       right-to-left pass. Neither pass alone is correct, but since both
//       constraints only ever demand a value be *larger*, taking the max of
//       the two passes at each position satisfies both simultaneously
//       without ever violating either one.
//
// LC135: Candy — each child has a rating; every child gets >= 1 candy, and
// any child with a higher rating than an adjacent child must get more candy
// than that neighbor. Return the minimum total candies.

function candy(ratings) {
  const n = ratings.length;
  const left = new Array(n).fill(1); // satisfies "beats left neighbor"
  const right = new Array(n).fill(1); // satisfies "beats right neighbor"

  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) left[i] = left[i - 1] + 1;
  }

  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) right[i] = right[i + 1] + 1;
  }

  let total = 0;
  for (let i = 0; i < n; i++) total += Math.max(left[i], right[i]);
  return total;
}

module.exports = { candy };

if (require.main === module) {
  console.log(candy([1, 0, 2])); // 5
  console.log(candy([1, 2, 2])); // 4
  console.log(candy([1, 3, 2, 2, 1])); // 7
}
