import { type IData } from './IData.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'
import { type ISource } from './ISource.js'
import { Value } from './Types/Value.js'
import { type Vector } from './Types/Vector.js'

/**
 * The type of the element.
 *
 * This is used to check types of elements.
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
 * Type guard method to check if the object is not undefined.
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isNotUndefined(object: unknown): object is object {
  return object !== undefined
}

/**
 * Type guard method to check if the a single source parameter.
 * @param {number} args The arguments global from the scope of the calling method.
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isOneSourceParameter<T, D extends number, A extends number>(args: number, object: unknown, rest: unknown): object is ISource<T, D, A> {
  return isSource(object) && !isParameters<T, D, A>(args, rest)
}

/**
 * Type guard method to check if the object is a source
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isSource<T, D extends number, A extends number>(object: unknown): object is ISource<T, D, A> {
  return isNotUndefined(object) && (object as ISource<T, D, A>).Type === ElementType.Source
}

/**
 * Type guard method to check if the object is data
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isData<T, D extends number, A extends number>(object: unknown): object is IData<T, D, A> {
  return isNotUndefined(object) && (object as IData<T, D, A>).Type === ElementType.Data
}

/**
 * Type guard method to check if the object is a single parameter
 * @param {number} args The arguments global from the scope of the calling method.
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isOneParameter<T, D extends number, A extends number>(args: number, object: unknown): object is T | IData<T, D, A> {
  return args === 1 && isNotUndefined(object)
}

/**
 * Type guard method to check if the object is a set of parameters
 * @param {number} args The arguments global from the scope of the calling method.
 * @param {unknown} object The object to identify.
 * @returns {boolean}
 */
export function isParameters<T, D extends number, A extends number>(args: number, object: unknown): object is (IData<T, D, A> | T)[] {
  return args > 1 && isNotUndefined(object) && Array.isArray(object) && object.length > 0
}

/**
 * Type guard method to check if the object is an array of values.
 * @param {unknown} object The object to identify.
 * @returns {boolean}
 */
export function isDataArray<T, D extends number, A extends number>(object: unknown): object is (IData<T, D, A> | T)[] {
  return isNotUndefined(object) && Array.isArray(object) && object.length > 0
}

/**
 * Type guard method to check if the object is an array of primitive types
 * @param {unknown} object The object to identify.
 * @returns {boolean}
 */
export function isPrimitiveArray<T>(object: unknown): object is T[] {
  return isNotUndefined(object) && Array.isArray(object) && object.length !== 0
}

/**
 * Type guard method to check if the object is an array of values.
 * @param {unknown} object The object to identify.
 * @returns {boolean}
 */
export function isInputValue<T, D extends number, A extends number>(object: unknown, dimension: D, width: A): object is Vector<Value<T, D>, A> {
  return isNotUndefined(object) && Array.isArray(object) && ((width === 1 && (dimension == 0 || object.length === dimension)) || width === 0 || object.length === width)
}

/**
 * Type guard method to check if the object is resolvable.
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the entity is resolvable.
 */
export function isResolvable<T, D extends number, R extends number>(object: unknown): object is IResolvable<T, D, R> {
  // At this point it is just a soft convention that an element is also resolvable
  return isNotUndefined(object) && (object as IElement).Type !== undefined
}
