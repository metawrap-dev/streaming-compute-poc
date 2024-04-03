import { type IState } from '../../Design/IState.js'

/**
 * The execution state for [DataNumber]{@link DataNumber}.
 * @class
 */
export class StateDataNumber implements IState {
  /**
   * The value of the number.
   * @type {number | undefined}
   */
  Number?: number
}
