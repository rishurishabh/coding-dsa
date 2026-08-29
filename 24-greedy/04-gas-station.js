// Pattern: Greedy — running deficit with reset point
// When: finding a valid circular starting point given a sequence of
//       gains/costs, where a global feasibility condition (total gain >=
//       total cost) guarantees *some* start works.
// Why it works: if the tank goes negative starting from index `start`, then
//       *no* index between start and the failure point i could have been a
//       valid start either — starting later only means arriving at each of
//       those intermediate stations with an emptier tank than starting from
//       `start` did (you'd have accumulated the same shortfall with less
//       runway). So the whole stretch [start..i] is disqualified at once,
//       and the search resumes at i+1 with the tank reset to 0.
//
// LC134: Gas Station — gas[i] fuel gained at station i, cost[i] fuel spent
// driving from i to i+1; return the starting station index for a single
// valid full circuit, or -1 if none exists.

function canCompleteCircuit(gas, cost) {
  let totalTank = 0;
  let currentTank = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    totalTank += diff;
    currentTank += diff;

    if (currentTank < 0) {
      // Can't reach i+1 from `start` — disqualify [start..i] as a whole.
      start = i + 1;
      currentTank = 0;
    }
  }

  return totalTank >= 0 ? start : -1;
}

module.exports = { canCompleteCircuit };

if (require.main === module) {
  console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); // 3
  console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3])); // -1
}
