import { type Output } from './Types/Output.js'

/**
 * Defines an entity capable of being resolved into a concrete value, after which it requires no further processing.
 * This interface outlines the structure for asynchronously resolving objects, typically involving operations that
 * may depend on external data sources or computationally intensive processes. The resolved data adheres to specified
 * type, dimension, and cardinality constraints, ensuring consistency and predictability in usage.
 *
 * @template T The type of the resolved object, determining the nature of the data produced upon resolution.
 * @template D The dimensionality of the resolved object, indicating the structure or complexity of the data.
 * @template C The cardinality, or number of objects, that are resolved, specifying the quantity of data items.
 * @interface
 */
export interface IResolvable<T, D extends number, C extends number> {
  /**
   * Indicates whether the entity has been resolved. This flag is typically managed within the entity's state,
   * serving as a checkpoint to ascertain if further actions are required or if the entity's data is ready for use.
   *
   * @type {boolean}
   * @readonly
   */
  readonly Resolved: boolean

  /**
   * Asynchronously resolves the entity, potentially awaiting prerequisites such as specific batch sizes or other
   * conditions before proceeding. This method embodies the process of bringing the entity to its final, usable state.
   *
   * @param {boolean} [wait=false] Specifies whether to delay resolution until certain conditions are met, such as the
   * accumulation of a predetermined batch size.
   * @returns {Promise<Output<T, D, C>>} A promise that resolves to the final data, conforming to the specified
   * type, dimension, and cardinality.
   * @async
   */
  resolve(wait?: boolean): Promise<Output<T, D, C>>

  /**
   * Provides access to the data resulting from the resolution process. This property is populated once `resolve`
   * completes, offering a read-only view of the final, processed data.
   *
   * @type {Output<T, D, C>}
   * @readonly
   */
  readonly Data: Output<T, D, C>
}
