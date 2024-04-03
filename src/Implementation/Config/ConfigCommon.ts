import { type IConfig } from '../../Design/IConfig.js'

/**
 * The common configuration for all elements.
 * @class
 */
export class ConfigCommon implements IConfig {
  /**
   * How how many elements in the batch.
   * @type {number}
   * @readonly
   */
  #BatchSize: number = 1

  /**
   * How how many elements in the batch.
   * @type {number}
   * @readonly
   */
  get BatchSize(): number {
    return this.#BatchSize
  }

  /**
   * Set the batch size.
   * @param {number} batchSize The batch size to set
   */
  setBatchSize(batchSize: number): void {
    this.#BatchSize = batchSize
  }
}
