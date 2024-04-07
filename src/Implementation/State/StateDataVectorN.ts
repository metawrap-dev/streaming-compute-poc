import { type Cardinality, type Dimension, type Vector } from '../../Design/Types/Vector.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [DataVectorN ]{@link DataVectorN }.
 * @class
 */
export class StateDataVectorN<T, D extends Dimension, C extends Cardinality> extends StateCommon {
  /**
   * The value of the number.
   * @type {Vector<Vector<T,D>,C>| undefined}
   * @private
   */
  #VectorN?: Vector<Vector<T, D>, C>

  /**
   * The value of the number.
   * @type {Vector<T,D> | undefined}
   * @readonly
   */
  get VectorN(): Vector<Vector<T, D>, C> | undefined {
    return this.#VectorN
  }

  /**
   * Set the number.
   * @param {Vector<Vector<T,D>,C>} number The number to set.
   */
  setVectorN(number: Vector<Vector<T, D>, C>): void {
    this.#VectorN = number
  }
}
