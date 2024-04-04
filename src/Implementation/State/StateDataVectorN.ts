import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [DataVectorN ]{@link DataVectorN }.
 * @class
 */
export class StateDataVectorN extends StateCommon {
  /**
   * The value of the number.
   * @type {number[] | undefined}
   * @private
   */
  #VectorN?: number[]

  /**
   * The value of the number.
   * @type {number[] | undefined}
   * @readonly
   */
  get VectorN(): number[] | undefined {
    return this.#VectorN
  }

  /**
   * Set the number.
   * @param {number[]} number The number to set.
   */
  setVectorN(number: number[]): void {
    this.#VectorN = number
  }
}
