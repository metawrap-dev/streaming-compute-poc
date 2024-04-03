import { type IState } from '../../Design/IState.js'

/**
 * The execution state for [ComputeMultiply]{@link ComputeMultiply}.
 * @class
 */
export class StateComputeMultiply implements IState {
  /**
   * The current accumulator value.
   * @type {number}
   */
  Accumulator: number = 1
}
