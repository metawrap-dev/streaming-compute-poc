import { type IData } from '../../Design/IData.js'
import { type ISettable } from '../../Design/ISettable.js'
import { type Output } from '../../Design/Types/Output.js'
import { type Cardinality, type Dimension, type Vector } from '../../Design/Types/Vector.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementData } from '../Element/ElementData.js'
import { StateDataVectorN } from '../State/StateDataVectorN.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'

/**
 * A "simple" number.
 * @class
 */
export class DataVector4 extends ElementData implements IData<number, Dimension.V4, Cardinality.One>, ISettable<number, Dimension.V4> {
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
  readonly State: StateDataVectorN<number, Dimension.V4, Cardinality.One> = new StateDataVectorN<number, Dimension.V4, Cardinality.One>()

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
  get Data(): Output<number, Dimension.V4, Cardinality.One> {
    if (this.Resolved) {
      return this.State.VectorN
    }
    throw new Error(`VectorN is not resolved.`)
  }

  /**
   * @constructor
   * @param {number} vector The value of the number.
   */
  constructor(vector?: Vector<number, Dimension.V4>) {
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
  async resolve(_wait: boolean = false): Promise<Output<number, Dimension.V4, 1>> {
    this.State.setResolved(true)
    return this.Data
  }

  /**
   * Sets the value of the number data and marks it as resolved.
   * @param {number[]} value The value to set.
   */
  set(value: Vector<Vector<number, Dimension.V4>, 1>): void {
    this.State.setVectorN(value)
    this.State.setResolved(true)
  }
}
