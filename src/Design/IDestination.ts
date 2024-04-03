import { type IData } from './IData.js'
import { type IDataWithoutIResolvable } from './IDataWithoutResolvable.js'
import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type IResolvable } from './IResolvable.js'
import { type ISource } from './ISource.js'

/**
 * A destination for multiple data elements.
 *
 * We want a method to use this as just another output for a compute element.
 *
 * resolve() should be called when we are done writing to the destination (same as flushing a stream).
 *
 * @author James McParlane
 * @interface
 */
export interface IDestination<T> extends IDescribable, IResolvable<void>, IDataWithoutIResolvable<T>, IElement {
  /**
   * How how many elements the destination can store.
   * @type {number}
   * @readonly
   */
  readonly MaxSize: number

  /**
   * If true then there is no more data to write.
   * @type {number}
   * @readonly
   */
  readonly Empty: boolean

  /**
   * Write some data to the destination.
   * @param {T} data The data to write.
   */
  write(data: ISource<T> | T | IData<T> | (T | IData<T>)[], ...rest: (T | IData<T>)[]): Promise<void>
}
