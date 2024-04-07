import { type Input } from '../../Design/Types/Input.js'
import { type Output } from '../../Design/Types/Output.js'
import { type Dimension } from '../../Design/Types/Vector.js'
import { StateCommon } from './StateCommon.js'

/**
 * The execution state for [DestinationMemory]{@link DestinationMemory}.
 * @class
 */
export class StateDestinationMemory<T, D extends Dimension, A extends number> extends StateCommon {
  /**
   * The buffered data that will be moved to storage after it has been resolved.
   * @type {Input<T,D,A>[]}
   * @readonly
   */
  readonly Buffer: Input<T, D, A>[] = []

  /**
   * The in memory storage data (Where buffered data is moved to after it has been resolved)
   * @type {Output<T,D,A>[][]}
   * @readonly
   */
  readonly Storage: Output<T, D, A>[] = []
}
