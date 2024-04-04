import { isOneParameter, isOneSourceParameter, isParameters } from '../../Design/ElementType.js'
import { type ICompute } from '../../Design/ICompute.js'
import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { DataVectorN } from '../Data/DataVectorN.js'
import { ElementCompute } from '../Element/ElementCompute.js'
import { SourceMemory } from '../Source/SourceMemory.js'
import { StateComputeDot4 } from '../State/StateComputeDot4.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'

/**
 * This can perform dot product.
 *
 * @author James McParlane
 * @interface
 */
export class ComputeDot4 extends ElementCompute implements ICompute<[number[], number[]], number[]> {
  /**
   * The configuration for the compute multiply.
   * This is the applied strategy.
   * @type {IConfig}
   * @readonly
   */
  readonly Config: ConfigCommon = new ConfigCommon()

  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeDot4 = new StateComputeDot4()

  /**
   * The strategy that can be applied to the compute multiply's config.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: StrategyCommon = new StrategyCommon()

  /**
   * Inputs for the computation.
   * We massage everything into a source.
   * @type {ISource<I>}
   * @readonly
   */
  readonly Inputs: ISource<[number[], number[]]>

  /**
   * What is the output of the multiplication.
   * @type {DataNumber}
   * @readonly
   */
  readonly Output: DataVectorN = new DataVectorN()

  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @readonly
   */
  get Resolved(): boolean {
    return this.Output.Resolved
  }

  /**
   * @constructor
   * @param {ISource<number[]> | number[] | IData<number[]>} input The input for the source that allows source chaining and composition
   */
  constructor(input: ISource<[number[], number[]]> | [number[], number[]] | IData<[number[], number[]]>, ...rest: ([number[], number[]] | IData<[number[], number[]]>)[]) {
    super()

    console.log('ComputeDot4:input ', input)
    console.log('ComputeDot4:rest ', rest)

    // How many arguments did we get?
    const args = arguments.length

    // Is this a data-source?
    if (isOneSourceParameter<[number[], number[]]>(args, input, rest)) {
      // Yes it is. We can use it directly.
      console.log('ComputeDot4: Source passed')
      this.Inputs = input
    } else if (isParameters<[number[], number[]]>(args, rest)) {
      // Is it multiple parameters?
      console.log('ComputeDot4: Parameters passed')
      this.Inputs = new SourceMemory<[number[], number[]]>(input, ...rest)
    } else if (isOneParameter<[number[], number[]]>(args, input)) {
      // Is it just a single parameter
      console.log('ComputeDot4: One parameter passed')
      this.Inputs = new SourceMemory<[number[], number[]]>(input)
    } else {
      // Not a combination we can handle.
      throw new Error(`ComputeDot4: Invalid parameters`)
    }
  }

  /**
   * The output as data.
   * @type {IData<number[]>}
   */
  get Data(): number[] {
    return this.Output.Data
  }

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {
    const out: string[] = []
    out.push('(')

    out.push('dot4')

    out.push(this.Inputs.toString())

    out.push('=>')
    out.push(this.Output.toString())
    out.push(')')
    return out.join(' ')
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(_wait: boolean = false): Promise<number[]> {
    // Enforce the batch size of 1 for this compute element

    const accumulator = this.State.Accumulator

    // If there is no input then we are done.
    // if (this.Inputs.Empty) return accumulator

    this.Inputs.Config.setBatchSize(1)

    // Dot4 all the inputs together one element at at time.
    while (!this.Inputs.Empty) {
      console.log(`Try.... ${this.Inputs.Empty}`)

      const resolved = await this.Inputs.resolve()

      console.log(`this.Inputs.resolve() => `, resolved)

      for (const pair of resolved) {
        const [a, b] = pair

        console.log(`pair `, pair)
        console.log(`a `, a)
        console.log(`b `, b)

        if (a.length !== 4) {
          throw new Error(`dot4 requires vector of length 4`)
        } else if (b.length !== 4) {
          throw new Error(`dot4 requires vector of length 4`)
        }

        accumulator.push(dot4(a, b))
      }
    }

    // Set the state
    //this.State.setAccumulator(accumulator)

    // Set the output value
    this.Output.set(accumulator)

    // Be done.
    return this.Output.Data
  }
}

/**
 *
 * @param {number[4]} vectorA
 * @param {number[4]} vectorB
 * @returns
 */
function dot4(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== 4 || vectorB.length !== 4) {
    throw new Error('Vectors must be of length (4)')
  }

  let product = 0
  for (let i = 0; i < vectorA.length; i++) {
    product += vectorA[i] * vectorB[i]
  }

  return product
}
