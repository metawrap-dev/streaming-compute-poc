/**
 * Something that can be set with a value.
 *
 * @author James McParlane
 * @interface
 */
export interface ISettable<T> {
  /**
   * Sets the value.
   * @param {T} value The value to set
   */
  set(value: T): void
}
