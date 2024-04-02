import { ElementType } from '../../Design/ElementType.js'
import { type IElement } from '../../Design/IElement.js'

/**
 * Source Element: A source of multiple data elements.
 * @class
 */
export class ElementSource implements IElement {
  /**
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType = ElementType.Source
}
