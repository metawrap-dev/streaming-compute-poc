import { type IData } from '../IData.js'
import { type Cardinality, type Dimension, type Vector } from './Vector.js'

/**
 * Represents a value that can be passed as an argument in a generic data structure or operation.
 * This type can be either a vector of a given type and dimension, a wrapped vector, or a wrapped vector with no fixed size.
 *
 * @template T The base type of the elements within the value.
 * @template D The dimension of the value, influencing the structure of the vector.
 */

export type Value<T, D extends Dimension> =
  | Vector<T | IData<T, Dimension.Scalar, Cardinality.One>, D> // Allows using either basic types or wrapped data types as vector elements. The 1 denotes that it is a single entity.
  | IData<T, D, Cardinality.One> // Represents a wrapped vector, enforcing single-dimensionality and singularity on the wrapping.
