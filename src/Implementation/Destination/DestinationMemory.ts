import { isResolvable, isSource } from '../../Design/ElementType.js'
import { type IDestination } from '../../Design/IDestination.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Output } from '../../Design/Types/Output.js'
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
export class DestinationMemory<T, D extends number, C extends number> extends ElementDestination implements IDestination<T, D, C> {
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
  readonly State: StateDestinationMemory<T, D, C> = new StateDestinationMemory<T, D, C>()

  /**
   * The strategy that can be applied to the destination's state.
   * @type {IStrategy}
   * @readonly
   */
  readonly Strategy: StrategyCommon = new StrategyCommon()

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
    return this.State.Resolved && this.State.Buffer.length === 0
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
  async write(...inputs: Input<T, D, C>[]): Promise<void> {
    for (const input of inputs) {
      this.State.Buffer.push(input)

      // Check the buffer and see if we can resolve the destination.
      await this.#checkBuffer()
    }

    /*
    console.log(`write`, one)

    // How many arguments did we get?
    const args = arguments.length

    // Is this a data-source?
    if (isOneSourceParameter<T>(args, one, rest)) {
      // Yes, let's add it in order
      console.log('SourceMemory: Source passed')
      this.State.Buffer.push(one)
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
    */
  }

  /**
   * Write one parameter to the destination.
   * @param {T | (T | IData<T>)[]} data The single argument of data to write.
   */
  /*
  async #writeArgument(data: T | IData<T,D<> | (T | IData<T>)[]): Promise<void> {
    // If it ios an array..
    if (isDataArray(data)) {
      // .. then write many
      await this.#writeMany(data)
    } else {
      // ... otherwise write one
      await this.#writeAtom(data)
    }
  }
  */

  /**
   * Write one parameter to the destination.
   * @param {T | IData<T>} data The single argument of data to write.
   */
  /*
  async #writeAtom(data: T | IData<T>): Promise<void> {
    if (data === undefined) {
      // Not a combination we can handle.
      throw new Error(`SourceMemory: Invalid parameters`)
    }

    this.State.Buffer.push(data)

    // Check the buffer and see if we can resolve the destination.
    await this.#checkBuffer()
  }
  */

  /**
   * Write one parameter to the destination.
   * @param {T | (T | IData<T>)[]}
   */
  /*
  async #writeMany(data: (T | IData<T>)[]): Promise<void> {
    // Add to the memory as a batch.
    this.State.Buffer.push(...data)

    // Check the buffer and see if we can resolve the destination.
    await this.#checkBuffer()
  }
  */

  /**
   * Check the buffer to see if we can resolve the destination.
   */

  async #checkBuffer(): Promise<void> {
    console.log(`CHECK BUFFER`)

    // If we are waiting
    if (this.Waiting) {
      // Then release the resource
      await this.release()
    } else {
      if (this.State.Buffer.length >= this.Config.BatchSize) {
        console.log(`resolve chunk to memory`)
        // We can resolve now because we have enough.
        await this.resolve()
      }
    }
  }

  /**
   * Output the destination as a string.
   * @returns {string}
   */
  toString(): string {
    const result: string[] = []

    result.push('{DestinationMemory(' + this.State.Storage.length + ' stored, ' + this.State.Buffer.length + ' in buffer, ' + this.Config.BatchSize + ' batch size) <= ')

    result.push('[')
    const buffer: string[] = []
    for (const d of this.State.Buffer) {
      buffer.push(d.toString())
    }
    result.push(buffer.join(','))
    result.push(']=>')
    result.push('[')
    const storage: string[] = []
    for (const s of this.State.Storage) {
      storage.push(s.toString())
    }
    result.push(storage.join(','))
    result.push(']')

    result.push('}')

    return result.join('')
  }
  /**
   * Resolve it using a promise.
   * @param {boolean} [wait=false] If true then wait for batch sizes to be met.
   * @async
   */
  async resolve(wait: boolean = false): Promise<void> {
    while (wait && this.State.Buffer.length < this.Config.BatchSize) {
      console.log(`WAIT FOR ENOUGH DATA`)
      // We can resolve now because we have enough.
      await this.wait()

      break
    }

    // We have called resolve at least once
    this.State.setResolved(true)

    // Walk the buffer and resolve each element
    for (const d of this.State.Buffer) {
      console.log(`resolve`, d)

      if (isSource<T, D, C>(d)) {
        // Make it adhere to our batch-size
        d.Config.setBatchSize(this.Config.BatchSize)

        // If it is a source, then we need to resolve it.
        while (!d.Empty) {
          // Resolve as a chunk and store
          this.State.Storage.push(...(await d.resolve()))
        }
      } else if (isResolvable<T, D, C>(d)) {
        // If it is resolved...
        if (d.Resolved) {
          // Then just push the data
          this.State.Storage.push(d.Data)
        } else {
          console.log('d', d)

          const resolved = await d.resolve(wait)

          console.log('resolved', resolved)

          this.State.Storage.push(resolved)

          /*
          for(const r of resolved) {
            this.State.Storage.push(await resolve<T,D>(r) as Output<T,D,A>)
          }
          */

          //this.State.Storage.push(...await d.resolve(wait))

          // Otherwise, we need to resolve and push it
          // this.State.Storage.push(await resolve<T,D>(d))
        }
      } else {
        // Just plain old data
        this.State.Storage.push(d as Output<T, D, C>)
      }
    }

    // Clear the buffer
    this.State.Buffer.length = 0
  }
}
