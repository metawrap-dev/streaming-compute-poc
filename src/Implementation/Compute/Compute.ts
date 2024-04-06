import { type ICompute } from '../../Design/ICompute.js'
import { type IData } from '../../Design/IData.js'
import { type IState } from '../../Design/IState.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementCompute } from '../Element/ElementCompute.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'
import { type Input, type Output } from '../Utility/Input.js'

/**
 * Abstract Generic [ICompute] element.
 *
 * @author James McParlane
 * @interface
 */
export abstract class Compute<I, N extends number, A extends number, O, ON extends number, OA extends number> extends ElementCompute implements ICompute<I, N, A, O, ON, OA> {
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
   * @type {Input<I, N, A>}
   * @readonly
   */
  readonly Inputs: Input<I, N, A>

  /**
   * What is the output of the multiplication.
   * @type {IData<O, ON, OA>}
   * @readonly
   */
  readonly Output: IData<O, ON, OA>

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
   * @param {O} value The value to set.
   */
  set(value: O): void {
    this.Output.set(value)
  }

  /**
   * The output as data.
   * @type {IData<O>}
   */
  get Data(): Output<O, ON, OA> {
    return this.Output.Data
  }

  /**
   * Return the number of arguments
   * @type {N}
   * @readonly
   */
  readonly InputWidth: A

  /**
   *
   * @param inputs
   * @param n
   * @param output
   */
  constructor(inputs: Input<I, N, A>, n: A, output: IData<O, ON, OA>) {
    super()
    this.Inputs = inputs
    this.Output = output
    this.InputWidth = n
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
  abstract resolve(wait?: boolean): Promise<Output<O, ON, OA>>
}
