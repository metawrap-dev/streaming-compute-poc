import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { type IState } from '../../Design/IState.js'

/**
 * The execution state for [SourceMemory]{@link SourceMemory}.
 * @class
 */
export class StateSourceMemory<T> implements IState {
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
