import { ElementType } from '../../Design/ElementType.js'
import { type IElement } from '../../Design/IElement.js'

/**
 * Destination Element: A destination for multiple data elements.
 * @class
 */
export class ElementDestination implements IElement {
  /**
   * The type of an element
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType = ElementType.Destination
}
