/**
 * Defines a contract for objects that require synchronization mechanisms, particularly
 * for managing access to shared resources. It includes operations to initiate waiting
 * for a resource to become available, to release the resource, and to check if the current
 * state is waiting. This pattern is useful in concurrent programming where controlled
 * access to resources is necessary to prevent race conditions and ensure data integrity.
 *
 * @interface
 */
export interface ISynchronizable {
  /**
   * Initiates a wait operation, pausing the caller until the shared resource becomes
   * available. This method is typically used to prevent race conditions by ensuring that
   * the resource is not accessed simultaneously by multiple consumers.
   *
   * @returns {Promise<void>} A promise that resolves when it's safe to access the resource.
   */
  wait(): Promise<void>

  /**
   * Releases the shared resource, potentially allowing other waiting operations to proceed.
   * This method should be called after the work requiring exclusive access to the resource
   * is completed, to ensure that other consumers can safely access the resource.
   *
   * @returns {Promise<void>} A promise that resolves when the resource has been successfully released.
   */
  release(): Promise<void>

  /**
   * Indicates whether a wait operation is currently in progress for the shared resource.
   * This property can be used to check the synchronization state and make decisions based
   * on whether the resource is currently being waited on.
   *
   * @type {boolean}
   * @readonly
   */
  readonly Waiting: boolean
}
