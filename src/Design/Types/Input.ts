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
 * @template C The number of arguments or elements expected in the input.
 */
export type Input<T, D extends number, C extends number> =
  | ISource<T, D, C> // Represents a source of data that matches the specified type, dimension, and argument count.
  | Vector<Value<T, D>, C> // A structured vector containing values, with a fixed number of elements.
  | IData<T, D, C>

/**
 * A more permissive version of Input.
 *
 * @template T The type of elements within the input.
 * @template D The dimensionality of the input elements, affecting their structure.
 * @template C The number of arguments or elements expected in the input.
 */
export type InputPermissive<T, D extends number, C extends number> = Input<T, D, C> | Input<T, D | 0, C | 0>
/*
  | Input<T, D, 0> 
  | Input<T, 0, C> 
  | Input<T, 0, 0> 
  | IData<T, D, C> 
  | IData<T, 0, C> 
  | IData<T, D, 0>
  | IData<T, 0, 0>
*/
