import { type Argument } from '../../Design/Types/Arguments.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Output } from '../../Design/Types/Output.js'
import { DataStaticNumber } from '../Data/Static/DataStaticNumber.js'
import { StateComputeDot4 } from '../State/StateComputeDot4.js'
import { resolveValue } from '../Utility/Resolve.js'
import { Compute } from './Compute.js'

/**
 * Provides an example GPU instruction primitive we can use for prototyping some ideas.
 *
 * @author James McParlane
 * @interface
 */
export class ComputeSqrt extends Compute<number, 1, 1, number, 1, 1> {
  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeDot4 = new StateComputeDot4()

  /**
   * @constructor
   * @param {InputPermissive<number, 1, 1>} input The input for sqrt
   */
  constructor(...inputs: Input<number, 1, 1>) {
    super(inputs, new DataStaticNumber())
  }

  /**
   * Evaluate the compute element.
   * @param {Argument<number, 1>} a The a vector to add
   * @returns {Promise<Output<number, 1, 1>>}
   * @note `true` for resolve needs to come from internal Config for the current resolve/code gen session.
   */
  async evaluate(a: Argument<number, 1>): Promise<Output<number, 1, 1>> {
    return Math.sqrt(await resolveValue<number, 1>(true, a))
  }
}
