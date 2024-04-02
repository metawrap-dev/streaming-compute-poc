import { isParameters, isOneSourceParameter, isOneParameter } from '../../Design/ElementType.js'
import { type ICompute } from '../../Design/ICompute.js'
import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { DataNumber } from '../Data/DataNumber.js'
import { ElementCompute } from '../Element/ElementCompute.js'
import { SourceMemory } from '../Source/SourceMemory.js'

/**
 * This can multiply numbers together
 *
 * @author James McParlane
 * @interface
 */
export class ComputeMultiply extends ElementCompute implements ICompute<number, number> {
  /**
   * Inputs for the computation.
   * We massage everything into a source.
   * @type {ISource<I>}
   * @readonly
   */
  readonly Inputs: ISource<number>

  /**
   * What is the output of the multiplication.
   * @type {DataNumber}
   * @readonly
   */
  readonly Output: DataNumber = new DataNumber()

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
   */  
  constructor(input: ISource<number> | number | IData<number>, ...rest: (number | IData<number>)[])
   {
    super()

    console.log('ComputeMultiply:input ', input)
    console.log('ComputeMultiply:rest ', rest)

    // Is this a data-source?
    if (isOneSourceParameter<number>(input, rest)) {
       console.log('ComputeMultiply: Source passed')
       this.Inputs = input
    } else if (isOneParameter<number>(input) && isParameters<number>(rest)) {
      console.log('ComputeMultiply: Parameters passed')
      this.Inputs = new SourceMemory<number>(input, ...rest)
    } else {
      console.log('ComputeMultiply: One parameter passed')
      this.Inputs = new SourceMemory<number>(input)
    }    
  }

  /**
   * The output as data.
   * @type {IData<number>}
   */
  get Data(): number {
    return this.Output.Data
  }

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {
    const out: string[] = []
    out.push('(')
    
   
    out.push('multiply')

    out.push(this.Inputs.toString())
    
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
    
    // Our accumulator
    let a = 1    

    // Enforce the batch size of 1 for this compute element
    this.Inputs.setBatchSize(1)

    // Multiply all the inputs together one element at at time.
    while (!this.Inputs.Empty) {

      console.log(`Try....`)

      const resolved = await this.Inputs.resolve()

      console.log(`this.Inputs.resolve() => `,resolved)

      a *= resolved[0]
    }
    

    // Set the output value
    this.Output.set(a)

    // Be done.
    return this.Output.Data
  }
}
