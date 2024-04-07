import { type IData } from '../../Design/IData.js'
import { type ISettable } from '../../Design/ISettable.js'
import { type Output } from '../../Design/Types/Output.js'
import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementData } from '../Element/ElementData.js'
import { StateDataNumber } from '../State/StateDataNumber.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'
import { resolve } from '../Utility/Resolve.js'

/**
 * Implements a Value representation of a general number
 *
 * The below is overkill for a simple number, but this is just a toy example of how to implement a data element.
 * @class
 */
export class DataNumber extends ElementData implements IData<number, 1, 1>, ISettable<number, 1> {
  /**
   * The configuration for this number.
   * @type {ConfigCommon}
   * @readonly
   */
  readonly Config: ConfigCommon = new ConfigCommon()

  /**
   * The runtime state of the number.
   * @type {IState}
   * @readonly
   */
  readonly State: StateDataNumber<number, 1, 1> = new StateDataNumber<number, 1, 1>()

  /**
   * The strategy that can be applied to the number's config.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: StrategyCommon = new StrategyCommon()

  /**
   * The number value
   * @type {number}
   * @readonly
   */
  get Data(): Output<number, 1, 1> {
    if (this.Resolved) {
      return this.State.Number as Vector<Vector<number, 1>, 1>
    }
    throw new Error(`Number is not resolved.`)
  }

  /**
   * @constructor
   * @param {number} number The value of the number.
   */
  constructor(number?: Vector<Value<number, 1>, 1>) {
    super()
    this.State.setNumber(number)
    this.State.setResolved(number !== undefined)
  }

  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @readonly
   */
  get Resolved(): boolean {
    return this.State.Resolved
  }

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {
    if (this.Resolved) {
      return `{DataNumber <= ${this.State.Number.toString()}}`
    } else {
      return 'unresolved'
    }
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<Output<number, 1, 1>> {
    // Resolve and set it
    this.set(await resolve<number, 1, 1>(wait, this.State.Number))
    return this.Data
  }

  /**
   * Sets the value of the number data and marks it as resolved.
   * @param {number} value The value to set.
   */
  set(value: Output<number, 1, 1>): void {
    this.State.setNumber(value)
    this.State.setResolved(true)
  }
}
