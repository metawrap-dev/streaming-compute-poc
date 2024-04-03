import { ElementType } from '../../Design/ElementType.js'
import { ElementCommon } from './ElementCommon.js'

/**
 * Source Element: A source of multiple data elements.
 * @class
 */
export abstract class ElementSource extends ElementCommon {
  /**
   * The type of an element
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType = ElementType.Source
}
