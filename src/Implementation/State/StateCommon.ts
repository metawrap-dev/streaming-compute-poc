import { type IState } from '../../Design/IState.js'

/**
 * The execution state for [ComputeMultiply]{@link ComputeMultiply}.
 * @class
 */
export class StateCommon implements IState {
  /**
   * The value of the resolved.
   * @type {boolean}
   * @private
   */
  #Resolved: boolean = false

  /**
   * The value of the resolved.
   * @type {resolved | undefined}
   * @readonly
   */
  get Resolved(): boolean {
    return this.#Resolved
  }

  /**
   * Set the resolved.
   * @param {boolean} boolean The resolved value to set.
   */
  setResolved(resolved: boolean): void {
    this.#Resolved = resolved
  }
}
