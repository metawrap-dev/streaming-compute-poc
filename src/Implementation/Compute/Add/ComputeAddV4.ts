import { isResolvable, isSource } from '../../../Design/Types/ElementType.js'
import { type Input, type InputPermissive } from '../../../Design/Types/Input.js'
import { type Output } from '../../../Design/Types/Output.js'
import { DataVariableVectorV4 } from '../../Data/Variable/DataVariableVectorV4.js'
import { StateComputeMultiply } from '../../State/StateComputeMultiply.js'
import { add4 } from '../../Utility/Maths.js'
import { resolve } from '../../Utility/Resolve.js'
import { Compute } from '../Compute.js'

/**
 *
 *
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
   * @param {ISource<number> | number | IData<number>} input The input for the source that allows source chaining and composition
   */
  constructor(inputs: InputPermissive<number, 4, 2>) {
    super(inputs as Input<number, 4, 2>, new DataVariableVectorV4())
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<Output<number, 4, 1>> {
    // Grab a reference here to we can reduce types as we progress through the type-guards
    const inputs = this.Inputs

    // Get the accumulator
    // let accumulator = this.State.Accumulator

    // If it is a source...
    if (isSource<number, 4, 2>(inputs)) {
      // ...if we are not waiting and there is no data then return with the null answer?
      if (!wait && inputs.Empty) return [0, 0, 0, 0]

      // We want to clock out results one at a time.
      inputs.Config.setBatchSize(1)

      const r = await inputs.resolve(wait)

      console.log('r', r)

      const [a, b] = r[0]

      // Resolve one element from source and multiply
      this.set(add4(a, b))
    } else if (isResolvable<number, 4, 2>(inputs)) {
      //accumulator *= multiplyN(await inputs.resolve(wait))

      const [a, b] = await inputs.resolve(wait)

      // Resolve one element from source and multiply
      this.set(add4(a, b))
    } else {
      const [a, b] = await resolve<number, 4, 2>(wait, inputs)

      // Resolve one element from source and multiply
      this.set(add4(a, b))

      //accumulator *= multiplyN(await resolve<number, 1, 4>(wait, inputs))
    }

    // Save the state
    //this.State.setAccumulator(accumulator)

    // Set the result so far
    //this.set(accumulator)

    return this.Data
  }
}