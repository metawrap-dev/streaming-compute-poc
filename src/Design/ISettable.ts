import { type Vector } from './Types/Vector.js'

/**
 * Something that can be set with a value.
 *
 * @todo: Do we want to keep this to concrete types?
 *
 * @author James McParlane
 * @interface
 */
export interface ISettable<T, N extends number> {
  /**
   * Sets the value.
   * @param {Vector<T,N>} value The value to set
   */
  set(value: Vector<T, N>): void
}
