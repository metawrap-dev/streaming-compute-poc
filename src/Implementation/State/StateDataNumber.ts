import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [DataNumber]{@link DataNumber}.
 * @class
 */
export class StateDataNumber extends StateCommon {
  /**
   * The value of the number.
   * @type {number | undefined}
   * @private
   */
  #Number?: number

  /**
   * The value of the number.
   * @type {number | undefined}
   * @readonly
   */
  get Number(): number | undefined {
    return this.#Number
  }

  /**
   * Set the number.
   * @param {number} number The number to set.
   */
  setNumber(number: number): void {
    this.#Number = number
  }
}
