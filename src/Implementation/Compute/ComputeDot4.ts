import { isDataArray } from '../../Design/ElementType.js'
import { type IData } from '../../Design/IData.js'
import { DataNumber } from '../Data/DataNumber.js'
import { type DataVectorN } from '../Data/DataVectorN.js'
import { SourceMemory } from '../Source/SourceMemory.js'
import { StateComputeDot4 } from '../State/StateComputeDot4.js'
import { type Vector } from '../Utility/Vector.js'
import { Compute } from './Compute.js'

/**
 * Defines an input number in the various forms.
 * @type
 */
type inputNumber = number | IData<number>

/**
 * Defines an input vector in the various forms.
 * @type
 */
type primalVector = number[]

/**
 * Defines an input vector in the various forms.
 * @type
 */
type inputVector = Vector<inputNumber, 4> | inputNumber[] | DataVectorN

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
   * @param {inputVector} a The first input vector.
   */
  constructor(a: inputVector, b: inputVector) {
    console.log('ComputeDot4:a ', a)
    console.log('ComputeDot4:b ', b)

    if (a === undefined || b === undefined) throw new Error('ComputeDot4:constructor - Missing parameters.')

    // Assign inputs
    super(new SourceMemory<[inputVector, inputVector]>([a, b]), new DataNumber())
  }
  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<number> {
    // This is a hack to keep using ISource to store parameters while we are in transition
    // testing to see if ISource
    while (!this.Inputs.Empty) {
      console.log(`Try.... ${this.Inputs.Empty}`)

      const resolved = await this.Inputs.resolve(wait)

      console.log(`this.Inputs.resolve() => `, resolved)

      for (const pair of resolved) {
        const [a, b] = pair

        console.log(`pair `, pair)
        console.log(`a `, a)
        console.log(`b `, b)

        this.Output.set(dot4(await resolveVector(a), await resolveVector(b)))
      }
    }

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
