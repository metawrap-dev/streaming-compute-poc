import { type Argument } from '../../../Design/Types/Arguments.js'
import { type Input } from '../../../Design/Types/Input.js'
import { type Output } from '../../../Design/Types/Output.js'
import { DataVariableVectorV4 } from '../../Data/Variable/DataVariableVectorV4.js'
import { StateComputeMultiply } from '../../State/StateComputeMultiply.js'
import { add4 } from '../../Utility/Maths.js'
import { resolveValue } from '../../Utility/Resolve.js'
import { Compute } from '../Compute.js'

/**
 * Provides an example GPU instruction primitive we can use for prototyping some ideas.
 *
 * @author James McParlane
 * @interface
 */
export class ComputeAddV4 extends Compute<number, 4, 2, number, 4, 1> {
  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeMultiply = new StateComputeMultiply()

  /**
   * @constructor
   * @param {Input<number, 4, 2} input The input for the source that allows source chaining and composition
   */
  constructor(...inputs: Input<number, 4, 2>) {
    super(inputs, new DataVariableVectorV4())
  }

  /**
   * Evaluate the compute element.
   * @param {Argument<number, 4>} a The a vector to add
   * @param {Argument<number, 4>} b The b vector to add
   * @returns {Promise<Output<number, 4, 1>>}
   * @note `true` for resolve needs to come from internal Config for the current resolve/code gen session.
   */
  async evaluate(a: Argument<number, 4>, b: Argument<number, 4>): Promise<Output<number, 4, 1>> {
    return add4(await resolveValue<number, 4>(true, a), await resolveValue<number, 4>(true, b))
  }
}
