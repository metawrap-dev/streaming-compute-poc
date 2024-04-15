import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [SourceMemory]{@link SourceMemory}.
 * @class
 */
export class StateSourceMemory<T, D extends number, C extends number> extends StateCommon {
  /**
   * How are are we into the source in memory.
   * @type {number}
   * @todo This should be removed.
   */
  Index: number = 0

  /**
   * The data stored in memory that we are reading out of.
   * @type {Input<T,D,C>[]}
   * @readonly
   */
  readonly Data: (ISource<T, D, C> | Vector<Value<T, D>, C> | IData<T, D, C>)[] = []
}
