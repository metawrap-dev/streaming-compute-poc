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
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isOneSourceParameter<T>(object: unknown, rest: unknown): object is ISource<T> {
  return isNotUndefined(object) && (object as ISource<T>).Type === ElementType.Source && !isParameters<T>(rest)
}

/**
 * Type guard method to check if the object is a single parameter
 * @param {unknown} object The object to identify.
 * @returns {boolean} True if the object is a source.
 */
export function isOneParameter<T>(object: unknown): object is T | IData<T> {
  return isNotUndefined(object)
}

/**
 * Type guard method to check if the object is a set of parameters
 * @param {unknown} object The object to identify.
 * @returns {boolean}
 */
export function isParameters<T>(object: unknown): object is (IData<T> | T)[] {
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
