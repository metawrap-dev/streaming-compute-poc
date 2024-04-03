import { isDataArray, isOneParameter, isOneSourceParameter, isParameters, isResolvable, isSource } from '../../Design/ElementType.js'
import { type IData } from '../../Design/IData.js'
import { type IDestination } from '../../Design/IDestination.js'
import { type ISource } from '../../Design/ISource.js'
import { ConfigCommon } from '../Config/ConfigCommon.js'
import { ElementDestination } from '../Element/ElementDestination.js'
import { StateDestinationMemory } from '../State/StateDestinationMemory.js'
import { StrategyCommon } from '../Strategy/StrategyCommon.js'

/**
 * A destination for multiple data elements.
 *
 * We want a method to use this as just another output for a compute element.
 *
 * resolve() should be called when we are done writing to the destination (same as flushing a stream).
 *
 * @author James McParlane
 * @interface
 */
export class DestinationMemory<T> extends ElementDestination implements IDestination<T> {
  /**
   * The configuration for the destination.
   * @type {IConfig}
   * @readonly
   */
  readonly Config: ConfigCommon = new ConfigCommon()

  /**
   * The runtime state of the destination.
   * @type {IState}
   * @readonly
   */
  readonly State: StateDestinationMemory<T> = new StateDestinationMemory<T>()

  /**
   * The strategy that can be applied to the destination's state.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: StrategyCommon = new StrategyCommon()

  /**
   * The in memory storage data.
   * @type {(T | IData<T>)[]}
   * @private
   * @state
   */
  #Storage: T[] = []

  /**
   * The buffered data.
   * @type {(T | IData<T>)[]}
   * @private
   * @state
   */
  #Buffer: (ISource<T> | T | IData<T>)[] = []

  /**
   * If true then we have called resolved at least once
   * @type {boolean}
   * @private
   */
  #Resolved: boolean = false

  /**
   * Stores size of the batch that we hold in memory before we write to the destination.
   * @type {number}
   * @private
   * @config
   */
  #BatchSize: number = 1

  /**
   * How how many elements the destination can store before we stop and force a resolve.
   * @type {number}
   * @readonly
   */
  readonly MaxSize: number = Number.MAX_SAFE_INTEGER

  /**
   * If true then there is no more data to write.
   * @type {number}
   * @readonly
   */
  readonly Empty: boolean

  /**
   * Get the value for resolved.
   * @type {boolean}
   * @readonly
   */
  get Resolved(): boolean {
    return this.#Resolved && this.#Buffer.length === 0
  }

  /**
   * Gets the size of the batch that we hold in memory before we write to the destination.
   * @type {number}
   * @readonly
   */
  get BatchSize(): number {
    return this.#BatchSize
  }

  /**
   * Get the data from the destination.
   * @type {T}
   * @readonly
   */
  get Data(): T {
    // What do we do with this?
    throw new Error('This should not be invoked')
  }

  /**
   * Create a new destination.
   */
  constructor() {
    super()
  }

  /**
   * Write some data to the destination.
   * @param {T} one The data to write.
   * @param {(T | IData<T>)} rest The rest of the data to write.
   * @async
   */
  async write(one: ISource<T> | T | IData<T> | (T | IData<T>)[], ...rest: (T | IData<T>)[]): Promise<void> {
    console.log(`write`, one)

    // How many arguments did we get?
    const args = arguments.length

    // Is this a data-source?
    if (isOneSourceParameter<T>(args, one, rest)) {
      // Yes, let's add it in order
      console.log('SourceMemory: Source passed')
      this.#Buffer.push(one)
    } else if (isParameters<T>(args, rest)) {
      // Is it multiple parameters?
      // Multiple arguments
      console.log(`DestinationMemory:multiple arguments`)
      // Write the first...
      await this.#writeArgument(one)
      // Then we write the rest...
      for (const r of rest) {
        // but as atoms.
        await this.#writeAtom(r)
      }
    } else if (isOneParameter<T>(args, one)) {
      // Is it just a single parameter
      console.log('SourceMemory: One parameter passed')
      await this.#writeArgument(one)
    } else {
      // Not a combination we can handle.
      throw new Error(`SourceMemory: Invalid parameters`)
    }
  }

  /**
   * Write one parameter to the destination.
   * @param {T | (T | IData<T>)[]} data The single argument of data to write.
   */
  async #writeArgument(data: T | IData<T> | (T | IData<T>)[]): Promise<void> {
    // If it ios an array..
    if (isDataArray(data)) {
      // .. then write many
      await this.#writeMany(data)
    } else {
      // ... otherwise write one
      await this.#writeAtom(data)
    }
  }

  /**
   * Write one parameter to the destination.
   * @param {T | IData<T>} data The single argument of data to write.
   */
  async #writeAtom(data: T | IData<T>): Promise<void> {
    if (data === undefined) {
      // Not a combination we can handle.
      throw new Error(`SourceMemory: Invalid parameters`)
    }

    this.#Buffer.push(data)

    // Check the buffer and see if we can resolve the destination.
    await this.#checkBuffer()
  }

  /**
   * Write one parameter to the destination.
   * @param {T | (T | IData<T>)[]}
   */
  async #writeMany(data: (T | IData<T>)[]): Promise<void> {
    // Add to the memory as a batch.
    this.#Buffer.push(...data)

    // Check the buffer and see if we can resolve the destination.
    await this.#checkBuffer()
  }

  /**
   * Check the buffer to see if we can resolve the destination.
   */
  async #checkBuffer(): Promise<void> {
    if (this.#Buffer.length >= this.BatchSize) {
      console.log(`resolve chunk to memory`)
      await this.resolve()
    }
  }

  /**
   * Output the destination as a string.
   * @returns {string}
   */
  toString(): string {
    const result: string[] = []

    result.push('{DestinationMemory(' + this.#Storage.length + ' stored, ' + this.#Buffer.length + ' in buffer, ' + this.BatchSize + ' batch size) <= ')

    result.push('[')
    const buffer: string[] = []
    for (const d of this.#Buffer) {
      buffer.push(d.toString())
    }
    result.push(buffer.join(','))
    result.push(']=>')
    result.push('[')
    const storage: string[] = []
    for (const s of this.#Storage) {
      storage.push(s.toString())
    }
    result.push(storage.join(','))
    result.push(']')

    result.push('}')

    return result.join('')
  }

  /**
   * Resolve the destination.
   * @async
   */
  async resolve(): Promise<void> {
    // We have called resolve at least once
    this.#Resolved = true

    for (const d of this.#Buffer) {
      console.log(`resolve`, d)

      if (isSource<T>(d)) {
        // Make it adhere to our batch-size
        d.setBatchSize(this.#BatchSize)

        // If it is a source, then we need to resolve it.
        while (!d.Empty) {
          // Resolve as a chunk and store
          this.#Storage.push(...(await d.resolve()))
        }
      } else if (isResolvable(d)) {
        if (d.Resolved) {
          this.#Storage.push(d.Data)
        } else {
          this.#Storage.push(await d.resolve())
        }
      } else {
        this.#Storage.push(d)
      }
    }

    this.#Buffer.length = 0
  }

  /**
   * Set the batch size.
   * @param {number} batchSize The size of the batch.
   */
  setBatchSize(batchSize: number): void {
    this.#BatchSize = batchSize
  }
}