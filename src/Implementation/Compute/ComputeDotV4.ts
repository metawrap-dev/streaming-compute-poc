import { type Argument } from '../../Design/Types/Arguments.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Output } from '../../Design/Types/Output.js'
import { DataVariableNumber } from '../Data/Variable/DataVariableNumber.js'
import { StateComputeDot4 } from '../State/StateComputeDot4.js'
import { dot4 } from '../Utility/Maths.js'
import { resolveValue } from '../Utility/Resolve.js'
import { Compute } from './Compute.js'

/**
 * Provides an example GPU instruction primitive we can use for prototyping some ideas.
 *
 * @author James McParlane
 * @interface
 */
export class ComputeDotV4 extends Compute<number, 4, 2, number, 1, 1> {
  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeDot4 = new StateComputeDot4()

  /**
   * @constructor
   * @param {Input<number, 4, 2>} input The input for dot4
   */
  constructor(...inputs: Input<number, 4, 2>) {
    super(inputs, new DataVariableNumber())
  }

  /**
   * Evaluate the compute element.
   * @param {Argument<number, 4>} a The a vector to get the dot product of
   * @param {Argument<number, 4>} b The b vector to get the dot product of
   * @returns {Promise<Output<number, 4, 1>>}
   * @note `true` for resolveValue needs to come from internal Config for the current resolve/code gen session.
   */
  async evaluate(a: Argument<number, 4>, b: Argument<number, 4>): Promise<Output<number, 1, 1>> {
    return dot4(await resolveValue<number, 4>(true, a), await resolveValue<number, 4>(true, b))
  }
}
