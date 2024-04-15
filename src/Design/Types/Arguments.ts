import { type ISource } from '../ISource.js'
import { type Value } from './Value.js'

/**
 * A utility type for creating a tuple of type `T` with a specific length `C`. This type is intended
 * for use with functions that accept a variable number of arguments of the same type, facilitating
 * strong typing of arguments passed via the spread operator. The cardinality (`C`) is made concrete
 * in the implementation of the method that uses this type, ensuring type safety and predictability
 * in argument handling.
 *
 * @template T The type of elements within the tuple.
 * @template C The length of the tuple, representing the cardinality of arguments.
 *             - When `C` is 0, it represents an array of type `T` with an unbounded number of elements.
 *             - When `C` is 1, it represents a tuple with a single element of type `T`.
 *             - For `C` > 1, it represents a tuple with `C` elements of type `T`.
 */
export type Arguments<T, C extends number> = C extends 0
  ? T[] // For C = 0, return an array of type T representing an unbounded set of arguments.
  : C extends 1
    ? [T] // For C = 1, return a tuple with a single element.
    : C extends C
      ? number extends C
        ? T[] // If C is the generic type 'number' (unconstrained), return T[].
        : _Argument<T, C, [T]> // Use a recursive helper type for numeric values of C > 1.
      : never // If none of the conditions are met, never is returned.

type _Argument<T, C extends number, R extends unknown[]> = R['length'] extends C
  ? R // If the current tuple's length matches the target length `C`, return it.
  : _Argument<T, C, [T, ...R]> // Otherwise, prepend another element of type T and recurse.

// An argument can be a value or a source
export type Argument<T, D extends number> = ISource<T, D, 1> | Value<T, D> | Value<T, 0>
