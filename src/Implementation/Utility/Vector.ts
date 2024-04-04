/**
 * Defines a vector of type T that is N elements long.
 * N = 0 => T (Scalar)
 * N = 1..B => [ T0,T1,...TN-1 ] (Array of type N)
 * @type
 */
export type Vector<T, N extends number> =
  // Check if N is exactly 0, to return the type `T`, not an array.
  N extends 0
    ? T // If N is 0, return the `T` type.
    : N extends N // This is a distributive conditional type. It ensures that the type operation works correctly across union types for N.
      ? number extends N // Check if N is a specific number or the broad 'number' type.
        ? T[] // If N is the broad 'number' type, return an array of T (of any size).
        : _ArrayUsing<T, N, []> // Otherwise, use a recursive helper type to construct a vector of type T and length N.
      : never // If none of the above conditions are met, return the `never` type.

// A private helper type _ArrayUsing to recursively construct a vector.
type _ArrayUsing<T, N extends number, R extends unknown[]> = R['length'] extends N // Check if the current vector R has reached the desired length N.
  ? R // If yes, return the vector R as is.
  : _ArrayUsing<T, N, [T, ...R]> // If not, add another element of type T to the vector and recurse.
