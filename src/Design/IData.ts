import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'
import { type Output } from './Types/Output.js'

/**
 * `IData` interface defines a structured data element for computation and processing within a system.
 * It combines descriptive, resolvable, and elemental traits to handle multi-dimensional and variable-cardinality data.
 *
 * @template T Type of data elements (e.g., number, string, custom types).
 * @template D Dimensionality of data (defines the data structure).
 * @template C Cardinality of data (defines the quantity of data items).
 *
 * @extends IDescribable Adds description/metadata capabilities.
 * @extends IResolvable Marks data as ready or pending for processing.
 * @extends IElement Integrates into the system's element hierarchy.
 * @author James McParlane
 * @interface
 */
export interface IData<T, D extends number, C extends number> extends IDescribable, IResolvable<T, D, C>, IElement {
  /**
   * Sets the data value, marking it as resolved. Allows dynamic updates in response to computations.
   *
   * @param {Output<T, D, C>} value New data, adhering to specified `D` and `C`.
   */
  set(value: Output<T, D, C>): void

  /**
   * Provides the resolved data, ensuring integrity and immutability for safe access and further processing.
   *
   * @type {Output<T, D, C>}
   */
  readonly Data: Output<T, D, C>
}
