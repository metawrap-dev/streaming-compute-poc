import { isSource } from '../../../Design/Types/ElementType.js'
import { type Input, type InputPermissive } from '../../../Design/Types/Input.js'
import { type Output } from '../../../Design/Types/Output.js'
import { type Value } from '../../../Design/Types/Value.js'
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
  constructor(inputs?: InputPermissive<number, 4, 2>) {
    super(inputs as Input<number, 4, 2>, new DataVariableVectorV4())
  }

  /**
   * Evaluate the compute element.
   * @param {Value<number, 4>} a The a vector to add
   * @param {Value<number, 4>} b The b vector to add
   * @returns {Promise<Output<number, 4, 1>>}
   * @note `true` for resolve needs to come from internal Config for the current resolve/code gen session.
   */
  async evaluate(a: Value<number, 4>, b: Value<number, 4>): Promise<Output<number, 4, 1>> {
    return add4(await resolve<number, 4, 1>(true, a), await resolve<number, 4, 1>(true, b))
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<Output<number, 4, 1>> {
    // Grab a reference here to we can reduce types as we progress through the type-guards
    const inputs = this.Inputs

    // If it is a source...
    if (isSource<number, 4, 2>(inputs)) {
      // ...if we are not waiting and there is no data then return with the null answer?
      if (!wait && inputs.Empty) return [0, 0, 0, 0]

      // We want to clock out results one at a time.
      inputs.Config.setBatchSize(1)

      // Dereference the first item to clock out of the source
      const [a, b] = (await inputs.resolve(wait))[0]

      // Add and set
      this.set(add4(a, b))
    } else {
      // Dereference the arguments.
      const [a, b] = await resolve<number, 4, 2>(wait, inputs)

      this.set(await this.evaluate(a, b))
    }
    return this.Data
  }
}
