import { type ICompute } from '../../Design/ICompute.js'
import { type IData } from '../../Design/IData.js'
import { type IState } from '../../Design/IState.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Output } from '../../Design/Types/Output.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementCompute } from '../Element/ElementCompute.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'

/**
 * Abstract Generic [ICompute] element.
 *
 * @author James McParlane
 * @interface
 * @template {type} IT The compute input type
 * @template {Dimension} ID The compute input dimension (The width of the input vector)
 * @template {Cardinality} IC The compute input cardinality (The number of items consumed by an invocation)
 * @template {type} IT The compute output type
 * @template {Dimension} ID The compute output dimension (The width of the output vector)
 * @template {Cardinality} IC The compute output cardinality (The number of items emitted by an invocation)
 */
export abstract class Compute<IT, ID extends number, IC extends number, OT, OD extends number, OC extends number> extends ElementCompute implements ICompute<IT, ID, IC, OT, OD, OC> {
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
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {
    const out: string[] = []
    out.push('{')
    out.push(this.constructor.name)
    out.push(this.Inputs.toString())
    out.push('=>')
    out.push(this.Output.toString())
    out.push('}')
    return out.join('')
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   * @abstract
   */
  abstract resolve(wait?: boolean): Promise<Output<OT, OD, OC>>
}
