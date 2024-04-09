import { type IData } from '../../../Design/IData.js'
import { type ISettable } from '../../../Design/ISettable.js'
import { type Output } from '../../../Design/Types/Output.js'
import { type Vector } from '../../../Design/Types/Vector.js'
import { ConfigCommon } from '../../Config/ConfigCommon.js'
import { ElementData } from '../../Element/ElementData.js'
import { StateDataStatic } from '../../State/StateDataStatic.js'
import { StrategyCommon } from '../../Strategy/StrategyCommon.js'

/**
 * Implements a generic *Static* representation.
 *
 * This is used when composing more static data.
 *
 * @class
 */
export class DataStatic<T, D extends number, C extends number> extends ElementData implements IData<T, D, C>, ISettable<T, D, C> {
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
  readonly State: StateDataStatic<T, D, C> = new StateDataStatic<T, D, C>()

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
  get Data(): Output<T, D, C> {
    if (this.Resolved) {
      return this.State.Number as Vector<Vector<T, D>, C>
    }
    throw new Error(`Number is not resolved.`)
  }

  /**
   * @constructor
   * @param {number} number The value of the number.
   */
  constructor(number?: Vector<Vector<T, D>, C>) {
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
      if (typeof this.State.Number === 'number') {
        return `{${this.constructor.name} <= ${this.State.Number}}`
      } else {
        return `{${this.constructor.name} <= [${this.State.Number.toString()}]}`
      }
    } else {
      return 'unresolved'
    }
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(_wait: boolean = false): Promise<Output<T, D, C>> {
    // There is nothing to do, Static data does not need to be resolved.
    return this.Data
  }

  /**
   * Sets the value of the number data and marks it as resolved.
   * @param {number} value The value to set.
   */
  set(value: Output<T, D, C>): void {
    // Set the value
    this.State.setNumber(value)

    // We now consider it resolved.
    this.State.setResolved(true)
  }
}
