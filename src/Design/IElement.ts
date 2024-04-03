import { type ElementType } from './ElementType.js'
import { type IConfig } from './IConfig.js'
import { type IState } from './IState.js'
import { type IStrategy } from './IStrategy.js'
import { type ISynchronizable } from './ISynchronzable.js'

/**
 * An Element: A component of a the design.
 *
 * @author James McParlane
 * @interface
 */
export interface IElement extends ISynchronizable {
  /**
   * The type of an element
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType

  /**
   * The runtime state of the element.
   * @type {IState}
   * @readonly
   */
  readonly State: IState

  /**
   * Reflects the current applied strategy and tactics.
   * @type {IConfig}
   */
  readonly Config: IConfig

  /**
   * The base strategy that can be applied to the element's config.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: IStrategy
}
