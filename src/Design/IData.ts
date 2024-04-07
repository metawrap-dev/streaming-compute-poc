import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'
import { type Vector } from './Types/Vector.js'

/**
 * A Data Element: Some form of data that can be fed into a compute element.
 *
 * @author James McParlane
 * @interface
 */
export interface IData<T, D extends number, C extends number> extends IDescribable, IResolvable<T, D, C>, IElement {
  /**
   * Sets the value of the data and marks it as resolved.
   * @param {T} value The value to set.
   */
  set(value: Vector<Vector<T, D>, C>): void

  /**
   * The data that has been resolved.
   * @type {Vector<Vector<T, D>, C>}
   */
  readonly Data: Vector<Vector<T, D>, C>
}
