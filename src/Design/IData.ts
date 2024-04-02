import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'

/**
 * A Data Element: Some form of data that can be fed into a compute element.
 *
 * @author James McParlane
 * @interface
 */
export interface IData<T> extends IDescribable, IResolvable<T>, IElement {
  /**
   * The actual data.
   * @type {T}
   * @readonly
   */
  readonly Data: T
}