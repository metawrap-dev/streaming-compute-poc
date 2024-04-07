// import { type IData } from '../IData.js'
// import { type IData } from "../IData.js";
import { type Cardinality, type Dimension, type Vector } from './Vector.js'

/**
 * Defines a generic output type that is similar in structure to the `Input` type.
 * This type can be used to specify the expected structure of an operation's output, providing clarity and type safety.
 *
 * @template T The type of elements within the output.
 * @template D The dimensionality of the output elements.
 * @template C The number of elements expected in the output.
 */
export type Output<T, D extends Dimension, C extends Cardinality> =
  //| Vector<Value<T, D>, A> // Defines a structured vector as output, with a specific number of elements.
  // | Vector<Value<T, D>, 0> // Specifies that the output can be a dynamically sized vector, not limited by a fixed number of elements.
  //| IData<Value<T, 1>, D, 1> //
  //| IData<Value<T, D>, 0, 1> //
  // IData<T,D,A> |
  Vector<Vector<T, D>, C>