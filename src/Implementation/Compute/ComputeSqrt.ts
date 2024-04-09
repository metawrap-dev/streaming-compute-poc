import { isResolvable, isSource } from '../../Design/Types/ElementType.js'
import { type Input, type InputPermissive } from '../../Design/Types/Input.js'
import { DataVariableNumber } from '../Data/Variable/DataVariableNumber.js'
import { StateComputeDot4 } from '../State/StateComputeDot4.js'
import { resolve } from '../Utility/Resolve.js'
import { Compute } from './Compute.js'

/**
 * This can perform `sqrt` on `scalar`
 *
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
  constructor(inputs: InputPermissive<number, 1, 1>) {
    super(inputs as Input<number, 1, 1>, new DataVariableNumber())
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
    if (isSource<number, 1, 1>(inputs)) {
      // ...if we are not waiting and there is no data then return with the null answer?
      if (!wait && inputs.Empty) return 0

      // We want to clock out results one at a time.
      inputs.Config.setBatchSize(1)

      // Get the value from the source (There will only be one because we set the batch size to 1.)
      const a = (await inputs.resolve(wait))[0]

      // Set the output value with the returned value from the source.
      this.set(Math.sqrt(a))
    } else if (isResolvable<number, 1, 1>(inputs)) {
      // Extract the values
      const a = await inputs.resolve(wait) // Why does this return a Value<T,D>?

      // Set the output value with resolved values returned value from the source.
      this.set(Math.sqrt(a))
    } else {
      // Resolve it as a Value
      const a = await resolve<number, 1, 1>(wait, inputs)

      // Set the output value.
      this.set(Math.sqrt(a))
    }

    // Return the resolved data
    return this.Data
  }
}
