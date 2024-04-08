import { ElementType } from '../../Design/Types/ElementType.js'
import { ElementCommon } from './ElementCommon.js'

/**
 * Destination Element: A destination for multiple data elements.
 * @class
 * @abstract
 */
export abstract class ElementDestination extends ElementCommon {
  /**
   * The type of an element
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType = ElementType.Destination
}
