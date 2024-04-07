/**
 * The dimensions that vector can have.
 * @enum
 */
export enum Dimension {
  Unbounded = 0,
  Scalar = 1,
  V2 = 2,
  V3 = 3,
  V4 = 4,
}

/**
 * The cardinality of a result.
 * @enum
 */
export enum Cardinality {
  Unbounded = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
}

/**
 * Defines a type `Vector` that represents a vector of a specific dimension `D` and type `T`.
 * The dimension `D` determines the shape of the vector:
 * - `D = 0`: Represents an unbounded vector with elements of type `T`, essentially `T[]`.
 * - `D = 1`: Represents a scalar value of type `T`.
 * - `D = 2`: Represents a 2D vector with two elements of type `T`, `[T, T]`.
 * - `D = N`: Represents an N-dimensional vector with N elements of type `T`, `[T, ..., T] (N times)`.
 *
 * @template T The type of the elements within the vector.
 * @template D The dimension of the vector. Must be a number where:
 *             0 represents an unbounded dimension,
 *             1 represents a scalar,
 *             and any positive integer N represents an N-dimensional vector.
 */
export type Vector<T, D extends number> = D extends 0
  ? T[] // For D = 0, return an array of type T representing an unbounded vector.
  : D extends 1
    ? T // For D = 1, return the type T itself, representing a scalar.
    : D extends D
      ? number extends D
        ? T[] // If D is not a specific number (but the generic type 'number'), return T[].
        : _Vector<T, D, [T]> // Use a recursive helper type for specific numeric values of D > 1.
      : never // If none of the conditions are met, never is returned.

/**
 * A recursive utility type to construct vectors of a specific dimension `D` and type `T`.
 * Starts with an initial vector of one element and recursively adds elements until the desired dimension `D` is reached.
 *
 * @template T The type of elements in the vector.
 * @template D The target dimension of the vector.
 * @template R The accumulator, representing the current state of the vector during construction.
 *             Initially starts with a single element of type `T`.
 * @private Internal use for constructing the Vector type.
 */
type _Vector<T, D extends number, R extends unknown[]> = R['length'] extends D
  ? R // If the current vector's length matches the desired dimension `D`, return it.
  : _Vector<T, D, [T, ...R]> // Otherwise, prepend another element of type T and recurse.
