/**
 * Something that can be batched.
 *
 * @author James McParlane
 * @interface
 */
export interface IBatchable {
  /**
   * How how many elements in the batch.
   * @type {number}
   * @readonly
   */
  readonly BatchSize: number

  /**
   * Set the batch size.
   * @param {number} batchSize The batch size to set
   */
  setBatchSize(batchSize: number): void
}
