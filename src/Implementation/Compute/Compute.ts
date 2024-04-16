import { type ICompute } from '../../Design/ICompute.js'
import { type IData } from '../../Design/IData.js'
import { type IState } from '../../Design/IState.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Output } from '../../Design/Types/Output.js'
import { describe } from '../../Implementation/Utility/Describe.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementCompute } from '../Element/ElementCompute.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'

/**
 * Abstract Generic [ICompute] element.
 * @author James McParlane
 * @template {type} IT The compute input type
 * @template {Dimension} ID The compute input dimension (The width of the input vector)
 * @template {Cardinality} IC The compute input cardinality (The number of items consumed by an invocation)
 * @template {type} IT The compute output type
 * @template {Dimension} ID The compute output dimension (The width of the output vector)
 * @template {Cardinality} IC The compute output cardinality (The number of items emitted by an invocation)
 * @class
 */
export abstract class Compute<const IT, const ID extends number, const IC extends number, const OT, const OD extends number, const OC extends number> extends ElementCompute implements ICompute<IT, ID, IC, OT, OD, OC> {
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
  abstract readonly State: IState

  /**
   * The strategy that can be applied to the compute multiply's config.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: StrategyCommon = new StrategyCommon()

  /**
   * Inputs for the computation.
   * We massage everything into a source.
   * @type {Input<IT, ID, IC>}
   * @readonly
   */
  readonly Inputs: Input<IT, ID, IC>

  /**
   * Indicates whether the entity can be recycled and used again.
   * @type {boolean}
   * @readonly
   */
  readonly Recyclable: boolean = true

  /**
   * What is the output of the multiplication.
   * @type {IData<OT, OD, OC>}
   * @readonly
   */
  readonly Output: IData<OT, OD, OC>

  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @readonly
   */
  get Resolved(): boolean {
    return this.Output.Resolved
  }

  /**
   * Sets the value of the output
   * @param {Output<OT,OD,OC} value The value to set.
   */
  set(value: Output<OT, OD, OC>): void {
    this.Output.set(value)
  }

  /**
   * The output as data.
   * @type {IData<OT>}
   */
  get Data(): Output<OT, OD, OC> {
    return this.Output.Data
  }

  /**
   *
   * @param inputs
   * @param output
   */
  constructor(inputs: Input<IT, ID, IC>, output: IData<OT, OD, OC>) {
    super()
    this.Inputs = inputs
    this.Output = output
  }

  /**
   * Evaluate the arguments
   * @param {Input<IT, ID, IC>} input Input to another
   */
  abstract evaluate(...inputs: Input<IT, ID, IC>): Promise<Output<OT, OD, OC>>

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {
    const out: string[] = []
    out.push('{')
    out.push(this.constructor.name)
    out.push(describe(this.Inputs as any))
    out.push('=>')
    out.push(describe(this.Output))
    out.push('}')
    return out.join('')
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [_wait=false] If true then wait for batch sizes to be met.
   * @note `_wait` for resolve needs to go to internal Config for the current resolve/code gen session.
   * @async
   */
  async resolve(_wait: boolean = false): Promise<Output<OT, OD, OC>> {
    // Evaluate and set the result.
    this.set(await this.evaluate(...this.Inputs))

    // Return it
    return this.Data
  }
}
