import { type Vector } from '../../Design/Types/Vector.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [DataVectorN ]{@link DataVectorN }.
 * @class
 */
export class StateDataVectorN<T, D extends number, A extends number> extends StateCommon {
  /**
   * The value of the number.
   * @type {Vector<Vector<T,D>,A>| undefined}
   * @private
   */
  #VectorN?: Vector<Vector<T, D>, A>

  /**
   * The value of the number.
   * @type {Vector<T,D> | undefined}
   * @readonly
   */
  get VectorN(): Vector<Vector<T, D>, A> | undefined {
    return this.#VectorN
  }

  /**
   * Set the number.
   * @param {Vector<Vector<T,D>,A>} number The number to set.
   */
  setVectorN(number: Vector<Vector<T, D>, A>): void {
    this.#VectorN = number
  }
}
