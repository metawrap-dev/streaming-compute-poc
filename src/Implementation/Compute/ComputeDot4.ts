import { isDataArray } from '../../Design/ElementType.js'
import { type IData } from '../../Design/IData.js'
import { DataNumber } from '../Data/DataNumber.js'
import { type DataVectorN } from '../Data/DataVectorN.js'
import { SourceMemory } from '../Source/SourceMemory.js'
import { StateComputeDot4 } from '../State/StateComputeDot4.js'
import { Compute } from './Compute.js'

/**
 * Defines an input number in the various forms.
 * @type
 */
export type inputNumber = number | IData<number>

/**
 * Defines an input vector in the various forms.
 * @type
 */
export type primalVector = number[]

/**
 * Defines an input vector in the various forms.
 * @type
 */
export type inputVector = inputNumber[] | DataVectorN

/**
 *
 * @param input
 * @returns
 */
async function resolveVector(input: inputVector): Promise<primalVector> {
  if (isDataArray(input)) {
    const output: number[] = []
    for (const i of input) {
      if (typeof i === 'number') {
        output.push(i)
      } else {
        output.push(await i.resolve(true))
      }
    }
    return output
  } else {
    // Just return a reference. (Danger! but let's not clone until we find we need to.)
    return input.Data
  }
}

/**
 * This can perform `dot4` on `v4`
 *
 * @author James McParlane
 * @interface
 */
export class ComputeDot4 extends Compute<[inputVector, inputVector], number> {
  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeDot4 = new StateComputeDot4()

  /**
   * @constructor
   * @param {ISource<number[]> | number[] | IData<number[]>} input The input for the source that allows source chaining and composition
   */
  constructor(a?: (number | IData<number>)[] | DataVectorN, b?: (number | IData<number>)[] | DataVectorN) {
    console.log('ComputeDot4:a ', a)
    console.log('ComputeDot4:b ', b)

    // Get the source as an empty source or a source with initial data.
    const source = a === undefined ? new SourceMemory<[inputVector, inputVector]>() : new SourceMemory<[inputVector, inputVector]>([a, b])

    // Assign inputs
    super(source, new DataNumber())

    // this.Inputs =
  }

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  /*
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
  */

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(_wait: boolean = false): Promise<number> {
    // Enforce the batch size of 1 for this compute element

    //const accumulator = this.State.Accumulator

    // If there is no input then we are done.
    // if (this.Inputs.Empty) return accumulator

    //this.Inputs.Config.setBatchSize(1)

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

        /*
        if (a.length !== 4) {
          throw new Error(`dot4 requires vector of length 4`)
        } else if (b.length !== 4) {
          throw new Error(`dot4 requires vector of length 4`)
        }

        accumulator.push(dot4(a, b))
        */

        this.Output.set(dot4(await resolveVector(a), await resolveVector(b)))
      }
    }

    // Set the state
    //this.State.setAccumulator(accumulator)

    // Set the output value
    // this.Output.set(accumulator)

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
