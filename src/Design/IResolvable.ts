import { type Output } from '../Implementation/Utility/Input.js'

/**
 * Something that can be resolved to something.
 *
 * @author James McParlane
 * @param {type} T The type of the resolved object.
 * @param {number} D The dimension of the resolved object.
 * @param {number} R The number objects resolved.
 * @interface
 */
export interface IResolvable<T, D extends number, R extends number> {
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
  resolve(wait?: boolean): Promise<Output<T, D, R>>

  /**
   * The data that has been resolved.
   * @type {Output<T, D, R>}
   */
  readonly Data: Output<T, D, R>
}
