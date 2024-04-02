import { ElementType } from '../../Design/ElementType.js'
import { type IElement } from '../../Design/IElement.js'

/**
 * Data Element: Some form of data that can be fed into a compute element.
 * @class
 */
export class ElementData implements IElement {
  /**
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType = ElementType.Data
}
