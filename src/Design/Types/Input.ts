import { type IData } from '../IData.js'
import { type ISource } from '../ISource.js'
import { type Value } from './Value.js'
import { type Vector } from './Vector.js'

/**
 * Defines a generic `Input` type that serves as a flexible container for various forms of data structures, tailored for input processing.
 * This type can encapsulate data from a defined source, a vector of values, or even a wrapped data entity, providing a consistent
 * interface for operations that require input data. It is particularly useful in scenarios where the input data structure needs to be
 * clearly defined and type-safe, including operations on numerical data, text processing, or any situation where inputs can vary in
 * structure and dimensionality.
 *
 * @template T The base type of the elements within the input. This could encompass simple data types like numbers or strings, or more
 *             complex custom types tailored to specific application needs.
 * @template D The dimensionality of the input elements. This defines the "shape" or structure of the input data, such as scalar values,
 *             vectors, or even higher-dimensional constructs, providing a versatile approach to input data modeling.
 * @template C The expected number of elements (cardinality) within the input. This parameter specifies how many items of the given
 *             dimensionality the input should contain, enabling precise control over input size and structure.
 *
 * The `Input` type includes the following variants:
 * - `ISource<T, D, C>`: Represents data input that comes from a predefined source, with compatibility for the specified type, dimension,
 *                       and cardinality. This variant is ideal for inputs that are fetched or streamed from external systems or components.
 * - `Vector<Value<T, D>, C>`: A structured vector that encapsulates values (either simple or wrapped in metadata) in a specified dimensionality,
 *                             with a fixed count as defined by `C`. This variant supports complex data structures while maintaining type safety.
 * - `IData<T, D, C>`: Represents a data entity that might include additional metadata or context, structured according to the specified dimensions
 *                     and expected count. This variant allows for a more detailed and context-rich representation of input data.
 */
export type Input<T, D extends number, C extends number> = ISource<T, D, C> | Vector<Value<T, D>, C> | IData<T, D, C>

/**
 * Extends the `Input` type to a more permissive version, allowing for greater flexibility in the structure and cardinality of the input elements.
 * This type is useful in scenarios where inputs might not strictly conform to the originally specified dimensions and cardinality, such as cases
 * where input data can be dynamically determined or may include optional elements. The permissive nature of this type facilitates handling a
 * broader range of input configurations, accommodating scenarios where strict adherence to a single input structure is not feasible or desired.
 *
 * The `InputPermissive` type allows for the following configurations:
 * - Directly permits all forms of `Input<T, D, C>`.
 * - Additionally, allows for inputs where the dimensionality (`D`) and cardinality (`C`) can be unspecified (`0`), providing a mechanism to
 *   include inputs of varying sizes and structures under a single type definition. This enhances the type's adaptability to dynamic data structures
 *   and input scenarios.
 *
 * @template T, D, C As described in `Input`.
 */
export type InputPermissive<T, D extends number, C extends number> = Input<T, D, C> | Input<T, D | 0, C | 0>
