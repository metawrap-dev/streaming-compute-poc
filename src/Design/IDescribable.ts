/**
 * Defines a contract for objects that can be textually described. This interface serves as a foundation
 * for a more complex structure intended for detailed descriptions, potentially as part of a visitor pattern
 * implementation in the future.
 *
 * The `toString` method is expected to return a string representation of the implementing entity, offering
 * a standardized approach to retrieve descriptive information. This capability is crucial for logging,
 * debugging, and displaying human-readable information about objects.
 *
 * @todo Expand to integrate with a visitor class for more complex descriptive behaviors.
 * @author James McParlane
 * @interface
 */
export interface IDescribable {
  /**
   * Generates and returns a textual description of the implementing entity.
   *
   * This method is pivotal for providing insights into the state or identity of an instance,
   * facilitating better understanding and readability when interacting with objects,
   * especially in debugging and logging scenarios.
   *
   * @returns {string} A string representation of the entity.
   */
  toString(): string
}
