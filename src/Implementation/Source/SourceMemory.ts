import { type ISource } from '../../Design/ISource.js'
import { isResolvable, isSource } from '../../Design/Types/ElementType.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Output } from '../../Design/Types/Output.js'
import { describe } from '..//Utility/Describe.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementSource } from '../Element/ElementSource.js'
import { StateSourceMemory } from '../State/StateSourceMemory.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'
import { resolve } from '../Utility/Resolve.js'

/**
 * A Source of data that resides in memory and can stream data.
 *
 *
 * @note We can use different strategies to store the data. Packed data buffer? Even something like https://github.com/stdlib-js/stdlib/tree/develop/lib/node_modules/%40stdlib/ndarray/ctor for node.js.
 *
 * We want this to also potentially be able to be sent to the GPU and reside there as a source.
 *
 * eg. Data or in code-data or texture memory?
 *
 * Concept of global address may need to be considered. SO we separate generic source and memory source.
 * We want to be able to load a disk source into a memory source.
 *
 * @class
 */
export class SourceMemory<T, D extends number, C extends number> extends ElementSource implements ISource<T, D, C> {
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
  readonly State: StateSourceMemory<T, D, C> = new StateSourceMemory<T, D, C>()

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
  constructor(...input: Input<T, D, C>[]) {
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
      if (isSource<T, D, C>(this.State.Data[this.State.Index])) {
        // If it is a source then check if it is empty
        return (this.State.Data[this.State.Index] as ISource<T, D, C>).Empty

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

      result.push(describe(data))

      if (i !== this.State.Data.length - 1) {
        result.push(',')
      }
    }
    result.push(']')

    result.push('}')
    return result.join('')
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
    for (let i = this.State.Index; i < this.State.Data.length; i++) {
      // If a source then we go deeper
      if (isSource<T, D, C>(this.State.Data[i])) {
        a += (this.State.Data[i] as ISource<T, D, C>).Count
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
  async resolve(wait: boolean = false): Promise<Output<T, D, C>[]> {
    // We will build this result.
    const result: Output<T, D, C>[] = []

    // Get a complete batch out of it.
    while (result.length < this.Config.BatchSize) {
      // Get the current element
      const element = this.State.Data[this.State.Index]

      // Is it s source?
      if (isSource<T, D, C>(element)) {
        // How many remaining in the source?
        const remaining = this.Config.BatchSize - result.length
        console.log(`isSource: result.length ${result.length} remaining ${remaining} batchSize ${this.Config.BatchSize}`)

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
        if (isResolvable<T, D, C>(element)) {
          if (!element.Resolved) {
            // Resolve and push it.
            result.push(await element.resolve(wait))
          } else {
            // It is already resolved, get the data.
            result.push(element.Data)
          }
        } else {
          // It is not resolvable, but maybe it's children are, so we
          // pass it through resolve() to see if we can resolve it deeper.
          result.push(await resolve<T, D, C>(wait, element))
        }

        // Advance the index
        this.State.Index++
      }

      // Do we have a complete batch?
      if (result.length === this.Config.BatchSize) {
        // We have a complete batch, so we break out now.
        break
      } else if (this.Empty) {
        // How many remaining in the source?
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
      // Say we are resolved.
      this.State.setResolved(true)
    }
    return result
  }

  /**
   * Queue some data to be fed into the source that can be resolved later on.
   * @param {data: ISource<T> | T | (T | IData<T>)[] }
   * @async
   */
  async queue(...input: Input<T, D, C>[]): Promise<void> {
    this.State.Data.push(...input)

    if (this.Waiting) {
      await this.release()
    }
  }
}
