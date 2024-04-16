/* eslint-disable @typescript-eslint/no-misused-new */
import { type ICompute } from '../../Design/ICompute.js'
import { type IData } from '../../Design/IData.js'
import { type IGenerator } from '../../Design/IGenerator.js'
import { type ISource } from '../../Design/ISource.js'
import { isSource } from '../../Design/Types/ElementType.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Output } from '../../Design/Types/Output.js'
import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementSource } from '../Element/ElementSource.js'
import { StateGenerator } from '../State/StateGenerator.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'
import { describe } from '../Utility/Describe.js'

/**
 * Orchestrates a data processing pipeline, linking an `ISource` with an `ICompute` to produce another `ISource` containing
 * the result.
 *
 * @todo Also have an internal source for the generator to help composition when we return data from resolve() Semantics should
 * better match SourceMemory so we cam wait and resume properly.
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
  readonly Compute: new (...inputs: Input<IT, ID, IC>) => ICompute<IT, ID, IC, OT, OD, OC>

  /**
   *The number atoms remaining in the source.
   * @type {number | undefined}
   * @readonly
   */
  get Count(): number {
    // Accumulator
    let a = 0

    // Walk every element remaining in the source
    for (let i = this.State.Index; i < this.State.Data.length; i++) {
      // If a source then we go deeper
      if (isSource<GT, GD, GC>(this.State.Data[i])) {
        a += (this.State.Data[i] as ISource<GT, GD, GC>).Count
      } else {
        a++
      }
    }

    // return the result
    return a
  }

  /**
   * If true then there is no more data to read.
   * @type {number}
   * @readonly
   */
  get Empty(): boolean {
    // We are empty if our source is empty.
    return this.Source.Empty
  }

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
   *
   * @param {ISource<ST, SD, SC>} source The source of input for the compute element
   * @param {ICompute<IT, ID, IC, OT, OD, OC>} compute
   * @param {IDestination<Output<OT, OD, OC>, GD, GC>} destination
   */
  constructor(source: ISource<ST, SD, SC>, compute: new (...inputs: Input<IT, ID, IC>) => ICompute<IT, ID, IC, OT, OD, OC>) {
    super()
    this.Source = source
    this.Compute = compute
  }

  /**
   * Evaluate the arguments
   * @param {Input<IT, ID, IC>} input Input to another
   */
  async evaluate(inputs: Input<IT, ID, IC>): Promise<Output<OT, OD, OC>> {
    const compute = new this.Compute(...inputs)
    return await compute.resolve(true)
  }

  /**
   * Transforms data on the way in from the source to be suitable for the compute element.
   * @param {Output<ST, SD, SC>} source the output from the source
   * @returns {Input<IT, ID, IC>} input ready to be passed into the compute element.
   */
  transformIn(source: Output<ST, SD, SC>): Input<IT, ID, IC> {
    // For now we assume we will collapse this to having I = S
    return source as any
  }

  /**
   * Transforms data on the way out from the compute element to be suitable for the generator as a source.
   * @param source
   * @returns {Output<GT, GD, GC>} output ready to be passed into the generator's output queue.
   */
  transformOut(source: Output<OT, OD, OC>): Output<GT, GD, GC> {
    // For now we assume we will collapse this to having G = O
    return source as any
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
    const results: Output<GT, GD, GC>[] = []

    for (let i = 0; i < this.Config.BatchSize; i++) {
      if (!this.Source.Empty) {
        // We want to get one parameter set out at a time.
        this.Source.Config.setBatchSize(1)

        const source = await this.Source.resolve()

        //
        // How do we take inputs and put them in same form as expected by compute?
        //

        const inputs = this.transformIn(source[0])

        //
        // Perform compute
        //

        const result = await this.evaluate(inputs)

        //
        // How can we take the outputs from compute and put them into our internal source?
        //

        const output = this.transformOut(result)

        //
        // Add to our source queue
        //

        // Add it to the output for this call to resolve()
        results.push(output)

        // Queue it
        await this.queue(output)

        // Jump the queue because we return it here
        this.State.Index++
      }
    }

    // Return the results
    return results
  }

  toString(): string {
    //
    const result: string[] = []

    result.push(`{Generator(${this.State.Data.length} elements, ${this.Count} atoms, ${this.State.Index} index, ${this.Config.BatchSize} batch size)`)

    result.push(this.Source.toString())

    result.push('=>')

    result.push(this.Compute.name)

    result.push('=>')

    result.push('[')
    for (let i = 0; i < this.State.Data.length; i++) {
      const data = this.State.Data[i]

      result.push(describe(data))

      if (i !== this.State.Data.length - 1) {
        result.push(',')
      }
    }
    result.push(']')

    result.push(`}`)

    return result.join('')
  }

  /**
   * Queues data for future resolution, enabling dynamic data provisioning. This method allows the source to be replenished or augmented
   * with additional data elements, supporting flexible and adaptive data supply strategies.
   *
   * @param {...Input<GT, GD, GC>[]} input Variable number of data elements to queue, each conforming to the specified type, dimension, and cardinality.
   * @returns {Promise<void>}
   */
  async queue(...input: (ISource<GT, GD, GC> | Vector<Value<GT, GD>, GC> | IData<GT, GD, GC>)[]): Promise<void> {
    this.State.Data.push(...input)

    if (this.Waiting) {
      console.log(`ENOUGH DATA`)
      await this.release()
    }
  }
}
