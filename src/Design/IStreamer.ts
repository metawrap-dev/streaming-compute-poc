import { type ICompute } from './ICompute.js'
import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'
import { type ISource } from './ISource.js'

/**
 * Takes a source of data and streams it into a Compute Element.
 * @author James McParlane
 * @interface
 */
export interface IStreamer<I, O> extends IDescribable, IResolvable<O[]>, IElement {
  /**
   * The stream element we are streaming from.
   * @type {ISource<I>}
   * @readonly
   */
  readonly Source: ISource<I>

  /**
   * The compute element that will process the data.
   * @type {ICompute<I,O>}
   * @readonly
   */
  readonly Compute: ICompute<I, O>
}
