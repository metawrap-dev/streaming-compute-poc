import { isResolvable, isSource } from '../../Design/Types/ElementType.js'
import { type Input } from '../../Design/Types/Input.js'
import { DataVariableNumber } from '../Data/Variable/DataVariableNumber.js'
import { StateComputeLength4 } from '../State/StateComputeLength4.js'
import { length4 } from '../Utility/Maths.js'
import { resolve } from '../Utility/Resolve.js'
import { Compute } from './Compute.js'

/**
 * This can perform `length4` on `v4`
 *
 * Provides an example GPU small kernel we can use for prototyping some ideas.
 *
 * @author James McParlane
 * @interface
 */
export class ComputeLengthV4 extends Compute<number, 4, 1, number, 1, 1> {
  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeLength4 = new StateComputeLength4()

  /**
   * @constructor
   * @param {I} a The first input vector.
   */
  constructor(inputs: Input<number, 4, 1>) {
    // We pass in the inputs and the output object placeholder
    super(inputs, new DataVariableNumber())
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<number> {
    // Grab a reference here to we can reduce types as we progress through the type-guards
    const inputs = this.Inputs

    // If it is a source...
    if (isSource<number, 4, 1>(inputs)) {
      // ...if we are not waiting and there is no data then return with the null answer?
      if (!wait && inputs.Empty) return 0

      // We want to clock out results one at a time.
      inputs.Config.setBatchSize(1)

      const a = (await inputs.resolve(wait))[0]

      // Set the output value with the returned value from the source.
      this.set(length4(a))
    } else if (isResolvable<number, 4, 1>(inputs)) {
      // Extract the values
      const value = await inputs.resolve(wait) // Why does this return a Value<T,D>?

      // Set the output value with resolved values returned value from the source.
      this.set(length4(value))
    } else {
      // Resolve the whole set of arguments.
      const resolved = await resolve<number, 4, 1>(wait, inputs)

      // Set the output value.
      this.set(length4(resolved))
    }

    // Return the resolved data
    return this.Data
  }
}
