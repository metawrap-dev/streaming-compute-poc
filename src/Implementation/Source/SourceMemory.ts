import { isDataArray, isResolvable, isSource } from '../../Design/ElementType.js'
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
   * @constructor
   * @param {T | IData<T>} inputs The input for the source
   */
  constructor(...input: (ISource<T> | T | IData<T>)[]) {
    super()

    // Queue the data
    this.State.Data.push(...input)
  }

  /**
   * If true then there is no more data to read.
   * @type {number}
   * @readonly
   */
  get Empty(): boolean {
    // If we have data remaining
    if (this.State.Index < this.State.Data.length) {
      // If the first element is a source...
      if (isSource<T>(this.State.Data[this.State.Index])) {
        // If it is a source then check if it is empty
        return (this.State.Data[this.State.Index] as ISource<T>).Empty

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

    result.push(`{SourceMemory(${this.State.Data.length} elements, atoms ${this.Count}, ${this.State.Index} index, ${this.Config.BatchSize} batch size) <= `)

    result.push('[')
    for (let i = 0; i < this.State.Data.length; i++) {
      const data = this.State.Data[i]

      if (isDataArray(data)) result.push('[')
      result.push(data.toString())
      if (isDataArray(data)) result.push(']')

      if (i !== this.State.Data.length - 1) {
        result.push(',')
      }
    }
    result.push(']')

    result.push('}')
    return result.join('')
  }

  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @readonly
   */
  /*
  get Resolved(): boolean {
    // Otherwise return the resolved status
    return this.State.Resolved
  }
  &/

  /**
   *The number atoms in the source.
   * @type {number | undefined}
   * @readonly
   */
  get Count(): number {
    // Accumulator
    let a = 0

    // Walk every element in the source
    for (let i = this.State.Index; i < this.State.Data.length; i++) {
      // If a source then we go deeper
      if (isSource<T>(this.State.Data[i])) {
        a += (this.State.Data[i] as ISource<T>).Count
      } else {
        a++
      }
    }

    // return the result
    return a
  }

  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<T[]> {
    const result: T[] = []

    // Get a complete batch out of it.
    while (result.length < this.Config.BatchSize) {
      // Get the current element
      const element = this.State.Data[this.State.Index]

      // Is it s source?
      if (isSource<T>(element)) {
        // How many elements do we need to get the batch size we want?
        const remaining = this.Config.BatchSize - result.length
        console.log(`result.length ${result.length} remaining ${remaining} batchSize ${this.Config.BatchSize}`)

        // If we need to...
        if (element.Config.BatchSize !== remaining) {
          // .. set a new batch size.
          element.Config.setBatchSize(remaining)
        }

        // Get that many elements from the source
        // @todo - we want this to block until resolved.
        result.push(...(await element.resolve()))

        // If we have trained this source.
        if (element.Empty) {
          // Advance the index
          this.State.Index++
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
        this.State.Index++
      }

      // Do we have a complete batch?
      if (result.length === this.Config.BatchSize) {
        // We have a complete batch, so we break out now.
        break
      } else if (this.Empty) {
        const remaining = this.Config.BatchSize - result.length

        if (wait) {
          console.log(`WAITING TO COMPLETE BATCH - need ${remaining} items to complete batch of ${this.Config.BatchSize} items.`)
          // We wait for more data to come in.
          await this.wait()
        } else {
          break
        }
      }
    }

    // If we are empty, then we are done.
    if (this.Empty) {
      this.State.setResolved(true)
    }
    return result
  }

  /**
   * Queue some data to be fed into the source that can be resolved later on.
   * @param {data: ISource<T> | T | (T | IData<T>)[] }
   * @async
   */
  async queue(...input: (ISource<T> | T | IData<T>)[]): Promise<void> {
    this.State.Data.push(...input)

    if (this.Waiting) {
      await this.release()
    }
  }
}
