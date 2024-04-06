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
 * @param {number} D dimension of input
 * @param {number} A number of arguments
 * @param {type} O Output type
 * @param {number} D dimension of input
 * @param {number} A number of arguments
 * @interface
 */
export interface ICompute<I, D extends number, A extends number, O, OD extends number, OA extends number> extends IDescribable, IData<O, OD, OA>, IElement {
  /**
   * Inputs for the computation are a source of N inputs.
   * @type {Input<I,D>}
   * @readonly
   */
  readonly Inputs: Input<I, D, A>

  /**
   * Return the number of arguments
   * @type {A}
   */
  readonly InputWidth: A

  /**
   * Output of the computation.
   *
   * It may be unresolved if not executed yet.
   *
   * Same as .Data?
   *
   * @type {IData<O,OD,OA>}
   * @readonly
   */
  readonly Output: IData<O, OD, OA>
}
