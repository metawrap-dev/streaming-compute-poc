import { type ElementType } from './ElementType.js'

/**
 * An Element: A component of a the design.
 * 
 * At this point used to differentiate between different types of elements.
 * 
 * In the future, some common properties may be added here.
 *
 * @author James McParlane
 * @interface
 */
export interface IElement {
  /**
   * The type of an element
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType
}
