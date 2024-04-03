import { type ITactic, TacticType, TacticValueType } from '../../Design/ITactic.js'

/**
 * A tactic of setting the batch size.
 * @class
 */

export class TacticBatchSize implements ITactic {
  /**
   * The name of the tactic.
   * @type {string}
   * @readonly
   */
  readonly Name: string = 'BatchSize'

  /**
   * The description of the tactic.
   * @type {string}
   * @readonly
   */
  readonly Description: string = 'Set the batch size for the element.'

  /**
   * The type of the tactic.
   * @type {TacticType}
   * @readonly
   */
  readonly Type: TacticType = TacticType.Range

  /**
   * The type of the tactic.
   * @type {TacticValueType}
   * @readonly
   */
  readonly ValueType: TacticValueType = TacticValueType.Discrete

  /**
   * The minimum value for the tactic.
   * @type {number}
   * @readonly
   */
  readonly Min: number = 1

  /**
   * The maximum value for the tactic.
   * @type {number}
   * @readonly
   */
  readonly Max: number = Number.MAX_SAFE_INTEGER
}
