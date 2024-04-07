import { isResolvable, isSource } from '../../Design/ElementType.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'
import { DataNumber } from '../Data/DataNumber.js'
import { StateComputeDot4 } from '../State/StateComputeDot4.js'
import { dot4 } from '../Utility/Maths.js'
import { resolve, resolveWhole } from '../Utility/Resolve.js'
import { Compute } from './Compute.js'

/**
 * This can perform `dot4` on `v4`
 *
 * @author James McParlane
 * @interface
 */
export class ComputeDot4 extends Compute<number, 4, 2, number, 1, 1> {
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
  constructor(inputs: Input<number, 4, 2>) {
    // Assign inputs
    super(inputs, 2, new DataNumber())
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<number> {
    // If it is a source...
    if (isSource<number, 4, 2>(this.Inputs)) {
      // ...if we are not waiting and there is no data then return with the null answer?
      if (!wait && this.Inputs.Empty) return 0

      // We want to clock out results one at a time.
      this.Inputs.Config.setBatchSize(1)

      const [a, b] = (await this.Inputs.resolve(wait))[0]

      // Set the output value with the returned value from the source.
      this.set(dot4(a, b))
    } else if (isResolvable<number, 4, 2>(this.Inputs)) {
      // Extract the values
      const [a, b] = await this.Inputs.resolve(wait)

      // Set the output value with resolved values returned value from the source.
      this.set(dot4(await resolve<number, 4>(wait, a), await resolve<number, 4>(wait, b)))
    } else {
      console.log(this.Inputs)

      console.log('this.Inputs', this.Inputs)

      const resolved = await resolveWhole<number, 4, 2>(wait, this.Inputs as Vector<Value<number, 4>, 2>)

      console.log('resolved', resolved)

      // Set the output value.
      this.set(dot4(resolved[0], resolved[1]))
    }

    // Return the resolved data
    return this.Data
  }
}
