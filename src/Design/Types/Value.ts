import { type IData } from '../IData.js'
import { type Vector } from './Vector.js'

/**
 * Defines a generic type `Value` that can represent various structured data forms based on the type `T` and dimension `D`.
 *
 * This type is flexible, allowing for the representation of both simple and complex data structures within a generic
 * framework, making it suitable for operations or structures where the exact form of data (scalar, vector, or wrapped
 * entity) needs variability.
 *
 * @template T The base type of the elements within the structure. This could be a primitive type (e.g., `number`, `string`)
 *             or a more complex type.
 * @template D The dimensionality of the value, influencing its structure:
 *             - When `D` is 0, it represents an unbounded array of type `T`.
 *             - When `D` is 0, it represents a singleton.
 *             - A positive integer `D` indicates a vector or wrapped tuple of that dimension.
 *
 * The type can be one of the following forms:
 * - `Vector<T | IData<T, 1, 1>, D>`: Represents either a vector of type `T` or a vector of wrapped data entities `IData<T, 1, 1>`.
 *   The dimension `D` determines the structure of the vector. The use of `IData<T, 1, 1>` allows for the inclusion of
 *   data entities that are themselves considered singular units but are wrapped in a metadata or additional context layer.
 *   The parameters `1, 1` in `IData` signify that the entity is singular and non-repetitive in nature.
 * - `IData<T, D, 1>`: Represents a data entity wrapped in a context or metadata layer (`IData`) that is structured as a
 *   vector with dimension `D`. The final `1` indicates that this entity, despite possibly representing multiple dimensions
 *   of data, is treated as a singular, unified entity in the context where `Value` is used.
 */
export type Value<T, D extends number> =
  | Vector<T | IData<T, 1, 1>, D> // This allows the incorporation of simple type vectors or vectors of wrapped entities, providing flexibility in handling both basic and complex data forms.
  | IData<T, D, 1> // This specifies a singular wrapped entity that, despite potentially encapsulating a multi-dimensional structure, is considered as a single unit.
