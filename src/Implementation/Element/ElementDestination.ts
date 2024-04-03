import { ElementType } from '../../Design/ElementType.js'
import { type IConfig } from '../../Design/IConfig.js'
import { type IElement } from '../../Design/IElement.js'
import { type IState } from '../../Design/IState.js'
import { type IStrategy } from '../../Design/IStrategy.js'

/**
 * Destination Element: A destination for multiple data elements.
 * @class
 * @abstract
 */
export abstract class ElementDestination implements IElement {
  /**
   * The type of an element
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType = ElementType.Destination

  /**
   * The runtime state of the element.
   * @type {IState}
   * @readonly
   * @abstract
   */
  abstract readonly State: IState

  /**
   * Reflects the current applied strategy.
   * @type {IConfig}
   * @readonly
   * @abstract
   */
  abstract readonly Config: IConfig

  /**
   * The strategy that can be applied to the element's config.
   * @type {IStrategy}
   * @readonly
   * @abstract
   */
  abstract readonly Strategy: IStrategy
}