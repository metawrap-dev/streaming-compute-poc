/**
 * A synchronizer for waiting and releasing resources.
 * @class
 */

export class Synchronizer {
  /**
   * The promise that is resolved when the resource is available.
   * @type {(Promise<void> | null)}
   */
  #Promise: Promise<void> | null = null

  /**
   * The resolver that resolves the promise.
   * @type {(() => void) | null}
   */
  #Resolver: (() => void) | null = null

  /**
   * Indicates if the system is currently waiting.
   * @type {boolean}
   * @readonly
   */
  get Waiting(): boolean {
    return this.#Promise !== null
  }

  /**
   * Wait for the resource to be resolvable. Creates a new promise if not already waiting.
   * @async
   */
  async wait(): Promise<void> {
    if (!this.#Promise) {
      this.#Promise = new Promise<void>((resolve) => {
        this.#Resolver = resolve
      })
    }
    return this.#Promise
  }

  /**
   * Release the waiting resource by resolving the promise, which would unblock the method that called wait.
   * @async
   */
  async release(): Promise<void> {
    if (this.#Resolver) {
      this.#Resolver()
      // Reset the promise and resolver to allow wait to be called again.
      this.#Promise = null
      this.#Resolver = null
    }
  }
}
