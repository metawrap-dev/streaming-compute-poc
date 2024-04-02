import { type ICompute } from '../Design/ICompute.js'
import { type IData } from '../Design/IData.js'
import { DataNumber } from './DataNumber.js'

/**
 * This can multiply numbers together
 *
 * @author James McParlane
 * @interface
 */
export class ComputeMultiply implements ICompute<number, number> {
  /**
   * What we are multiplying
   * @type {DataNumber[]}
   * @readonly
   */
  readonly Inputs: IData<number>[] = []

  /**
   * What is the output of the multiplication.
   * @type {DataNumber}
   * @readonly
   */
  readonly Output: DataNumber = new DataNumber()

  /**
   * If true then this has been executed.
   * @type {boolean}
   */
  readonly Resolved: boolean

  /**
   * @constructor
   * @param {DataNumber[]} inputs The numbers to multiply
   */
  constructor(...inputs: IData<number>[]) {
    for (const input of inputs) {
      this.Inputs.push(input)
    }
  }

  /**
   * The output as data.
   * @type {IData<number>}
   */
  get Data(): number {
    return this.Output.Data
  }

  toString(): string {
    const out: string[] = []
    out.push('(')
    for (const input of this.Inputs) {
      if (out.length > 1) {
        out.push('*')
      }
      out.push(input.toString())
    }
    out.push('=>')
    out.push(this.Output.toString())
    out.push(')')
    return out.join(' ')
  }

  /**
   * Executes the multiplication and return the answer.
   * @async
   */
  async resolve(): Promise<number> {
    // Multiply the inputs
    let a = 1
    for (const input of this.Inputs) {
      a *= await input.resolve()
    }

    // Set the output value
    this.Output.set(a)

    // Be done.
    return this.Output.Data
  }
}
