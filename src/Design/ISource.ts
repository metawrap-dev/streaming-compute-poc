import { type Input, type Output } from '../Implementation/Utility/Input.js'
import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'

/**
 * A source of multiple data elements.
 *
 * @author James McParlane
 * @interface
 */
export interface ISource<T, D extends number, A extends number> extends IDescribable, IElement {
  /**
   * If true then there is no more data to read.
   * @type {number}
   * @readonly
   */
  readonly Empty: boolean

  /**
   * The number atoms in the source.
   *
   * Infinity => unbounded
   * undefined => unknown
   *
   * @todo Get rid of this or make it undefined? if it is too costly to calculate.
   * @type {number | undefined}
   * @readonly
   */
  readonly Count: number | undefined

  /**
   * Resolve the source.
   * @param {boolean} wait If true then wait for batch sizes to be met.
   */
  resolve(wait?: boolean): Promise<Output<T, D, A>[]>

  /**
   * Queue some data to be fed into the source that can be resolved later on.
   * @param {} input The data to queue.
   * @async
   */
  queue(...input: Input<T, D, A>[]): Promise<void>
}
