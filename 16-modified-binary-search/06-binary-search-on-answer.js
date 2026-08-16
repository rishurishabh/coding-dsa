// Pattern: binary search over a space of POSSIBLE ANSWERS, not over the
// input array at all — the array is only ever used inside a feasibility check.
// When:
//   - "find the minimum/maximum X such that some condition holds" — where
//     testing one candidate X is cheap, and feasibility is MONOTONIC (every
//     X above/below the answer also works) (e.g. Koko Eating Bananas, LeetCode 875)
// Why:
//   - the input array doesn't need to be sorted at all — what's sorted is
//     the space of candidate answers (eating speeds 1..max(piles)), and
//     monotonicity ("if speed K works, so does any speed > K") is what
//     makes binary search valid here, same halving logic as every other variant
//   - this reframing — search the ANSWER, not the DATA — is what unlocks
//     binary search for a huge class of optimization problems that don't
//     look like search problems at first glance

function minEatingSpeed(piles, h) {
  function hoursNeeded(speed) {
    let hours = 0;
    for (const pile of piles) hours += Math.ceil(pile / speed);
    return hours;
  }

  let lo = 1;
  let hi = Math.max(...piles);

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (hoursNeeded(mid) <= h) hi = mid; // speed mid works — maybe a slower speed also works
    else lo = mid + 1; // too slow, need more speed
  }
  return lo;
}

// Demo
if (require.main === module) {
  console.log(minEatingSpeed([3, 6, 7, 11], 8)); // 4
  console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // 30
}

module.exports = { minEatingSpeed };
