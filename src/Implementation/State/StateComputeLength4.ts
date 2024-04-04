import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [ComputeDot4]{@link ComputeDot4}.
 * @class
 */
export class StateComputeLength4 extends StateCommon {
  /**
   * The value of the accumulator.
   * @type {number[]}
   * @private
   */
  #Accumulator: number[] = []

  /**
   * The value of the accumulator.
   * @type {accumulator | undefined}
   * @readonly
   */
  get Accumulator(): number[] {
    return this.#Accumulator
  }

  /**
   * Set the accumulator.
   * @param {number[]} number[] The accumulator value to set.
   */
  setAccumulator(accumulator: number[]): void {
    this.#Accumulator = accumulator
  }
}
