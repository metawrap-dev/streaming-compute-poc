import { type Vector } from './Vector.js'

/**
 * Defines a `Static` output type as a vector of vectors, suitable for representing resolved, multi-dimensional data in a type-safe manner.
 * This structure facilitates the encapsulation of complex data outputs, where each element in the outer vector is itself a vector containing
 * elements of type `T`. These elements are organized by specified dimensionality `D` and overall cardinality `C`, establishing a structured
 * and predictable data output format.
 *
 * The `Output` type is invaluable when data dimensions and quantities must be explicitly defined, ensuring that data producers and consumers
 * operate with matching expectations of data structure and integrity.
 *
 * @template T Type of elements within each inner vector, supporting a range of data types from simple primitives to complex custom objects.
 * @template D Dimensionality of inner vectors, defining the number of elements each can contain and thereby their "shape".
 * @template C Cardinality of the outer vector, indicating the total number of inner vectors, thus determining the output's overall size and structure.
 */
export type Output<T, D extends number, C extends number> = Vector<Vector<T, D>, C>
