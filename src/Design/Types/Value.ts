import { type IData } from '../IData.js'
import { type Vector } from './Vector.js'

/**
 * Represents a value that can be passed as an argument in a generic data structure or operation.
 * This type can be either a vector of a given type and dimension, a wrapped vector, or a wrapped vector with no fixed size.
 *
 * @template T The base type of the elements within the value.
 * @template D The dimension of the value, influencing the structure of the vector.
 * @type {Vector<T | IData<T, 1, 1>, D>} - A Vector of the base type `T`, or a wrapped primitive type `IData<T, 1, 1>`.
 * @type {IData<Vector<T, D>, 1, 1>} - A wrapped vector of dimension `D`.
 * @type {IData<Vector<T, 0>, 1, 1>} - A special case of a wrapped vector with an unspecified (dynamic) size.
 */

export type Value<T, D extends number> =
  | Vector<T | IData<T, 1, 1>, D> // Allows using either basic types or wrapped data types as vector elements.
  //| Vector<T | IData<T, 1, 1>, 0> // Allows using either basic types or wrapped data types as vector elements.
  | IData<T, D, 1> // Represents a wrapped vector, enforcing single-dimensionality and singularity on the wrapping.
//| IData<T, D, 0> // Represents a wrapped vector, enforcing single-dimensionality and singularity on the wrapping.
