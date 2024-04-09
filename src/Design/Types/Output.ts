import { type Vector } from './Vector.js'

/**
 * Represents a structured `Static` output type for operations, defined as a strict vector of vectors, which implies that
 * the output has been `resolved` and contains no other no-static elements This type is designed to encapsulate
 * multi-dimensional data structures with a specified number of elements, offering a precise way to represent complex data
 * outputs in a type-safe manner. By using a vector of vectors, it enables representing data structures where each outer
 * vector element (a vector itself) can hold a collection of data points of type `T`, organized according to the specified
 * dimensionality `D`. The cardinality `C` dictates the number of these inner vectors, thereby defining the overall structure
 * and size of the output data.
 *
 *
 * The `Output` type is particularly useful in scenarios where the dimensions and cardinality of the data are known or need to
 * be enforced at compile time, ensuring that operations that produce or consume such data adhere to the expected structure.
 *
 * @template T The base type of the elements within each inner vector. This type parameter allows the `Output` type to be
 *             adaptable to different kinds of data, whether primitive types like numbers and strings or more complex custom types.
 * @template D The dimensionality of each inner vector, expressed as a positive integer. This parameter determines how many
 *             elements or '`ows` of type `T` each inner vector can hold, effectively setting the "shape" of the data within the output structure.
 *             For example, `D = 3` would imply each inner vector is a 3D vector, capable of holding three elements of type `T`.
 * @template C The cardinality of the outer vector, i.e., the `columns` or number of inner vectors contained within it. This
 *             parameter allows specifying how many vectors of dimension `D` the output should contain, providing a mechanism
 *             to enforce the size and structure of the output at the type level.
 */
export type Output<T, D extends number, C extends number> = Vector<Vector<T, D>, C>
