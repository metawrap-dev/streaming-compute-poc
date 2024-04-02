import { ElementType } from '../../Design/ElementType.js'
import { type IElement } from '../../Design/IElement.js'

/**
 * Compute Element: A function that takes some data and produces some output.
 * @class
 */
export class ElementCompute implements IElement {
  /**
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType = ElementType.Compute
}
