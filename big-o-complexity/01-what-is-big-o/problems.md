# What is Big-O — Practice Problems

1. **By hand, no code**: for `arr.length = n`, how many operations does a
   loop that touches every element once perform? What if it's a loop
   inside a loop, both running `n` times? Check your intuition against
   [module 2](../02-time-complexity-classes/README.md) once you get there.

2. **Run the timing demo yourself**
   - Task: run [02-why-not-just-time-it.js](02-why-not-just-time-it.js)
     three separate times (as three separate `node` invocations, not just
     three loop iterations) and compare the numbers
   - What to notice: the exact millisecond values differ between runs,
     but the ALGORITHM never changed — that gap is exactly why Big-O
     doesn't use a stopwatch

3. **Modify the counter**
   - Task: edit [01-counting-operations.js](01-counting-operations.js) so
     it counts operations for a function that touches EVERY PAIR of
     elements (a nested loop) instead of every single element
   - What to expect: watch the operation count for `n=10` vs `n=100` —
     it won't grow 10x like the original did. (Spoiler for
     [module 2](../02-time-complexity-classes/README.md): it grows 100x.)

## After this module
See [../index.md](../index.md) — next up is
[02-time-complexity-classes](../02-time-complexity-classes/README.md),
which names and ranks the growth shapes you'll see over and over.
