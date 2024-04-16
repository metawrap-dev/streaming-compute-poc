import { type Argument } from '../../../Design/Types/Arguments.js'
import { type Input } from '../../../Design/Types/Input.js'
import { type Output } from '../../../Design/Types/Output.js'
import { DataVariableNumber } from '../../Data/Variable/DataVariableNumber.js'
import { StateComputeMultiply } from '../../State/StateComputeMultiply.js'
import { multiplyN } from '../../Utility/Maths.js'
import { resolveValue } from '../../Utility/Resolve.js'
import { Compute } from '../Compute.js'

/**
 * Provides an example GPU instruction primitive we can use for prototyping some ideas.
 *
 * @author James McParlane
 * @interface
 */
export class ComputeMultiplyVN extends Compute<number, 0, 1, number, 1, 1> {
  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeMultiply = new StateComputeMultiply()

  /**
   * @constructor
   * @param Input<number, 0, 1>I} a The first input vector.
   */
  constructor(...inputs: Input<number, 0, 1>) {
    // We pass in the inputs and the output object placeholder
    super(inputs, new DataVariableNumber())
  }

  /**
   * Evaluate the compute element.
   * @param {Argument<number, 0>} a The a vector to add
   * @returns {Promise<Output<number, 1, 1>>}
   * @note `true` for resolve needs to come from internal Config for the current resolve/code gen session.
   */
  async evaluate(a: Argument<number, 0>): Promise<Output<number, 1, 1>> {
    return multiplyN(await resolveValue<number, 0>(true, a))
  }
}
