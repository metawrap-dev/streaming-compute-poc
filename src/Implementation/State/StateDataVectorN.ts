import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [DataVectorN ]{@link DataVectorN }.
 * @class
 */
export class StateDataVectorN<T, D extends number, C extends number> extends StateCommon {
  /**
   * The value of the number.
   * @type {Vector<Value<T,D>,C>| undefined}
   * @private
   */
  #VectorN?: Vector<Value<T, D>, C>

  /**
   * The value of the number.
   * @type {Vector<T,D> | undefined}
   * @readonly
   */
  get VectorN(): Vector<Value<T, D>, C> | undefined {
    return this.#VectorN
  }

  /**
   * Set the number.
   * @param {Vector<Value<T,D>,C>} number The number to set.
   */
  setVectorN(number: Vector<Value<T, D>, C>): void {
    this.#VectorN = number
  }
}
