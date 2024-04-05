export type Vector<T, N extends number> = 
N extends 0
? T[]  // Return T[] directly for N = 0
:  N extends 1
  ? T  // Return T directly for N = 1
  : N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, [T]>  // Start the recursive construction with an initial array containing one T
  : never;

// Adjusted helper type to recursively construct a tuple.
type _TupleOf<T, N extends number, R extends unknown[]> = 
  R["length"] extends N
  ? R  // If the current length matches N, return the tuple
  : _TupleOf<T, N, [T, ...R]>;  // Otherwise, add T to the tuple and continue recursion