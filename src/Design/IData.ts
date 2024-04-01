import { type IDescribable } from './IDescribable.js'
import { type IResolvable } from './IResolvable.js'

/**
 * Some form of data that can be fed into a compute element.
 *
 * @author James McParlane
 * @interface
 */
export interface IData<T> extends IDescribable, IResolvable<T> {
  /**
   * The data
   * @type {T}
   * @readonly
   */
  readonly Data: T

  /**
   * Sets the value of the data and marks it as resolved.
   * @param {T} value The value to set
   */
  // set(value: T): void
}
