# Big-O / Complexity — From Zero

A fifth track, separate from [patterns](../index.md),
[data structures](../data-structures/index.md),
[bit manipulation](../bit-manipulation/index.md), and
[heap fundamentals](../heap-fundamentals/README.md). Every other module
in this repo USES Big-O in its README ("this is O(n)", "this is O(log
n)") without explaining where that comes from — this track is where that
explanation actually lives, starting from "what does Big-O even mean"
and building up to "how do I calculate it myself, for code I've never
seen before."

If you've ever nodded along to "this is O(n log n)" without being able
to derive it yourself, that's exactly who this track is for.

Legend: `[ ]` not started · `[x]` done

- [x] 01. [What is Big-O](01-what-is-big-o/README.md) — why we count steps instead of timing with a stopwatch
- [x] 02. [Time Complexity Classes](02-time-complexity-classes/README.md) — O(1) through O(2ⁿ), ranked and demonstrated
- [x] 03. [Calculating Time Complexity](03-calculating-time-complexity/README.md) — the add-vs-multiply technique, for loops and recursion
- [x] 04. [Space Complexity](04-space-complexity/README.md) — the same growth question, aimed at memory instead of time
- [x] 05. [Applying Big-O](05-applying-big-o/README.md) — time-space tradeoffs, and why it matters outside an interview
- [x] 06. [Big-Omega and Big-Theta](06-omega-and-theta/README.md) — the other two-thirds: lower bounds, tight bounds, and why "Big-O" alone isn't the whole story

## How to actually use this track
Do them in order — module 3's technique assumes module 2's vocabulary,
module 5's tradeoffs assume module 4's space vocabulary, and module 6
assumes you already have Big-O itself solid before complicating the
picture with Ω and Θ. This is the one track in this repo worth reading
start to finish BEFORE diving into [the pattern roadmap](../index.md),
since every pattern module's README leans on the vocabulary built here.

## Conventions
Same shape as the other tracks: each numbered folder has a `README.md`
(explained with worked examples and real counted/timed numbers, not just
formulas), `problems.md` (a short practice list), `diagram.svg` /
`diagram.html` (a visual), and a couple of small runnable `.js` files
per module that COUNT or TIME real operations instead of just asserting
a complexity class.

## Where this leads
Once module 6 clicks, the complexity claims sprinkled through every
other module in this repo ("O(n) time, O(1) space", "O(log n) per
operation") stop being things to take on faith — you'll be able to
derive them yourself, and to notice when a "clever" solution is
secretly worse than it looks (a library call hiding an O(n) scan inside
what looks like a single O(1) line, for instance). That skill applies
everywhere in this repo, not just here — it's worth revisiting a pattern
or two from [the roadmap](../index.md) with this vocabulary fresh.
