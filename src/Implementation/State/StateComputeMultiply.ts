import { type IState } from '../../Design/IState.js'

/**
 * The execution state for [ComputeMultiply]{@link ComputeMultiply}.
 * @class
 */
export class StateComputeMultiply implements IState {
  /**
   * The value of the accumulator.
   * @type {number}
   * @private
   */
  #Accumulator: number = 1

  /**
   * The value of the accumulator.
   * @type {accumulator | undefined}
   * @readonly
   */
  get Accumulator(): number {
    return this.#Accumulator
  }

  /**
   * Set the accumulator.
   * @param {number} number The accumulator value to set.
   */
  setAccumulator(accumulator: number): void {
    this.#Accumulator = accumulator
  }
}
