import { type ICompute } from '../../Design/ICompute.js'
import { isResolvable, isSource } from '../../Design/Types/ElementType.js'
import { type Input, type InputPermissive } from '../../Design/Types/Input.js'
import { type Output } from '../../Design/Types/Output.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { DataNumber } from '../Data/DataNumber.js'
import { ElementCompute } from '../Element/ElementCompute.js'
import { StateComputeMultiply } from '../State/StateComputeMultiply.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'
import { multiplyN } from '../Utility/Maths.js'
import { resolve } from '../Utility/Resolve.js'

/**
 * This can multiply any number of numbers from a `Vertical` vector `Column`.
 *
 * Provides an example GPU small kernel that can be built up with other instructions
 *
 * eg. We implement it with sets of multiply4/3/2
 *
 * @author James McParlane
 * @interface
 */
export class ComputeMultiplyVN extends ElementCompute implements ICompute<number, 1, 0, number, 1, 1> {
  /**
   * The configuration for the compute multiply.
   * This is the applied strategy.
   * @type {IConfig}
   * @readonly
   */
  readonly Config: ConfigCommon = new ConfigCommon()

  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeMultiply = new StateComputeMultiply()

  /**
   * The strategy that can be applied to the compute multiply's config.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: StrategyCommon = new StrategyCommon()

  /**
   * Inputs for the computation.
   * We massage everything into a source.
   * @type {ISource<I>}
   * @readonly
   */
  readonly Inputs: Input<number, 1, 0>

  /**
   * What is the output of the multiplication.
   * @type {DataNumber}
   * @readonly
   */
  readonly Output: DataNumber = new DataNumber()

  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @readonly
   */
  get Resolved(): boolean {
    return this.Output.Resolved
  }

  InputWidth: 0

  /**
   * @constructor
   * @param {ISource<number> | number | IData<number>} input The input for the source that allows source chaining and composition
   */
  constructor(input: InputPermissive<number, 1, 0>) {
    super()

    console.log('ComputeMultiply:input ', input)

    this.Inputs = input as Input<number, 1, 0>
  }

  /**
   * The output as data.
   * @type {IData<number>}
   */
  get Data(): Output<number, 1, 1> {
    return this.Output.Data
  }

  /**
   * Sets the value of the output
   * @param {number} value The value to set.
   */
  set(value: number): void {
    this.Output.set(value)
  }

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {
    const out: string[] = []
    out.push('(')

    out.push('multiply')

    out.push(this.Inputs.toString())

    out.push('=>')
    out.push(this.Output.toString())
    out.push(')')
    return out.join('')
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<Output<number, 1, 1>> {
    // Grab a reference here to we can reduce types as we progress through the type-guards
    const inputs = this.Inputs

    // Get the accumulator
    let accumulator = this.State.Accumulator

    // If it is a source...
    if (isSource<number, 1, 0>(inputs)) {
      // ...if we are not waiting and there is no data then return with the null answer?
      if (!wait && inputs.Empty) return 0

      // We want to clock out results one at a time.
      inputs.Config.setBatchSize(1)

      // Get the value from the source
      accumulator *= multiplyN((await inputs.resolve(wait))[0])

      // Set the output value with the returned value from the source.
    } else if (isResolvable<number, 1, 0>(inputs)) {
      // Extract the values
      const value = await inputs.resolve(wait) // Why does this return a Value<T,D>?

      // Set the output value with resolved values returned value from the source.
      accumulator *= multiplyN(value)
    } else {
      // Resolve the whole vector
      const resolved = await resolve<number, 1, 0>(wait, inputs)

      // Set the output value.
      accumulator *= multiplyN(resolved)
    }

    // Save the state
    this.State.setAccumulator(accumulator)

    // Set the result so far
    this.set(accumulator)

    // Return the result.
    return this.Data
  }
}
