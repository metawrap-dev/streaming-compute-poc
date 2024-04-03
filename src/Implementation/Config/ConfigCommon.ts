import { type IConfig } from '../../Design/IConfig.js'

/**
 * The common configuration for all elements.
 * @class
 */
export class ConfigCommon implements IConfig {
  /**
   * The size of the batch to process in the element.
   * @type {number}
   * @readonly
   */
  readonly BatchSize: number
}
