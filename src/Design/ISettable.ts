import { type Output } from './Types/Output.js'

/**
 * Something that can be set with a value.
 *
 * @todo: Do we want to keep this to concrete types?
 *
 * @author James McParlane
 * @interface
 */
export interface ISettable<T, D extends number, C extends number> {
  /**
   * Sets the value.
   * @param {Output<T,D, C>} value The value to set
   */
  set(value: Output<T, D, C>): void
}
