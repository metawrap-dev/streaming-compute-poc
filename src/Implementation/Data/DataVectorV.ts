import { type IData } from '../../Design/IData.js'
import { type ISettable } from '../../Design/ISettable.js'
import { type Output } from '../../Design/Types/Output.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementData } from '../Element/ElementData.js'
import { StateDataVectorN } from '../State/StateDataVectorN.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'
import { resolve } from '../Utility/Resolve.js'

/**
 * Example of an entity with Dimension Unlimited and Cardinality 1
 *
 * "Vertical" vector.
 *
 *```
 *  +-  -+
 *  | n1 |
 *  | n2 |
 *  | n3 |
 *  | nN |
 *  +-  -+
 *```
 *
 * @class
 */
export class DataVectorV extends ElementData implements IData<number, 0, 1>, ISettable<number, 0> {
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
  readonly State: StateDataVectorN<number, 0, 1> = new StateDataVectorN<number, 0, 1>()

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
  get Data(): Output<number, 0, 1> {
    if (this.Resolved) {
      return this.State.VectorN as Output<number, 0, 1>
    }
    throw new Error(`VectorN is not resolved.`)
  }

  /**
   * @constructor
   * @param {number} vector The value of the number.
   */
  constructor(vector?: number[]) {
    super()
    this.State.setVectorN(vector)
    this.State.setResolved(vector !== undefined)
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
      return `{DataVectorN <= [${this.State.VectorN.toString()}]}`
    } else {
      return 'unresolved'
    }
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<Output<number, 0, 1>> {
    this.set(await resolve<number, 0, 1>(wait, this.State.VectorN))
    return this.Data
  }

  /**
   * Sets the value of the number data and marks it as resolved.
   * @param {number[]} value The value to set.
   */
  set(value: Output<number, 0, 1>): void {
    this.State.setVectorN(value)
    this.State.setResolved(true)
  }
}
