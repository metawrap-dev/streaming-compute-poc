import { type IConfig } from './IConfig.js'
import { type IState } from './IState.js'
import { type IStrategy } from './IStrategy.js'
import { type ISynchronizable } from './ISynchronizable.js'
import { type ElementType } from './Types/ElementType.js'

/**
 * Defines a system component with configurable behavior and state synchronization capabilities.
 * `IElement` represents foundational elements in the system's design, providing interfaces for
 * their type, current state, configuration settings, and strategic behavior. This setup allows
 * elements to be dynamically adjusted and interact cohesively within the system.
 *
 * @extends ISynchronizable Ensures elements can be synchronized with the system's state.
 * @author James McParlane
 * @interface
 */
export interface IElement extends ISynchronizable {
  /**
   * Identifies the element's type, determining its role and capabilities within the system.
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType

  /**
   * Captures the current operational state of the element, facilitating state-based behaviors
   * and interactions within the system.
   * @type {IState}
   * @readonly
   */
  readonly State: IState

  /**
   * Contains configuration settings for the element, reflecting its current setup and operational
   * parameters. This property allows for dynamic adjustments to the element's behavior.
   * @type {IConfig}
   * @readonly
   */
  readonly Config: IConfig

  /**
   * Describes the base strategy applied to the element, guiding its behavior and interactions
   * according to predefined tactical considerations.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: IStrategy
}
