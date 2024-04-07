import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type Input } from './Types/Input.js'
import { type Cardinality, type Dimension } from './Types/Vector.js'

/**
 * A destination for multiple data elements.
 *
 * We want a method to use this as just another output for a compute element.
 *
 * resolve() should be called when we are done writing to the destination (same as flushing a stream).
 *
 * @author James McParlane
 * @interface
 */
export interface IDestination<T, D extends Dimension, C extends Cardinality> extends IDescribable, IElement {
  /**
   * How how many elements the destination can store.
   * @type {number}
   * @readonly
   */
  readonly MaxSize: number

  /**
   * If true then there is no more data to write.
   * @type {number}
   * @readonly
   */
  readonly Empty: boolean

  /**
   * Resolve the destination.
   * @param {boolean} wait If true then wait for batch sizes to be met before writing
   */
  resolve(wait?: boolean): Promise<void>

  /**
   * Write some data to the destination.
   * @param {T} data The data to write.
   */
  write(...data: Input<T, D, C>[]): Promise<void>
}
