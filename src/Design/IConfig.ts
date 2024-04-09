/**
 * Represents the configuration settings for a system that processes data in batches.
 * This interface allows for the specification and modification of settings that affect
 * how data is batched and processed, offering a mechanism to control operational
 * characteristics such as batch size. The interface ensures that configurations can be
 * both retrieved in a read-only manner and updated via specified methods, encapsulating
 * the settings in a manner that promotes encapsulation and controlled modification.
 *
 * @author James McParlane
 * @interface
 */
export interface IConfig {
  /**
   * Retrieves the current batch size setting. The batch size determines how many elements
   * are processed together in a single batch. This setting is crucial for optimizing
   * performance and resource usage, affecting how data is grouped and processed through
   * the system. A larger batch size may improve throughput but at the cost of increased
   * memory usage, while a smaller batch size can reduce memory demands but might decrease
   * processing efficiency.
   *
   * @type {number}
   * @readonly
   */
  readonly BatchSize: number

  /**
   * Updates the batch size setting to a new value. This method allows dynamic adjustment of
   * how data is batched for processing, enabling the system to adapt to different operational
   * requirements or optimize resource allocation. Changing the batch size can significantly
   * impact the performance and behavior of the data processing workflow, and as such, it
   * should be used judiciously to balance between throughput, latency, and resource consumption.
   *
   * @param {number} batchSize - The new batch size to set. This value specifies the number
   *                             of elements to include in each batch during processing. The
   *                             value should be a positive integer, with the system or
   *                             application defining any upper or lower limits as necessary.
   */
  setBatchSize(batchSize: number): void
}
