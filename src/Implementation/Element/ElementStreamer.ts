import { ElementType } from '../../Design/ElementType.js'
import { ElementCommon } from './ElementCommon.js'

/**
 * Streamer Element: Can take a source and stream it into a Compute element.
 * @class
 */
export abstract class ElementStreamer extends ElementCommon {
  /**
   * The type of an element
   * @type {ElementType}
   * @readonly
   */
  readonly Type: ElementType = ElementType.Streamer
}
