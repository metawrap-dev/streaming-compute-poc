/**
 * Something that can be synchronized with wait and release.
 *
 * @author James McParlane
 * @interface
 */
export interface ISynchronizable {
  /**
   * Wait for the resource to be resolvable.
   * @async
   */
  wait(): Promise<void>

  /**
   * Release the waiting resource
   * @async
   */
  release(): Promise<void>

  /**
   * Check if we are waiting.
   * @type {boolean}
   * @readonly
   */
  readonly Waiting: boolean
}
