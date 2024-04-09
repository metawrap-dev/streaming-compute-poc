import { type IData } from '../IData.js'
import { type ISource } from '../ISource.js'
import { type Value } from './Value.js'
import { type Vector } from './Vector.js'

/**
 * Defines a flexible `Input` type for various data structures, suitable for input processing. This generic type supports data from sources,
 * vectors of values, or wrapped data entities, ensuring type safety and clear data structure definition. It's designed for diverse applications,
 * from numerical computations to text processing.
 *
 * @template T Element type (e.g., number, string, or custom types).
 * @template D Data dimensionality, influencing structure (scalar, vector, etc.).
 * @template C Cardinality, indicating the number of elements.
 *
 * Variants:
 * - `ISource<T, D, C>`: Data from a source matching type, dimension, and cardinality.
 * - `Vector<Value<T, D>, C>`: Vector encapsulating values with specified dimensionality and count.
 * - `IData<T, D, C>`: Data entity, potentially with additional metadata, structured as defined.
 */
export type Input<T, D extends number, C extends number> = ISource<T, D, C> | Vector<Value<T, D>, C> | IData<T, D, C>

/**
 * A more flexible version of `Input` that accommodates inputs with dynamic or undefined dimensions and cardinalities. Useful for handling
 * varying input sizes and structures, enhancing adaptability for inputs with optional elements or dynamically determined data.
 *
 * Allows:
 * - Any `Input<T, D, C>`.
 * - Inputs with unspecified dimensions (`D`) or cardinalities (`C`), marked as `0`.
 *
 * @template T, D, C As in `Input`.
 */
export type InputPermissive<T, D extends number, C extends number> = Input<T, D, C> | Input<T, D | 0, C | 0>
