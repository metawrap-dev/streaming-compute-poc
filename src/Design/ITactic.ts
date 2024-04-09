/**
 * Enumerates the types of tactics that can be applied to an element, providing a specific operational focus.
 * For example, a 'Range' tactic might specify operations within a certain range of values.
 * @enum {string}
 */
export enum TacticType {
  Range = 'Range',
}

/**
 * Defines the nature of values a tactic can work with, distinguishing between discrete (fixed values) and continuous (any value within a range).
 * This classification aids in applying tactics appropriately based on the type of data they are designed to manipulate.
 * @enum {string}
 */
export enum TacticValueType {
  Discrete = 'Discrete',
  Continuous = 'Continuous',
}

/**
 * Represents a single component of a strategy, detailing an operational approach that can be applied to an element.
 * Tactics encapsulate actionable directives or policies as part of a broader strategic framework, each with its own
 * name, description, operational type, and value nature.
 *
 * @interface
 */
export interface ITactic {
  /**
   * The unique identifier or common name of the tactic, providing a quick reference to its purpose or action.
   * @type {string}
   * @readonly
   */
  readonly Name: string

  /**
   * A brief explanation of the tactic's function, objectives, and application context, helping users understand its role within a strategy.
   * @type {string}
   * @readonly
   */
  readonly Description: string

  /**
   * Specifies the operational category of the tactic, aiding in its classification and application within strategic operations.
   * @type {TacticType}
   * @readonly
   */
  readonly Type: TacticType

  /**
   * Indicates the nature of the values that the tactic deals with, guiding its implementation and integration with system elements.
   * @type {TacticValueType}
   * @readonly
   */
  readonly ValueType: TacticValueType
}
