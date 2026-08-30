# Applying Big-O — Practice Problems

1. **By hand, no code**: for the duplicate-check problem, why does the
   Set version need to store items it's ALREADY seen, rather than just
   counting them? What would break if it only kept a count?
   - Answer: you need to check MEMBERSHIP (`seen.has(value)`), not just
     a total — a count alone can't tell you "have I specifically seen
     THIS value before"

2. **Pick the right tradeoff for the constraint**
   - Task: for each scenario, would you reach for the O(1)-space nested
     loop or the O(n)-space Set from
     [01-time-space-tradeoff.js](01-time-space-tradeoff.js)? (a) a
     microcontroller with 2KB of RAM checking a 50-item list (b) a web
     server checking a 500,000-row list on every request
   - Think about which resource is actually scarce in each case before
     answering

3. **Run the scale demo yourself**
   - Task: run [02-why-it-matters-at-scale.js](02-why-it-matters-at-scale.js)
     and extend its `n` list to include `16000` and `32000`
   - What to notice: the O(n²) column keeps roughly quadrupling while
     the O(n) column keeps barely moving — watch the "ratio" column grow

4. **Two Sum** (LeetCode 1) — the canonical time-space tradeoff problem
   - Task: solve it with a nested loop (O(n²) time, O(1) space) AND with
     a hash map (O(n) time, O(n) space)
   - Pattern: [Variant 1](01-time-space-tradeoff.js)'s exact tradeoff,
     applied to the problem most people meet this idea through first

5. **Look back at one earlier module with new eyes**
   - Task: open any pattern module you've already built in this repo
     (e.g. [14-top-k-elements](../../14-top-k-elements/README.md)) and
     answer: what's its time complexity? Its space complexity? What
     would the "naive" alternative have cost instead?

## After this module
See [../index.md](../index.md) — next up is
[06-omega-and-theta](../06-omega-and-theta/README.md), which fills in
the two notations every earlier module quietly left out (Big-O is only
an upper bound). From there: apply this vocabulary while working through
[the pattern roadmap](../../index.md) — every module's README already
states its complexity, now you can verify those claims yourself instead
of taking them on faith.
