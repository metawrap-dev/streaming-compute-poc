import { type ITactic } from './ITactic.js'

/**
 * Encapsulates a strategic plan comprising multiple tactics for the operation of an element. This design allows
 * for dynamic adaptation and optimization of element execution based on varying conditions or performance metrics.
 * By structuring strategies around a collection of tactics, the system facilitates flexible, performance-driven
 * operation modes, enabling external processes or algorithms to adjust these tactics in response to real-time feedback
 * or predefined criteria. This approach enhances the adaptability and efficiency of elements within the system,
 * potentially leading to improved performance and resource utilization.
 *
 * @interface
 */
export interface IStrategy {
  /**
   * A collection of tactics that define the operational behavior and decision-making processes for an element.
   * Each tactic in the array contributes to the overall strategy, potentially targeting different aspects of
   * execution or performance optimization. The composition of this array can be varied dynamically to respond
   * to changing operational requirements or optimization goals, offering a mechanism for fine-tuning element
   * behavior at runtime.
   *
   * @type {ITactic[]}
   * @readonly
   */
  readonly Tactics: ITactic[]
}
