import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { type Output } from '../../Design/Types/Output.js'
import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [DestinationMemory]{@link DestinationMemory}.
 * @class
 */
export class StateDestinationMemory<T, D extends number, C extends number> extends StateCommon {
  /**
   * The buffered data that will be moved to storage after it has been resolved.
   * @type {Input<T,D,C>[]}
   * @readonly
   */
  readonly Buffer: (ISource<T, D, C> | Vector<Value<T, D>, C> | IData<T, D, C>)[] = []

  /**
   * The in memory storage data (Where buffered data is moved to after it has been resolved)
   * @type {Output<T,D,C>[][]}
   * @readonly
   */
  readonly Storage: Output<T, D, C>[] = []
}
