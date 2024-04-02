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
   * A chained source
   * @type {ISource<T> | undefined}
   * @private
   */
  #Source?: ISource<T>

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
      console.log('SourceMemory: Source passed')
      this.#Source = input
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
    // Chain em if you got em..
    if (this.#Source !== undefined) return this.#Source.BatchSize

    // Otherwise return the batch size
    return this.#BatchSize
  }

  /**
   * If true then there is no more data to read.
   * @type {number}
   * @readonly
   */
  get Empty(): boolean {
    // Chain em if you got em..
    if (this.#Source !== undefined) return this.#Source.Empty

    // Otherwise return the empty status
    return this.#Index >= this.#Data.length
  }

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {
    const result: string[] = []

    result.push(`{SourceMemory(${this.#Data.length} elements, ${this.#Index} index, ${this.#BatchSize} batch size) <= `)

    // Chain em if you got em..
    if (this.#Source !== undefined) {
      result.push(this.#Source.toString())
    } else {
      // Otherwise just list the data
      result.push('[')
      for (let i = 0; i < this.#Data.length; i++) {
        result.push(this.#Data[i].toString())
        if (i !== this.#Data.length - 1) {
          result.push(',')
        }
      }
      result.push(']')
    }

    result.push('}')
    return result.join('')
  }

  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @readonly
   */
  get Resolved(): boolean {
    // Chain em if you got em..
    if (this.#Source !== undefined) return this.#Source.Resolved

    // Otherwise return the resolved status
    return this.#Resolved
  }

  /**
   * Resolve it using a promise.
   * @async
   */
  async resolve(): Promise<T[]> {
    // Chain em if you got em..
    if (this.#Source !== undefined) return this.#Source.resolve()

    // If we are already resolved then throw an error
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
    // Chain em if you got em..
    if (this.#Source !== undefined) return this.#Source.Data

    // If we are already resolved then return the data
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
    if (this.#Source !== undefined) {
      // Chain em if you got em..

      // For now we assume that we can manipulate batch sizes so all should be OK.

      this.#Source.setBatchSize(batchSize)
    } else {
      // Set the batch size locally
      this.#BatchSize = batchSize
    }
  }
}
