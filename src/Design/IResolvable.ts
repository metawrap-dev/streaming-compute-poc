/**
 * Something that can be resolved to something.
 *
 * @author James McParlane
 * @interface
 */
export interface IResolvable<T> {
  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @readonly
   */
  readonly Resolved: boolean

  /**
   * Resolve it using a promise.
   * @async
   */
  resolve(): Promise<T>
}
