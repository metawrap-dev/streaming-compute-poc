import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type Input } from './Types/Input.js'
import { type Output } from './Types/Output.js'

/**
 * Represents a source capable of supplying multiple data elements, potentially for processing or computation.
 * Extends `IDescribable` for descriptive capabilities and `IElement` for its role within an architectural framework.
 * This interface is designed to abstract over data provision, supporting operations to check data availability,
 * enumerate data, resolve data for consumption, and queue additional data for future resolution.
 *
 * @template T The type of data provided by the source.
 * @template D The dimensionality of the provided data, indicating its structural form.
 * @template C The cardinality of the data, specifying how many items are expected or can be handled.
 * @interface
 */
export interface ISource<T, D extends number, C extends number> extends IDescribable, IElement {
  /**
   * Indicates whether the source has been depleted of data. Useful for determining if further reads will yield data.
   * @type {boolean}
   * @readonly
   */
  readonly Empty: boolean

  /**
   * Provides information on the quantity of data elements available from the source. This property can express
   * unbounded sources (Infinity), sources with a calculable count, or cases where the count is indeterminate (undefined).
   * @todo Consider simplifying by exclusively using `undefined` for indeterminate counts to reduce complexity.
   * @type {number | undefined | typeof Infinity}
   * @readonly
   */
  readonly Count: number | undefined | typeof Infinity

  /**
   * Asynchronously resolves the source to a collection of data elements, optionally waiting to accumulate a specified batch size.
   * This method facilitates controlled data extraction, accommodating scenarios requiring bulk or timed data retrieval.
   *
   * @param {boolean} [wait=false] Specifies whether resolution should await the fulfillment of batch size requirements.
   * @returns {Promise<Output<T, D, C>[]>} A promise resolving to an array of data elements structured according to specified type, dimension, and cardinality.
   */
  resolve(wait?: boolean): Promise<Output<T, D, C>[]>

  /**
   * Queues data for future resolution, enabling dynamic data provisioning. This method allows the source to be replenished or augmented
   * with additional data elements, supporting flexible and adaptive data supply strategies.
   *
   * @param {...Input<T, D, C>[]} input Variable number of data elements to queue, each conforming to the specified type, dimension, and cardinality.
   * @returns {Promise<void>}
   */
  queue(...input: Input<T, D, C>[]): Promise<void>
}
