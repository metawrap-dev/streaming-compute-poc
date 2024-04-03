import { type IStrategy } from '../../Design/IStrategy.js'
import { type ITactic } from '../../Design/ITactic.js'
import { TacticBatchSize } from '../Tactic/TacticBatchSize.js'

export class StrategyCommon implements IStrategy {
  /**
   * The common tactics that can be employed when executing an element.
   * @type {ITactic[]}
   * @readonly
   */
  readonly Tactics: ITactic[] = [new TacticBatchSize()]
}
