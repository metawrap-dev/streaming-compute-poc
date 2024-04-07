import { type IData } from '../IData.js'
import { type ISource } from '../ISource.js'
import { type Value } from './Value.js'
import { type Dimension, type Vector } from './Vector.js'

/**
 * Defines a generic input type that can represent a source, a vector of values, or a dynamic-sized array.
 * This type is versatile, supporting a wide range of data structures for input processing.
 *
 * @template T The type of elements within the input.
 * @template D The dimensionality of the input elements, affecting their structure.
 * @template A The number of arguments or elements expected in the input.
 */
export type Input<T, D extends Dimension, A extends number> =
  | ISource<T, D, A> // Represents a source of data that matches the specified type, dimension, and argument count.  
  | Vector<Value<T, D>, A> // A structured vector containing values, with a fixed number of elements.
  | IData<T, D, A>  

  
/**
 * A more permissive version of Input.
 *
 * @template T The type of elements within the input.
 * @template D The dimensionality of the input elements, affecting their structure.
 * @template A The number of arguments or elements expected in the input.
 */
export type InputPermissive<T, D extends Dimension, A extends number> =
  | Input<T, D, A>  
  //| Input<T, D, A | 0>  
  //| Input<T, D | Dimension.Unbounded, A >  
  //| Input<T, D | Dimension.Unbounded, A | 0>  
  
  // | IData<T, D, A>  
  //| IData<T ,D | Dimension.Unbounded,A>
  //| IData<T ,D | Dimension.Unbounded,A | 0>
  
