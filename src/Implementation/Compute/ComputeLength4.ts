import { isDataArray } from '../../Design/ElementType.js'
import { type IData } from '../../Design/IData.js'
import { DataNumber } from '../Data/DataNumber.js'
import { type DataVectorN } from '../Data/DataVectorN.js'
import { SourceMemory } from '../Source/SourceMemory.js'
import { StateComputeLength4 } from '../State/StateComputeLength4.js'
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
 * This can perform `length4` on `v4`
 *
 * @author James McParlane
 * @interface
 */
export class ComputeLength4<I extends inputVector> extends Compute<I, number> {
  /**
   * The runtime state of the compute multiply.
   * @type {IState}
   * @readonly
   */
  readonly State: StateComputeLength4 = new StateComputeLength4()

  /**
   * @constructor
   * @param {I} a The first input vector.
   */
  constructor(a?: I) {
    console.log('ComputeLength4:a ', a)

    // Get the source as an empty source or a source with initial data.
    const source = a === undefined ? new SourceMemory<I>() : new SourceMemory<I>(a)

    // Assign input and output
    super(source, new DataNumber())
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

      for (const a of resolved) {
        console.log(`a `, a)

        // Set the output data.
        this.Output.set(length4(await resolveVector(a)))
      }
    }

    // Be done.
    return this.Output.Data
  }
}

/**
 * Calculate the length of a v4
 * @param {number[4]} vectorA
 * @returns
 */
function length4(vectorA: number[]): number {
  if (vectorA.length !== 4) {
    throw new Error('Vector must be of length (4)')
  }

  // Calculate the length of vectorA
  return Math.sqrt(vectorA[0] * vectorA[0] + vectorA[1] * vectorA[1] + vectorA[2] * vectorA[2] + vectorA[3] * vectorA[3])
}
