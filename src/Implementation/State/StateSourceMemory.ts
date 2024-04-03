import { type IData } from '../../Design/IData.js'
import { type IState } from '../../Design/IState.js'

/**
 * The execution state for [SourceMemory]{@link SourceMemory}.
 * @class
 */
export class StateSourceMemory<T> implements IState {
  /**
   * How are are we into the source in memory.
   * @type {number}
   */
  Index: number = 0

  /**
   * The data in memory.
   * @type {(T | IData<T>)[]}
   */
  Data: (T | IData<T>)[] = []
}
