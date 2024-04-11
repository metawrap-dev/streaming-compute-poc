import { type ICompute } from './ICompute.js'
import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type ISource } from './ISource.js'
import { type Output } from './Types/Output.js'

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
export interface IGenerator<ST, SD extends number, SC extends number, IT, ID extends number, IC extends number, OT, OD extends number, OC extends number, GT, GD extends number, GC extends number> extends IDescribable, IElement, ISource<GT, GD, GC> {
  /**
   * The source of input for the compute element
   * @type {ISource<ST, SD, SC>}
   * @readonly
   */
  readonly Source: ISource<ST, SD, SC>

  /**
   * The compute element that processes the input data and submits it the destination.
   * @type {ICompute<IT, ID, IC, OT, OD, OC>}
   * @readonly
   */
  readonly Compute: ICompute<IT, ID, IC, OT, OD, OC>

  /**
   * @constructor
   * @param {ISource<ST, SD, SC>} source The source of input for the compute element
   * @param {ICompute<IT, ID, IC, OT, OD, OC>} compute The compute element that processes the input data
   */
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  // new (source: ISource<ST, SD, SC>, compute: ICompute<IT, ID, IC, OT, OD, OC>): IGenerator<ST, SD, SC, IT, ID, IC, OT, OD, OC, GT, GD, GC>
}
