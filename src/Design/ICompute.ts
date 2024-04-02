import { type IData } from './IData.js'
import { type IDataWithoutIElement } from './IDataWithoutType.js'
import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'
import { type ISource } from './ISource.js'

/**
 * A Compute ELement: Something that can take some inputs and compute a value that is returned.
 *
 * For now we assume that the inputs are of the same type.
 *
 * @author James McParlane
 * @interface
 */
export interface ICompute<I, O> extends IDescribable, IResolvable<O>, IDataWithoutIElement<O>, IElement {
  /**
   * Inputs for the computation.
   * @type {ISource<I>}
   * @readonly
   */
  readonly Inputs: ISource<I>

  /**
   * Output of the computation.
   *
   * It may be unresolved if not executed yet.
   * @type {IData}
   * @readonly
   */
  readonly Output: IData<O>
}
