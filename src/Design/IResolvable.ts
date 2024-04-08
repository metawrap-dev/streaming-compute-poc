import { type Output } from './Types/Output.js'

/**
 * Something that can be resolved to something concrete that requires no further execution.
 * @author James McParlane
 * @param {type} T The type of the resolved object.
 * @param {number} D The dimension of the resolved object.
 * @param {number} C The number objects resolved.
 * @interface
 */
export interface IResolvable<T, D extends number, C extends number> {
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
  resolve(wait?: boolean): Promise<Output<T, D, C>>

  /**
   * The data that has been resolved.
   * @type {Output<T, D, C>}
   */
  readonly Data: Output<T, D, C>
}
