import { ElementType } from '../../Design/ElementType.js'
import { ElementCommon } from './ElementCommon.js'

/**
 * Compute Element: A function that takes some data and produces some output.
 * @class
 */
export abstract class ElementCompute extends ElementCommon {
  /**
   * The type of an element
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType = ElementType.Compute
}
