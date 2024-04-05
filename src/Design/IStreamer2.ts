import { type ICompute } from './ICompute.js'
import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type ISource } from './ISource.js'

/**
 * Takes a source of data and streams it into a Compute Element.
 *
 * The Compute element
 *
 * @author James McParlane
 * @interface
 */
export interface IStreamer2<I, J, O> extends IDescribable, IElement {
  /**
   * The stream element we are streaming from.
   * @type {ISource<I>}
   * @readonly
   */
  readonly Source: ISource<[I, J]>

  /**
   * The compute element that will process the data.
   * @type {ICompute<I,O>}
   * @readonly
   */
  readonly Compute: ICompute<[I, J], O>

  /**
   * Resolve the streamer.
   * @param {boolean} [wait=false]
   */
  resolve(wait?: boolean): Promise<void>
}
