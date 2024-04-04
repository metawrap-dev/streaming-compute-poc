import { isOneParameter, isOneSourceParameter, isParameters } from '../../Design/ElementType.js'
import { type ICompute } from '../../Design/ICompute.js'
import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { DataNumber } from '../Data/DataNumber.js'
import { ElementCompute } from '../Element/ElementCompute.js'
import { SourceMemory } from '../Source/SourceMemory.js'
import { StateComputeMultiply } from '../State/StateComputeMultiply.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'

/**
 * This can multiply numbers together
 *
 * @author James McParlane
 * @interface
 */
export class ComputeMultiply extends ElementCompute implements ICompute<number, number> {
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
  readonly Inputs: ISource<number>

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

  /**
   * @constructor
   * @param {ISource<number> | number | IData<number>} input The input for the source that allows source chaining and composition
   */
  constructor(input: ISource<number> | number | IData<number>, ...rest: (number | IData<number>)[]) {
    super()

    console.log('ComputeMultiply:input ', input)
    console.log('ComputeMultiply:rest ', rest)

    // How many arguments did we get?
    const args = arguments.length

    // Is this a data-source?
    if (isOneSourceParameter<number>(args, input, rest)) {
      // Yes it is. We can use it directly.
      console.log('ComputeMultiply: Source passed')
      this.Inputs = input
    } else if (isParameters<number>(args, rest)) {
      // Is it multiple parameters?
      console.log('ComputeMultiply: Parameters passed')
      this.Inputs = new SourceMemory<number>(input, ...rest)
    } else if (isOneParameter<number>(args, input)) {
      // Is it just a single parameter
      console.log('ComputeMultiply: One parameter passed')
      this.Inputs = new SourceMemory<number>(input)
    } else {
      // Not a combination we can handle.
      throw new Error(`ComputeMultiply: Invalid parameters`)
    }
  }

  /**
   * The output as data.
   * @type {IData<number>}
   */
  get Data(): number {
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
    return out.join(' ')
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(_wait: boolean = false): Promise<number> {
    // Enforce the batch size of 1 for this compute element

    let accumulator = this.State.Accumulator

    // If there is no input then we are done.
    // if (this.Inputs.Empty) return accumulator

    this.Inputs.Config.setBatchSize(1)

    // Multiply all the inputs together one element at at time.
    while (!this.Inputs.Empty) {
      console.log(`Try.... ${this.Inputs.Empty}`)

      const resolved = await this.Inputs.resolve()

      console.log(`this.Inputs.resolve() => `, resolved)

      accumulator *= resolved[0]
    }

    // Set the state
    this.State.setAccumulator(accumulator)

    // Set the output value
    this.Output.set(accumulator)

    // Be done.
    return this.Output.Data
  }
}
