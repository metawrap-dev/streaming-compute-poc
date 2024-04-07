import { type IData } from '../../Design/IData.js'
import { type ISettable } from '../../Design/ISettable.js'
import { type Output } from '../../Design/Types/Output.js'
import { type Vector } from '../../Design/Types/Vector.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementData } from '../Element/ElementData.js'
import { StateDataVectorN } from '../State/StateDataVectorN.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'

/**
 * A "simple" number.
 *
 * Example of an entity with Dimension Unlimited and Cardinality 1
 *
 * "Horizontal" vector.
 *
 *```
 *  +-                  -+
 *  | n1, n2, n3, n4, nN |
 *  +-                  -+
 *```
 *
 * @class
 */
export class DataVectorH extends ElementData implements IData<number, 1, 0>, ISettable<number, 0> {
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
  readonly State: StateDataVectorN<number, 1, 0> = new StateDataVectorN<number, 1, 0>()

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
  get Data(): Output<number, 1, 0> {
    if (this.Resolved) {
      return this.State.VectorN
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
  async resolve(_wait: boolean = false): Promise<Output<number, 1, 0>> {
    this.State.setResolved(true)
    return this.Data
  }

  /**
   * Sets the value of the number data and marks it as resolved.
   * @param {number[]} value The value to set.
   */
  set(value: Vector<number, 0>): void {
    this.State.setVectorN(value)
    this.State.setResolved(true)
  }
}
