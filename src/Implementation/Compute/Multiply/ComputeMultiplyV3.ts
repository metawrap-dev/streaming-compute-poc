import { type Arguments } from '../../../Design/Types/Arguments.js'
import { isResolvable, isSource } from '../../../Design/Types/ElementType.js'
import { type Input } from '../../../Design/Types/Input.js'
import { type Output } from '../../../Design/Types/Output.js'
import { type Value } from '../../../Design/Types/Value.js'
import { DataVariableNumber } from '../../Data/Variable/DataVariableNumber.js'
import { StateComputeMultiply } from '../../State/StateComputeMultiply.js'
import { multiplyN } from '../../Utility/Maths.js'
import { resolve } from '../../Utility/Resolve.js'
import { Compute } from '../Compute.js'

/**
 * This can multiply 3 of numbers from a `Vertical` vector `Column`.
 *
 * Provides an example GPU instruction primitive we can use for prototyping some ideas.
 *
 * @author James McParlane
 * @interface
 */
export class ComputeMultiplyV3 extends Compute<number, 1, 3, number, 1, 1> {
  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeMultiply = new StateComputeMultiply()

  /**
   * @constructor
   * @param {I} a The first input vector.
   */
  constructor(inputs: Input<number, 1, 3>) {
    // We pass in the inputs and the output object placeholder
    super(inputs, new DataVariableNumber())
  }

  /**
   * Evaluate the compute element.
   * @param {Value<number, 4>} a The vector to multiply
   * @returns {Promise<Output<number, 1, 1>>} The result of multiplying the elements of the vector together.
   * @note `true` for resolve needs to come from internal Config for the current resolve/code gen session.
   */
  async evaluate(...a: Arguments<Value<number, 1>, 3>): Promise<Output<number, 1, 1>> {
    return multiplyN(await resolve<number, 3, 1>(true, a))
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<number> {
    // Grab a reference here to we can reduce types as we progress through the type-guards
    const inputs = this.Inputs

    // Get the accumulator
    let accumulator = this.State.Accumulator

    // If it is a source...
    if (isSource<number, 1, 3>(inputs)) {
      // ...if we are not waiting and there is no data then return with the null answer?
      if (!wait && inputs.Empty) return 0

      // We want to clock out results one at a time.
      inputs.Config.setBatchSize(1)

      // Set the output value with the returned value from the source.
      accumulator *= multiplyN((await inputs.resolve(wait))[0])
    } else if (isResolvable<number, 4, 1>(inputs)) {
      accumulator *= multiplyN(await inputs.resolve(wait))
    } else {
      accumulator *= multiplyN(await resolve<number, 1, 3>(wait, inputs))
    }

    // Save the state
    this.State.setAccumulator(accumulator)

    // Set the result so far
    this.set(accumulator)

    // Return the resolved data
    return this.Data
  }
}
