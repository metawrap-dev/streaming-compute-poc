import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { type IState } from '../../Design/IState.js'

/**
 * The execution state for [DestinationMemory]{@link DestinationMemory}.
 * @class
 */
export class StateDestinationMemory<T> implements IState {
  /**
   * The buffered data.
   * @type {(T | IData<T>)[]}
   * @readonly
   */
  readonly Buffer: (ISource<T> | T | IData<T>)[] = []
}
