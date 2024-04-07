import { type Input } from '../../Design/Types/Input.js'
import { type Cardinality, type Dimension } from '../../Design/Types/Vector.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [SourceMemory]{@link SourceMemory}.
 * @class
 */
export class StateSourceMemory<T, D extends Dimension, C extends Cardinality> extends StateCommon {
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
  readonly Data: Input<T, D, C>[] = []
}
