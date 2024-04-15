import { type IData } from './IData.js'
import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type IRecyclable } from './IRecyclable.js'
import { type Arguments } from './Types/Arguments.js'
import { type Input } from './Types/Input.js'
import { type Output } from './Types/Output.js'
import { type Value } from './Types/Value.js'

/**
 * Defines the contract for a computational element capable of processing inputs to produce outputs.
 * The compute element is designed to work with inputs and outputs of specified types, dimensions, and
 * cardinalities, ensuring type safety and predictability in data processing operations.
 *
 * For simplicity, this version assumes that all inputs share the same type and structure, and similarly,
 * all outputs conform to a unified type and structure.
 *
 * @author James McParlane
 * @template {type} IT Input type: The type of data this compute element accepts.
 * @template {number} ID Input dimension: Specifies the "shape" or structure of each input item (e.g., scalar, vector).
 * @template {number}IC Input cardinality: The number of items consumed by the compute element in a single operation.
 * @template {type} OT Output type: The type of data this compute element produces.
 * @template {number}OD Output dimension: Defines the structure of the output data, similar to input dimension.
 * @template {number}OC Output cardinality: The number of items produced by the compute element upon completion of its computation.
 * @interface
 */
export interface ICompute<IT, ID extends number, IC extends number, OT, OD extends number, OC extends number> extends IDescribable, IData<OT, OD, OC>, IElement, IRecyclable {
  /**
   * Represents the inputs required for computation, encapsulating the types, dimensions, and cardinalities of the
   * data that this compute element processes. The inputs are specified as a vector, ensuring that they align with
   * the declared type, dimension, and cardinality requirements.
   *
   * @type {Input<IT, ID, IC>}
   * @readonly
   */
  readonly Inputs: Input<IT, ID, IC>

  /**
   * Evaluate the compute element
   * @param {Arguments<Value<IT, ID>, IC>} inputs Arguments spread into a tuple or array
   * @returns
   * @async
   */
  evaluate(...inputs: Arguments<Value<IT, ID>, IC>): Promise<Output<OT, OD, OC>>

  /**
   * Encapsulates the output produced by the computation, wrapped within the `IData` interface to integrate seamlessly
   * into the pipeline's abstract syntax tree (AST). This design allows for the outputs to be not just data, but also
   * descriptive elements that can be further analyzed or processed within the pipeline.
   *
   * @type {IData<OT, OD, OC>}
   * @readonly
   */
  readonly Output: IData<OT, OD, OC>
}
