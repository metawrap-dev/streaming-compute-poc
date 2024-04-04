import { type IData } from './IData.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'
import { type ISource } from './ISource.js'

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

  /**
   * Can take a source and stream it into a Compute element.
   */
  Streamer,
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
export function isOneSourceParameter<T>(args: number, object: unknown, rest: unknown): object is ISource<T> {
  return isSource(object) && !isParameters<T>(args, rest)
}

/**
 * Type guard method to check if the object is a source
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isSource<T>(object: unknown): object is ISource<T> {
  return isNotUndefined(object) && (object as ISource<T>).Type === ElementType.Source
}

/**
 * Type guard method to check if the object is a single parameter
 * @param {number} args The arguments global from the scope of the calling method.
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isOneParameter<T>(args: number, object: unknown): object is T | IData<T> {
  return args === 1 && isNotUndefined(object)
}

/**
 * Type guard method to check if the object is a set of parameters
 * @param {number} args The arguments global from the scope of the calling method.
 * @param {unknown} object The object to identify.
 * @returns {boolean}
 */
export function isParameters<T>(args: number, object: unknown): object is (IData<T> | T)[] {
  return args > 1 && isNotUndefined(object) && Array.isArray(object) && object.length > 0
}

/**
 * Type guard method to check if the object is an array of values.
 * @param {unknown} object The object to identify.
 * @returns {boolean}
 */
export function isDataArray<T>(object: unknown): object is (IData<T> | T)[] {
  return isNotUndefined(object) && Array.isArray(object) && object.length > 0
}

/**
 * Type guard method to check if the object is resolvable.
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the entity is resolvable.
 */
export function isResolvable<T>(object: unknown): object is IResolvable<T> {
  // At this point it is just a soft convention that an element is also resolvable
  return isNotUndefined(object) && (object as IElement).Type !== undefined
}
