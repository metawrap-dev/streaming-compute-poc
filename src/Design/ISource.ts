import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'

/**
 * A source of multiple data elements.
 *
 * @author James McParlane
 * @interface
 */
export interface ISource<T> extends IDescribable, IResolvable<T[]>, IElement {
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
}
