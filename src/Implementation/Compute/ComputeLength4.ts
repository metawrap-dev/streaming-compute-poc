import { isResolvable, isSource } from '../../Design/ElementType.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'
import { DataNumber } from '../Data/DataNumber.js'
import { StateComputeLength4 } from '../State/StateComputeLength4.js'
import { length4 } from '../Utility/Maths.js'
import { resolve, resolveWhole } from '../Utility/Resolve.js'
import { Compute } from './Compute.js'

/**
 * This can perform `length4` on `v4`
 *
 * @author James McParlane
 * @interface
 */
export class ComputeLength4 extends Compute<number, 4, 1, number, 1, 1> {
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
    super(inputs, 1, new DataNumber())
  }
  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<number> {
    // If it is a source...
    if (isSource<number, 4, 1>(this.Inputs)) {
      // ...if we are not waiting and there is no data then return with the null answer?
      if (!wait && this.Inputs.Empty) return 0

      // We want to clock out results one at a time.
      this.Inputs.Config.setBatchSize(1)

      const a = (await this.Inputs.resolve(wait))[0]

      // Set the output value with the returned value from the source.
      this.set(length4(a))
    } else if (isResolvable<number, 4, 1>(this.Inputs)) {
      // Extract the values
      const a = await this.Inputs.resolve(wait)

      // Set the output value with resolved values returned value from the source.
      this.set(length4(await resolve<number, 4>(wait, a)))
    } else {
      console.log(this.Inputs)

      console.log('this.Inputs', this.Inputs)

      const resolved = await resolveWhole<number, 4, 1>(wait, this.Inputs as Vector<Value<number, 4>, 1>)

      console.log('resolved', resolved)

      // Set the output value.
      this.set(length4(resolved))
    }

    // Return the resolved data
    return this.Data
  }
}
