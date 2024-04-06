import { isPrimitiveArray, isResolvable, isSource } from '../../Design/ElementType.js'
import { type Input } from '../../Design/Types/Input.js'
import { DataNumber } from '../Data/DataNumber.js'
import { StateComputeLength4 } from '../State/StateComputeLength4.js'
import { length4 } from '../Utility/Maths.js'
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

      // We want to clock our results one at a time.
      this.Inputs.Config.setBatchSize(1)

      // Set the output value with the returned value from the source.
      this.set(await length4((await this.Inputs.resolve(wait))[0]))
    } else if (isResolvable<number, 4, 1>(this.Inputs)) {
      // Resolve and set the value.
      this.set(await length4(await this.Inputs.resolve()))
    } else if (isPrimitiveArray<number>(this.Inputs)) {
      // Set the output value.
      this.set(await length4(this.Inputs))
    }

    return this.Data
  }
}
