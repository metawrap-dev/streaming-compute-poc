import { isOneParameter, isOneSourceParameter, isParameters, isResolvable, isSource } from '../../Design/ElementType.js'
import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementSource } from '../Element/ElementSource.js'
import { StateSourceMemory } from '../State/StateSourceMemory.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'

/**
 * Data Element: Some form of data that can be fed into a compute element.
 * @class
 */
export class SourceMemory<T> extends ElementSource implements ISource<T> {
  /**
   * The configuration for the source.
   * @type {IConfig}
   * @readonly
   */
  readonly Config: ConfigCommon = new ConfigCommon()

  /**
   * The runtime state of the source.
   * @type {IState}
   * @readonly
   */
  readonly State: StateSourceMemory<T> = new StateSourceMemory<T>()

  /**
   * The strategy that can be applied to the source's state.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: StrategyCommon = new StrategyCommon()

  /**
   * How are are we into the source in memory.
   * @type {number}
   * @private
   * @state ??
   */
  #Index: number = 0

  /**
   * The data in memory.
   * @state ??
   * @type {(ISource<T> | T | IData<T>)[]}
   * @private
   */
  #Data: (ISource<T> | T | IData<T>)[] = []

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
  constructor(input: ISource<T> | T | IData<T>, ...rest: (ISource<T> | T | IData<T>)[]) {
    super()

    // How many arguments did we get?
    const args = arguments.length

    console.log('SourceMemory:input ', input)
    console.log('SourceMemory:rest ', rest)

    // Is this a data-source?
    if (isOneSourceParameter<T>(args, input, rest)) {
      // Yes it is. We can use it directly.
      console.log('SourceMemory: Source passed')
      this.#Data.push(input)
    } else if (isParameters<T>(args, rest)) {
      // Is it multiple parameters?
      console.log('SourceMemory: Parameters passed')
      this.#Data.push(input)
      this.#Data.push(...rest)
    } else if (isOneParameter<T>(args, input)) {
      // Is it just a single parameter
      console.log('SourceMemory: One parameter passed')
      this.#Data.push(input)
    } else {
      // Not a combination we can handle.
      throw new Error(`SourceMemory: Invalid parameters`)
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
    // If we have data remaining
    if (this.#Index < this.#Data.length) {
      // If the first element is a source...
      if (isSource<T>(this.#Data[this.#Index])) {
        // If it is a source then check if it is empty
        return (this.#Data[this.#Index] as ISource<T>).Empty

        // TODO: We should also check if any other elements are not sources
      } else {
        // Otherwise we have data
        return false
      }
    } else {
      return true
    }
  }

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {
    const result: string[] = []

    result.push(`{SourceMemory(${this.#Data.length} elements, atoms ${this.Count}, ${this.#Index} index, ${this.#BatchSize} batch size) <= `)

    {
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
    // Otherwise return the resolved status
    return this.#Resolved
  }

  /**
   *The number atoms in the source.
   * @type {number | undefined}
   * @readonly
   */
  get Count(): number {
    // Accumulator
    let a = 0

    // Walk every element in the source
    for (let i = this.#Index; i < this.#Data.length; i++) {
      // If a source then we go deeper
      if (isSource<T>(this.#Data[i])) {
        a += (this.#Data[i] as ISource<T>).Count
      } else {
        a++
      }
    }

    // return the result
    return a
  }

  /**
   * Resolve it using a promise.
   * @async
   */
  async resolve(): Promise<T[]> {
    // If we are already resolved then throw an error
    if (this.#Resolved) {
      throw new Error(`Source is already resolved.`)
    }

    const result: T[] = []

    // Get a complete batch out of it.
    // @todo: Does it matter that we will sometimes be under the batch size?
    //        The only way we can wait is by switching to a generator or being a bit more
    //        exotic with how we use Promise.
    //
    while (result.length < this.BatchSize && !this.Empty) {
      // Get the current element
      const element = this.#Data[this.#Index]

      // Is it s source?
      if (isSource<T>(element)) {
        // How many elements do we need to get the batch size we want?
        const remaining = this.#BatchSize - result.length
        console.log(`result.length ${result.length} remaining ${remaining} batchSize ${this.#BatchSize}`)

        // If we need to...
        if (element.BatchSize !== remaining) {
          // .. set a new batch size.
          element.setBatchSize(remaining)
        }

        // Get that many elements from the source
        // @todo - we want this to block until resolved.
        result.push(...(await element.resolve()))

        // If we have trained this source.
        if (element.Empty) {
          // Advance the index
          this.#Index++
        }
      } else {
        // Get the element
        if (isResolvable<T>(element)) {
          if (!element.Resolved) {
            // We need to resolve it
            // @todo - we want this to block until resolved.
            result.push(await element.resolve())
          } else {
            // It is already resolved
            result.push(element.Data)
          }
        } else {
          // It is not resolvable
          result.push(element as T)
        }

        // Advance the index
        this.#Index++
      }
    }

    // If we are empty, then we are done.
    if (this.Empty) {
      this.#Resolved = true
    }
    return result
  }

  /**
   * Set the batch size.
   * @param {number} batchSize The batch size to set
   */
  setBatchSize(batchSize: number): void {
    // Set the batch size locally
    this.#BatchSize = batchSize
  }
}
