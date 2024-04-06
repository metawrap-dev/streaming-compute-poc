import { type IData } from '../IData.js'
import { type ISource } from '../ISource.js'
import { type Value } from './Value.js'
import { type Vector } from './Vector.js'

/**
 * Defines a generic input type that can represent a source, a vector of values, or a dynamic-sized array.
 * This type is versatile, supporting a wide range of data structures for input processing.
 *
 * @template T The type of elements within the input.
 * @template D The dimensionality of the input elements, affecting their structure.
 * @template A The number of arguments or elements expected in the input.
 * @type {ISource<T, D, A>} - Input can originate from a predefined source type, accommodating complex data structures.
 * @type {Vector<Value<T, D>, A>} - A vector of `Value<T, D>` types, with `A` defining the number of such values.
 * @type {Vector<Value<T, D>, 0>} - A vector representing a dynamic array with no fixed size, but structured according to `Value<T, D>`.
 */
export type Input<T, D extends number, A extends number> =
  | ISource<T, D, A> // Represents a source of data that matches the specified type, dimension, and argument count.
  | Vector<Value<T, D>, A> // A structured vector containing values, with a fixed number of elements.
  //  | Vector<Value<T, D>, 0> // A vector with a dynamic size, flexible in terms of the number of elements it can contain.
  // | IData<Value<T, 1>, D, 1> //
  | IData<Value<T, D>, 0, 1> //
