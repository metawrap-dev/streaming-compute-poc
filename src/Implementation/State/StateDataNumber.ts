import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [DataNumber]{@link DataNumber}.
 * @class
 */
export class StateDataNumber<T, D extends number, C extends number> extends StateCommon {
  /**
   * The value of the number.
   * @type {Vector<Value<T, D>, C> | undefined}
   * @private
   */
  #Number?: Vector<Value<T, D>, C>

  /**
   * The value of the number.
   * @type {Vector<Value<T, D>, C> | undefined}
   * @readonly
   */
  get Number(): Vector<Value<T, D>, C> | undefined {
    return this.#Number
  }

  /**
   * Set the number.
   * @param {number} number The number to set.
   */
  setNumber(number: Vector<Value<T, D>, C>): void {
    this.#Number = number
  }
}
