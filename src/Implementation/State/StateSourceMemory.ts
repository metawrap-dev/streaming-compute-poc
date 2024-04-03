import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [SourceMemory]{@link SourceMemory}.
 * @class
 */
export class StateSourceMemory<T> extends StateCommon {
  /**
   * How are are we into the source in memory.
   * @type {number}
   * @todo This should be removed.
   */
  Index: number = 0

  /**
   * The data stored in memory that we are reading out of.
   * @type {(ISource<T> | T | IData<T>)[]}
   * @readonly
   */
  readonly Data: (ISource<T> | T | IData<T>)[] = []
}
