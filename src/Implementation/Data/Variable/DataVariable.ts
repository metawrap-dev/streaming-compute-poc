import { type IData } from '../../../Design/IData.js'
import { type ISettable } from '../../../Design/ISettable.js'
import { isData, isResolvable } from '../../../Design/Types/ElementType.js'
import { type Output } from '../../../Design/Types/Output.js'
import { type Value } from '../../../Design/Types/Value.js'
import { type Vector } from '../../../Design/Types/Vector.js'
import { ConfigCommon } from '../../Config/ConfigCommon.js'
import { ElementData } from '../../Element/ElementData.js'
import { StateDataVariable } from '../../State/StateDataVariable.js'
import { StrategyCommon } from '../../Strategy/StrategyCommon.js'
import { describe } from '../../Utility/Describe.js'
import { resolve } from '../../Utility/Resolve.js'

/**
 * Implements a generic *Value* representation.
 *
 * This is used when composing more complex items to built the pipeline graph.
 *
 * @class
 */
export class DataVariable<T, D extends number, C extends number> extends ElementData implements IData<T, D, C>, ISettable<T, D, C> {
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
  readonly State: StateDataVariable<T, D, C> = new StateDataVariable<T, D, C>()

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
    throw new Error(`${this.constructor.name} is not resolved.`)
  }

  /**
   * @constructor
   * @param {number} value The value of the number.
   */
  constructor(value?: Vector<Value<T, D>, C>) {
    super()

    // Got a value?
    if (value !== undefined) {
      // If it can be resolved...
      if (isResolvable<T, D, C>(value)) {
        // ... and is resolved...
        if (value.Resolved) {
          // Just pass on its data
          this.set(value.Data)
        } else {
          // Set it without it being resolved
          this.State.setNumber(value)
        }
      } else if (typeof value === 'number') {
        // If it is a number then we are done
        this.set(value as Output<T, D, C>)
      } else {
        // Set it without it being resolved
        this.State.setNumber(value)
      }
    }
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
        return `{${this.constructor.name} <= ${describe(this.State.Number)}}`
      }
    } else {
      if (isData(this.State.Number)) {
        return `{${this.constructor.name} <= ${describe(this.State.Number)}}`
      } else if (Array.isArray(this.State.Number)) {
        return `{${this.constructor.name} <= ${describe(this.State.Number)}}`
      } else {
        return 'unresolved'
      }
    }
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<Output<T, D, C>> {
    // Resolve and set it
    this.set(await resolve<T, D, C>(wait, this.State.Number))
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
