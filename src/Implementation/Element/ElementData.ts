import { ElementType } from '../../Design/ElementType.js'
import { ElementCommon } from './ElementCommon.js'

/**
 * Data Element: Some form of data that can be fed into a compute element.
 * @class
 */
export abstract class ElementData extends ElementCommon {
  /**
   * The type of an element
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType = ElementType.Data
}
