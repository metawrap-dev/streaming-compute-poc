import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'
import { type Dimension, type Vector } from './Types/Vector.js'

/**
 * A Data Element: Some form of data that can be fed into a compute element.
 *
 * @author James McParlane
 * @interface
 */
export interface IData<T, D extends Dimension, A extends number> extends IDescribable, IResolvable<T, D, A>, IElement {
  /**
   * Sets the value of the data and marks it as resolved.
   * @param {T} value The value to set.
   */
  set(value: Vector<Vector<T, D>, A>): void

  /**
   * The data that has been resolved.
   * @type {Vector<Vector<T, D>, A>}
   */
  readonly Data: Vector<Vector<T, D>, A>
}
