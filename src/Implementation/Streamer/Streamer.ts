import { type ICompute } from '../../Design/ICompute.js'
import { type ISource } from '../../Design/ISource.js'
import { type IStreamer } from '../../Design/IStreamer.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementStreamer } from '../Element/ElementStreamer.js'
import { StateStreamer } from '../State/StateStreamer.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'

/**
 * Data Element: Some form of data that can be fed into a compute element.
 * @class
 */
export class Streamer<I,N extends number, O> extends ElementStreamer implements IStreamer<I, O> {
  /**
   * The configuration for the source.
   * @type {IConfig}
   * @readonly
   */
  readonly Config: ConfigCommon = new ConfigCommon()

  /**
   * The runtime state of the source.
   * @type {IState}
   * @readonly
   */
  readonly State: StateStreamer<I, O> = new StateStreamer<I, O>()

  /**
   * The strategy that can be applied to the source's state.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: StrategyCommon = new StrategyCommon()

  /**
   * The stream element we are string from
   * @type {ISource<I,O>}
   * @readonly
   */
  readonly Source: ISource<I>

  /**
   * The compute element that will process the data.
   * @type {ICompute<I,O>}
   * @readonly
   */
  readonly Compute: ICompute<I, N, O>

  /**
   * @constructor
   * @param {T | IData<T>} inputs The input for the source
   */
  constructor(source: ISource<I>, compute: ICompute<I,N, O>) {
    super()
    this.Source = source
    this.Compute = compute
  }

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {
    const result: string[] = []

    result.push(`{Streamer`)
    result.push(this.Source.toString())
    result.push(' => ')
    result.push(this.Compute.toString())
    result.push('}')
    return result.join('')
  }

  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @readonly
   */
  get Resolved(): boolean {
    // Otherwise return the resolved status
    return this.State.Resolved
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<void> {
    while (!this.Source.Empty) {
      // We should include batch-size results when complete
      const result: O[] = []

      // Keep going until we have enough results
      while (result.length < this.Config.BatchSize) {
        // Get some source data
        const sourceData = await this.Source.resolve(wait)

        // For each data element
        for (const data of sourceData) {
          // Queue the input
          await this.Compute.Inputs.queue(data)

          // And then execute the compute element,
          result.push(await this.Compute.resolve(wait))
        }
      }
    }
  }
}
