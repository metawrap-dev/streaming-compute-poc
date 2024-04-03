/**
 * The type of tactic that can be applied to an element.
 * @enum {string}
 */
export enum TacticType {
  Range = 'Range',
}

/**
 * The type of value that a tactic can take.
 * @enum {string}
 */
export enum TacticValueType {
  Discrete = 'Discrete',
  Continuous = 'Continuous',
}

/**
 * A component of a strategy that can be applied to an element.
 *
 * @author James McParlane
 * @interface
 */
export interface ITactic {
  /**
   * The name of the tactic.
   * @type {string}
   * @readonly
   */
  readonly Name: string

  /**
   * The description of the tactic.
   * @type {string}
   * @readonly
   */
  readonly Description: string

  /**
   * The type of the tactic.
   * @type {TacticType}
   * @readonly
   */
  readonly Type: TacticType

  /**
   * The type of the tactic.
   * @type {TacticType}
   * @readonly
   */
  readonly ValueType: TacticValueType
}
