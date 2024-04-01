import { type IData } from './IData.js'
import { type IDescribable } from './IDescribable.js'
import { type IResolvable } from './IResolvable.js'

/**
 * Something that can take some inputs and compute a value that is returned.
 *
 * For now we assume that the inputs are of the same type and the outputs are of the same type.
 *
 * @author James McParlane
 * @interface
 */
export interface ICompute<I, O> extends IDescribable, IResolvable<O>, IData<O> {
  /**
   * Inputs for the computation.
   * @type {IData<I>[]}
   */
  readonly Inputs: IData<I>[]

  /**
   * Outputs for the computation.
   * It may be unresolved if not executed
   * @type {IData}
   */
  readonly Output: IData<O>
}
