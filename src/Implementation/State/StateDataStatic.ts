import { type Vector } from '../../Design/Types/Vector.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [DataStatic]{@link DataVariableNumber}.
 * @class
 */
export class StateDataStatic<T, D extends number, C extends number> extends StateCommon {
  /**
   * The value of the number.
   * @type {Vector<Vector<T, D>, C> | undefined}
   * @private
   */
  #Number?: Vector<Vector<T, D>, C>

  /**
   * The value of the number.
   * @type {Vector<Vector<T, D>, C> | undefined}
   * @readonly
   */
  get Number(): Vector<Vector<T, D>, C> | undefined {
    return this.#Number
  }

  /**
   * Set the number.
   * @param {number} number The number to set.
   */
  setNumber(number: Vector<Vector<T, D>, C>): void {
    this.#Number = number
  }
}
