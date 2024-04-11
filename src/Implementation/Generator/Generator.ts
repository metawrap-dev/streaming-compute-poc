/* eslint-disable @typescript-eslint/no-misused-new */
import { type ICompute } from '../../Design/ICompute.js'
import { type IGenerator } from '../../Design/IGenerator.js'
import { type ISource } from '../../Design/ISource.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Output } from '../../Design/Types/Output.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementSource } from '../Element/ElementSource.js'
import { StateGenerator } from '../State/StateGenerator.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'

/**
 * Orchestrates a data processing pipeline, linking an `ISource` with an `ICompute` to produce another `ISource` containing
 * the result.
 *
 * @author James McParlane
 * @template ST Input type for data accepted by the compute element.
 * @template SD Input dimension defining the structure of input items.
 * @template SC Input cardinality, the number of input items processed per operation.
 * @template IT Input type for data accepted by the compute element.
 * @template ID Input dimension defining the structure of input items.
 * @template IC Input cardinality, the number of input items processed per operation.
 * @template OT Output type produced by the compute element.
 * @template OD Output dimension, structuring the output data.
 * @template OC Output cardinality, the number of output items produced.
 * @template GD Generator dimension, structuring the overall output.
 * @template GC Generator cardinality, the total number of items produced.
 * @interface
 */
export class Generator<ST, SD extends number, SC extends number, IT, ID extends number, IC extends number, OT, OD extends number, OC extends number, GT, GD extends number, GC extends number> extends ElementSource implements IGenerator<ST, SD, SC, IT, ID, IC, OT, OD, OC, GT, GD, GC> {
  /**
   * The source of input for the compute element
   * @type {ISource<ST, SD, SC>}
   * @readonly
   */
  readonly Source: ISource<ST, SD, SC>

  /**
   * The compute element that processes the input data and submits it the internal source
   * @type {ICompute<IT, ID, IC, OT, OD, OC>}
   * @readonly
   */
  readonly Compute: ICompute<IT, ID, IC, OT, OD, OC>

  /**
   * Indicates whether the source has been depleted of data. Useful for determining if further reads will yield data.
   * @type {boolean}
   * @readonly
   */
  readonly Empty: boolean

  /**
   * The configuration for the source.
   * @type {IConfig}
   * @readonly
   */
  readonly Config: ConfigCommon = new ConfigCommon()

  /**
   * @type {StateGenerator<GT, GD, GC>}
   * @readonly
   */
  readonly State: StateGenerator<GT, GD, GC> = new StateGenerator()

  /**
   * The strategy that can be applied to the source's state.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: StrategyCommon = new StrategyCommon()

  /**
   * Provides information on the quantity of data elements available from the source. This property can express
   * unbounded sources (Infinity), sources with a calculable count, or cases where the count is indeterminate (undefined).
   * @todo Consider simplifying by exclusively using `undefined` for indeterminate counts to reduce complexity.
   * @type {number | undefined | typeof Infinity}
   * @readonly
   */
  readonly Count: number | undefined | typeof Infinity

  /*
  toString(): string {
    throw new Error('Method not implemented.')
  }
  */

  /**
   *
   * @param {ISource<ST, SD, SC>} source The source of input for the compute element
   * @param {ICompute<IT, ID, IC, OT, OD, OC>} compute
   * @param {IDestination<Output<OT, OD, OC>, GD, GC>} destination
   */
  constructor(source: ISource<ST, SD, SC>, compute: ICompute<IT, ID, IC, OT, OD, OC>) {
    super()
    this.Source = source
    this.Compute = compute
  }

  /**
   * Asynchronously resolves the source to a collection of data elements, optionally waiting to accumulate a specified batch size.
   * This method facilitates controlled data extraction, accommodating scenarios requiring bulk or timed data retrieval.
   *
   * @param {boolean} [wait=false] Specifies whether resolution should await the fulfillment of batch size requirements.
   * @returns {Promise<Output<GT, GD, GC>[]>} A promise resolving to an array of data elements structured according to specified type, dimension, and cardinality.
   */
  async resolve(_wait?: boolean): Promise<Output<GT, GD, GC>[]> {
    // We will build this result.
    const result: Output<GT, GD, GC>[] = []

    while (!this.Source.Empty) {
      const inputs = await this.Source.resolve()

      console.log(`inputs`, inputs)

      //
      // How do we take inputs and put them in same form as expected by compute?
      //

      //
      // Perform compute
      //

      //
      // How can we take the outputs from compute and put them into our source?
      //
    }

    return result
  }

  /**
   * Queues data for future resolution, enabling dynamic data provisioning. This method allows the source to be replenished or augmented
   * with additional data elements, supporting flexible and adaptive data supply strategies.
   *
   * @param {...Input<GT, GD, GC>[]} input Variable number of data elements to queue, each conforming to the specified type, dimension, and cardinality.
   * @returns {Promise<void>}
   */
  async queue(..._input: Input<GT, GD, GC>[]): Promise<void> {}
}
