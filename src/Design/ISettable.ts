import { type Output } from './Types/Output.js'

/**
 * Defines a generic interface for objects that can be explicitly assigned a value of a specified type, dimension,
 * and cardinality. This contract ensures compatibility with structured data encapsulated by `Output`, allowing for
 * dynamic updates to the state or content of implementing entities.
 *
 * @todo Consider if this should be limited to concrete types to ensure type safety and predictability in data handling.
 *
 * @template T Type of the data to be set, determining the nature of the content.
 * @template D Dimensionality of the data, indicating its structural complexity.
 * @template C Cardinality, specifying the quantity of data items represented.
 * @interface
 */
export interface ISettable<T, D extends number, C extends number> {
  /**
   * Assigns a new value to the object, updating its current state or content. The method accepts an `Output` object
   * as its argument, which encapsulates the new value conforming to the specified type, dimension, and cardinality
   * parameters. This operation allows for the controlled modification of the object's data, facilitating a wide range
   * of data processing and management tasks.
   *
   * @param {Output<T, D, C>} value The new value to be assigned to the object.
   */
  set(value: Output<T, D, C>): void
}
