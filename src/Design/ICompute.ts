import { type IData } from './IData.js'
import { type IDescribable } from './IDescribable.js'
import { type IElement } from './IElement.js'
import { type Input } from './Types/Input.js'
import { type Cardinality, type Dimension } from './Types/Vector.js'

/**
 * A Compute ELement: Something that can take some inputs and compute a value that is returned.
 *
 * For now we assume that the inputs are of the same type.
 *
 * @author James McParlane
 * @template {type} IT The compute input type
 * @template {Dimension} ID The compute input dimension (The width of the input vector)
 * @template {Cardinality} IC The compute input cardinality (The number of items consumed by an invocation)
 * @template {type} IT The compute output type
 * @template {Dimension} ID The compute output dimension (The width of the output vector)
 * @template {Cardinality} IC The compute output cardinality (The number of items emitted by an invocation) 
 * @interface
 */
export interface ICompute<IT, ID extends Dimension, IC extends Cardinality, OT, OD extends Dimension, OC extends Cardinality> extends IDescribable, IData<OT, OD, OC>, IElement {
  /**
   * Inputs for the computation are a source of N inputs.
   * @type {Input<IT,ID>}
   * @readonly
   */
  readonly Inputs: Input<IT, ID, IC>

  /**
   * Return the number of arguments
   * @type {IC}
   */
  readonly InputWidth: IC

  /**
   * Output of the computation which is wrapped in IData so that we can built the AST
   * @type {IData<OT,OD,OC>}
   * @readonly
   */
  readonly Output: IData<OT, OD, OC>
}
