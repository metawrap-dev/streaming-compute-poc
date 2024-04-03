/**
 * Something that can be resolved to something.
 *
 * @author James McParlane
 * @interface
 */
export interface IResolvable<T> {
  /**
   * If true then this has been resolved.
   *
   * We store this in the [State] of the entity.
   * @type {boolean}
   * @readonly
   */
  readonly Resolved: boolean

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  resolve(wait?: boolean): Promise<T>
}
