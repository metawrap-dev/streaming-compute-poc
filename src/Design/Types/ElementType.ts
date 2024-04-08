import { type IData } from '../IData.js'
import { type IElement } from '../IElement.js'
import { type IResolvable } from '../IResolvable.js'
import { type ISource } from '../ISource.js'
import { type Value } from './Value.js'
import { type Vector } from './Vector.js'

/**
 * The type of the element that makes up the pipeline graph.
 *
 * @author James McParlane
 * @enum
 */
export enum ElementType {
  /**
   * Provides a single piece of data.
   */
  Data,

  /**
   * Provides a stream of data.
   */
  Source,

  /**
   * Can compute.
   */
  Compute,

  /**
   * Is a destination stream for data.
   */
  Destination,
}

/**
 * Type-guard method to check if the object is not undefined.
 * @author James McParlane
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is not undefined.
 */
function isNotUndefined(object: unknown): object is object {
  return object !== undefined
}

/**
 * Type-guard method to check if the object is a source.
 * @author James McParlane
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isSource<T, D extends number, C extends number>(object: unknown): object is ISource<T, D, C> {
  return isNotUndefined(object) && (object as ISource<T, D, C>).Type === ElementType.Source
}

/**
 * Type-guard method to check if the object is IData
 * @note Might not be needed.
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isData<T, D extends number, C extends number>(object: unknown): object is IData<T, D, C> {
  return isNotUndefined(object) && (object as IData<T, D, C>).Type === ElementType.Data
}

/**
 * Type-guard method to check if the object is an array of values.
 * @note This is matches weakly.
 * @param {unknown} object The object to identify.
 * @returns {boolean}
 */
export function isValueArray<T, D extends number, C extends number>(object: unknown): object is Vector<Value<T, D>, C>[] {
  return isNotUndefined(object) && Array.isArray(object) && object.length > 0
}

/**
 * Type-guard method to check if the object is an Input Value (not the Source Aspect)
 * @note Might not be needed.
 * @param {unknown} object The object to identify.
 * @returns {boolean}
 */
/*
export function isInputValue<T, D extends number, C extends number>(object: unknown, dimension: D, width: C): object is Vector<Value<T, D>, C> {
  return isNotUndefined(object) && Array.isArray(object) && ((width === 1 && (dimension == 0 || object.length === dimension)) || width === 0 || object.length === width)
}
*/

/**
 * Type-guard method to check if the object is resolvable.
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the entity is resolvable.
 */
export function isResolvable<T, D extends number, C extends number>(object: unknown): object is IResolvable<T, D, C> {
  // At this point it is just a soft convention that an element is also resolvable
  return isNotUndefined(object) && (object as IElement).Type !== undefined
}
