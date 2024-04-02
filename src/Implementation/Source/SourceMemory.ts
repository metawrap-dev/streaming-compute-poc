import { isOneParameter, isOneSourceParameter, isParameters, isResolvable } from '../../Design/ElementType.js'
import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { ElementSource } from '../Element/ElementSource.js'

/**
 * Data Element: Some form of data that can be fed into a compute element.
 * @class
 */
export class SourceMemory<T> extends ElementSource implements ISource<T> {
  
  /**
   * How are are we into the source in memory.
   * @type {number}
   * @private
   */
  #Index: number = 0

  /**
   * The data in memory.
   * @type {(T | IData<T>)[]}
   * @private
   */
  #Data: (T | IData<T>)[] = []
  
  /**
   * What we resolved the data to.
   * @type {T[]}
   * @private
   */
  #ResolvedData: T[] = []
  
  /**
   * Stores how large a chunk of data we want to resolve at a time.
   * @type {number}
   * @private
   */
  #BatchSize: number = 1


  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @private
   */
  #Resolved: boolean = false

  /**
   * @constructor
   * @param {T | IData<T>} inputs The input for the source
   */
  constructor(input: ISource<T> | T | IData<T>, ...rest: (T | IData<T>)[]) {

    super()
  
    console.log('SourceMemory:input ', input)
    console.log('SourceMemory:rest ', rest)

    // Is this a data-source?
    if (isOneSourceParameter<T>(input, rest)) {
      // console.log('SourceMemory: Source passed')
    } else if (isOneParameter<T>(input) && isParameters<T>(rest)) {
      console.log('SourceMemory: Parameters passed')
      this.#Data.push(input)
      this.#Data.push(...rest)
      
    } else {
      console.log('SourceMemory: One parameter passed')
      this.#Data.push(input)
    }
    
  }

  
  /**
   * Gets how large a chunk of data we want to resolve at a time.
   * @type {number}
   * @readonly
   */
  get BatchSize(): number {
    return this.#BatchSize
  }
    

  /**
   * If true then there is no more data to read.
   * @type {number}
   * @readonly
   */
  get Empty(): boolean {
    return this.#Index >= this.#Data.length
  }

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {

    const result: string[] = []

    result.push(`{SourceMemory(${this.#Data.length} elements, ${this.#Index} index, ${this.#BatchSize} batch size) <= [`)

    for(let i = 0; i < this.#Data.length; i++) {
      result.push(this.#Data[i].toString())
      if (i !== this.#Data.length - 1) {
        result.push(',')
      }
    }
    
    result.push(']}')
    return result.join('')
  }

  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @readonly
   */
  get Resolved(): boolean {
    return this.#Resolved
  }

  
  /**
   * Resolve it using a promise.
   * @async
   */
  async resolve(): Promise<T[]> {
    if (this.#Resolved) {
      throw new Error(`Source is already resolved.`)
    }


    const result: T[] = []

    for (let i = 0; i < this.BatchSize && !this.Empty; i++) {

      // Get the element
      const element = this.#Data[this.#Index++]


      if (isResolvable<T>(element)) {
        if (!element.Resolved) {
          const resolved = await element.resolve()

          this.#ResolvedData.push(resolved)

          // We need to resolve it
          result.push(resolved)
        } else {
          const data = element.Data

          this.#ResolvedData.push(data)

          // It is already resolved
          result.push(data)
        }
      } else {
        // It is not resolvable
        this.#ResolvedData.push(element as T)

        result.push(element as T)
      }
    }

    if (this.Empty) {
      this.#Resolved = true
    }
    return result
  }

  /**
   * The resolved data as an array.
   * @type {T[]}
   * @readonly
   */
  get Data(): T[] {
    if (this.Resolved) {
      return this.#ResolvedData
    }
    throw new Error(`SourceMemory is not resolved.`)
  }

  /**
   * Set the batch size.
   * @param {number} batchSize The batch size to set
   */
  setBatchSize(batchSize: number): void {
    this.#BatchSize = batchSize
  }
}
