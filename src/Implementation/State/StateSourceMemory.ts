import { type Input } from '../../Design/Types/Input.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [SourceMemory]{@link SourceMemory}.
 * @class
 */
export class StateSourceMemory<T, D extends number, A extends number> extends StateCommon {
  /**
   * How are are we into the source in memory.
   * @type {number}
   * @todo This should be removed.
   */
  Index: number = 0

  /**
   * The data stored in memory that we are reading out of.
   * @type {Input<T,D,A>[]}
   * @readonly
   */
  readonly Data: Input<T, D, A>[] = []
}
