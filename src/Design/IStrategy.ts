import { type ITactic } from './ITactic.js'

/**
 * The strategy for an element.
 *
 * This is a set of tactics that can be used to execute the element.
 *
 * This is built in this way so that an external process can be used to adjust the tactics to maximize performance.
 *
 * @author James McParlane
 * @interface
 */
export interface IStrategy {
  /**
   * The tactics that can be employed when executing an element.
   * @type {ITactic[]}
   * @readonly
   */
  readonly Tactics: ITactic[]
}
