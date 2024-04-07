import { isResolvable, isSource } from '../../Design/ElementType.js'
import { type Input, type InputPermissive } from '../../Design/Types/Input.js'
import { Cardinality, type Dimension } from '../../Design/Types/Vector.js'
import { DataNumber } from '../Data/DataNumber.js'
import { StateComputeDot4 } from '../State/StateComputeDot4.js'
import { dot4 } from '../Utility/Maths.js'
import { resolve } from '../Utility/Resolve.js'
import { Compute } from './Compute.js'

/**
 * This can perform `dot4` on `v4`
 *
 * Provides an example GPU primitive.
 *
 * @author James McParlane
 * @interface
 */
export class ComputeDot4 extends Compute<number, Dimension.V4, Cardinality.Two, number, Dimension.Scalar, Cardinality.One> {
  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeDot4 = new StateComputeDot4()

  /**
   * @constructor
   * @param {InputPermissive<number, Dimension.V4, 2>} input The input for dot4
   */
  constructor(inputs: InputPermissive<number, Dimension.V4, Cardinality.Two>) {
    // Assign inputs
    super(inputs as Input<number, Dimension.V4, Cardinality.Two>, Cardinality.Two, new DataNumber())
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
    if (isSource<number, Dimension.V4, Cardinality.Two>(inputs)) {
      // ...if we are not waiting and there is no data then return with the null answer?
      if (!wait && inputs.Empty) return 0

      // We want to clock out results one at a time.
      inputs.Config.setBatchSize(1)

      // Get the value from the source (There will only be one because we set the batch size to 1.)
      const [a, b] = (await inputs.resolve(wait))[0]

      // Set the output value with the returned value from the source.
      this.set(dot4(a, b))
    } else if (isResolvable<number, Dimension.V4, Cardinality.Two>(inputs)) {
      // Extract the values
      const [a, b] = await inputs.resolve(wait) // Why does this return a Value<T,D>?

      // Set the output value with resolved values returned value from the source.
      this.set(dot4(a, b))
    } else {
      // Resolve it as a Value
      const [a, b] = await resolve<number, Dimension.V4, Cardinality.Two>(wait, inputs)

      // Set the output value.
      this.set(dot4(a, b))
    }

    // Return the resolved data
    return this.Data
  }
}
