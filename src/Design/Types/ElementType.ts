import { type IData } from '../IData.js'
import { type IElement } from '../IElement.js'
import { type IResolvable } from '../IResolvable.js'
import { type ISource } from '../ISource.js'
import { type Value } from './Value.js'
import { type Vector } from './Vector.js'

/**
 * Enum defining the types of elements that can exist within a pipeline graph. This categorization
 * aids in identifying and differentiating the roles of various components in the data flow, from
 * data provision to computation, and data destination.
 *
 * @author James McParlane
 */
export enum ElementType {
  /**
   * Represents an element that supplies a single piece of data. This type is typically used for
   * static data elements or constants within the pipeline.
   */
  Data,

  /**
   * Represents an element that supplies a stream of data, possibly continuously. Sources are ideal
   * for ingesting data from external systems, databases, or real-time data streams.
   */
  Source,

  /**
   * Represents an element capable of performing computations or transformations on data. Compute
   * elements are the functional units of the pipeline, processing input data to produce output.
   */
  Compute,

  /**
   * Represents an element intended as a final destination for data, possibly for storage, display,
   * or forwarding to another system. Destination elements conclude the data processing workflow.
   */
  Destination,
}

/**
 * Checks if the given object is not `undefined`. This type guard enhances the type inference
 * allowing TypeScript to narrow down the type to `object` from `unknown` if the check passes.
 *
 * @param {unknown} object - The object to be checked.
 * @returns {boolean} `true` if the object is not `undefined`.
 */
function isNotUndefined(object: unknown): object is object {
  return object !== undefined
}

/**
 * Determines if a given object conforms to the `ISource` interface, indicating it is a data source
 * element within the pipeline. This type guard allows for type-safe interaction with source elements.
 *
 * @param {unknown} object - The object to inspect.
 * @returns {boolean} `true` if the object is an instance of `ISource`.
 */
export function isSource<T, D extends number, C extends number>(object: unknown): object is ISource<T, D, C> {
  return isNotUndefined(object) && (object as ISource<T, D, C>).Type === ElementType.Source
}

/**
 * Asserts whether the provided object matches the `IData` interface, signifying that it is a data
 * element. This check is useful for identifying static or singular data entities in the pipeline.
 *
 * @param {unknown} object - The object to verify.
 * @returns {boolean} `true` if the object fits the `IData` interface.
 */
export function isData<T, D extends number, C extends number>(object: unknown): object is IData<T, D, C> {
  return isNotUndefined(object) && (object as IData<T, D, C>).Type === ElementType.Data
}

/**
 * Verifies if the given object is an array of `Vector<Value<T, D>, C>` types, indicating it is a collection
 * of value vectors. This type guard loosely identifies arrays of values, enabling batch operations on collections
 * of pipeline data.
 *
 * @param {unknown} object - The object to test.
 * @returns {boolean} `true` if the object is an array of value vectors.
 */
export function isValueArray<T, D extends number, C extends number>(object: unknown): object is Vector<Value<T, D>, C>[] {
  return isNotUndefined(object) && Array.isArray(object) && object.length > 0
}

/**
 * Confirms whether the provided object can be considered as an input value, distinct from being a data source.
 * This type guard factors in dimensionality and cardinality to accommodate various data structures beyond sources.
 *
 * @todo Do we need this?
 *
 * @param {unknown} object - The object to evaluate.
 * @param {D} dimension - The expected dimension of the input values.
 * @param {C} width - The expected cardinality of the input values.
 * @returns {boolean} `true` if the object matches the criteria for an input value.
 */
/*
export function isInputValue<T, D extends number, C extends number>(object: unknown, dimension: D, width: C): object is Vector<Value<T, D>, C> {
  return isNotUndefined(object) && Array.isArray(object) && ((width === 1 && (dimension == 0 || object.length === dimension)) || width === 0 || object.length === width)
}
*/

/**
 * Evaluates whether the provided object adheres to the `IResolvable` interface, indicating that it
 * can be resolved or processed further within the context of the pipeline. This type-guard facilitates
 * the identification of elements that are not only present within the data processing pipeline but also
 * possess the capability to be dynamically resolved, such as through computation, fetching additional data,
 * or undergoing transformation processes. The use of this type-guard promotes a type-safe way of handling
 * potentially resolvable entities, ensuring that operations attempting to resolve elements can do so with
 * confidence in the element's suitability for such actions.
 *
 * The determination of an object being resolvable is based on a "soft convention" that any element
 * within the pipeline possessing a defined `Type` property is considered as potentially resolvable. This
 * convention allows for a broad interpretation of resolvability, encompassing various types of elements
 * within the pipeline, from data sources to computational units.
 *
 * @param {unknown} object - The object to inspect for resolvability. The type `unknown` is used here
 *                           to indicate that the function is designed to accept any kind of data, with
 *                           the actual type determination being performed within the function body.
 * @returns {boolean} Returns `true` if the object meets the criteria for being considered resolvable,
 *                    suggesting that it possesses the `Type` property, which is a characteristic of
 *                    elements conforming to the `IElement` interface and, by extension, possibly the
 *                    `IResolvable` interface. The return of `true` enables subsequent type-safe operations
 *                    that rely on the resolvability of the object.
 */
export function isResolvable<T, D extends number, C extends number>(object: unknown): object is IResolvable<T, D, C> {
  return isNotUndefined(object) && (object as IElement).Type !== undefined
}
