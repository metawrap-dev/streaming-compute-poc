import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { type Vector } from './Vector.js'

/**
 * A value that is passed as an argument
 * @type
 * @param {T} T The type
 * @param {D} D The dimension
 */
export type Value<T, D extends number> =
  | Vector<T | IData<T>, D> // A Vector or our primitive or wrapped type
  | IData<Vector<T, D>> // A wrapped vector
  | IData<Vector<T, 0>> // A wrapped vector with no fixed size

/**
 * An input type
 * @type
 * @param {T} T The type
 * @param {D} D The dimension
 * @param {D} D The number of arguments
 */
export type Input<T, D extends number, A extends number> =
  | ISource<T, D, A> // Inout can be a source
  | Vector<Value<T, D>, A> // It can also be a vector or the values we want
  | Vector<Value<T, D>, 0> // It can also be a plain array with no fixed size

/**
 * An output type
 * @type
 * @param {T} T The type
 * @param {D} D The dimension
 * @param {D} D The number of arguments
 */
export type Output<T, D extends number, A extends number> =
  | Vector<Value<T, D>, A> // It can also be a vector or the values we want
  | Vector<Value<T, D>, 0> // It can also be a plain array with no fixed size
