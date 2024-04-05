import { type Input } from '../Implementation/Utility/Input.js'
import { type IData } from './IData.js'
import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'

/**
 * A Compute ELement: Something that can take some inputs and compute a value that is returned.
 *
 * For now we assume that the inputs are of the same type.
 *
 * @author James McParlane
 * @param {type} I Input type
 * @param {number} N Number of arguments
 * @param {type} O Output type
 * @interface
 */
export interface ICompute<I,N extends number,O> extends IDescribable, IResolvable<O>, IData<O>, IElement {
  /**
   * Inputs for the computation are a source of N inputs.
   * @type {Input<I,N>}
   * @readonly
   */
  readonly Inputs: Input<I,N>

  /**
   * Return the number of arguments
   * @type {N}
   */
  readonly InputWidth: N

  /**
   * Output of the computation.
   *
   * It may be unresolved if not executed yet.
   * @type {IData}
   * @readonly
   */
  readonly Output: IData<O>
}
