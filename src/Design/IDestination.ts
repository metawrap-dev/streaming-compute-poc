import { type IData } from './IData.js'
import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type ISource } from './ISource.js'
import { type Value } from './Types/Value.js'
import { type Vector } from './Types/Vector.js'

/**
 * Represents a destination within a data processing system, capable of accepting, storing, and
 * finalizing data elements for further use or storage. It serves as a potential output target for
 * compute elements, providing functionalities to manage data flow and signal completion of data
 * ingestion. This interface is designed to abstract over the complexities of data storage or forwarding
 * mechanisms, allowing for a uniform way to handle data output across various parts of a system.
 *
 * @template T Type of data the destination can accept.
 * @template D Dimensionality of the accepted data, specifying its structural complexity.
 * @template C Cardinality, indicating how many items of type T the destination can handle at once.
 * @extends IDescribable Provides a standard method for generating a description of the destination.
 * @extends IElement Marks this as a fundamental part of the system's architecture.
 * @author James McParlane
 * @interface
 */
export interface IDestination<T, D extends number, C extends number> extends IDescribable, IElement {
  /**
   * The maximum number of elements the destination is configured to store. This property
   * provides insight into the capacity limitations of the destination, guiding data flow control
   * and management within processing routines.
   *
   * @type {number}
   * @readonly
   */
  readonly MaxSize: number

  /**
   * Indicates whether the destination currently holds no data. This property can be used to
   * check the state of the destination, especially useful in scenarios where data writing
   * and flushing mechanisms are conditional on the destination's occupancy.
   *
   * @type {boolean}
   * @readonly
   */
  readonly Empty: boolean

  /**
   * Signals the completion of data writing to the destination, optionally waiting for certain
   * conditions such as batch sizes to be met. This method resembles flushing a stream, ensuring
   * that all pending data operations are finalized before proceeding.
   *
   * @param {boolean} [wait=false] If true, the resolution will await the fulfillment of certain
   * conditions like batch completion before finalizing the destination state.
   * @returns {Promise<void>}
   */
  resolve(wait?: boolean): Promise<void>

  /**
   * Accepts one or more data items and schedules them for writing to the destination. This asynchronous
   * method accommodates the dynamic nature of data flow, allowing for buffered writing or immediate
   * forwarding based on the system's configuration and state.
   *
   * @param {...Input<T, D, C>[]} data Variadic arguments of data items to write, encapsulated in `Input` types.
   * @returns {Promise<void>}
   */
  write(...input: (ISource<T, D, C> | Vector<Value<T, D>, C> | IData<T, D, C>)[]): Promise<void>
}
