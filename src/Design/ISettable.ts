/**
 * Something that can be set with a value.
 * 
 * @todo: Do we want to keep this to concrete types?
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
