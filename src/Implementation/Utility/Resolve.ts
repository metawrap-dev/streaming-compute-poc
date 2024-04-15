import { type IData } from '../../Design/IData.js'
import { type IResolvable } from '../../Design/IResolvable.js'
import { type Argument } from '../../Design/Types/Arguments.js'
import { isResolvable, isSource } from '../../Design/Types/ElementType.js'
import { type Input } from '../../Design/Types/Input.js'
import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'

/**
 * Attempts to resolve a single value to a vector, handling both scalar and vector data types. If the data is already
 * resolved, it returns the existing data. Otherwise, it actively resolves the data, potentially waiting for
 * asynchronous processes to complete if `wait` is true.
 *
 * @warning Mutates and returns the provided data `data`.
 * @param {boolean} wait - If true, the resolution process may wait for additional data to fulfill batch sizes.
 * @param {Value<T, D> | IResolvable<T, D, 1>} data - The data to be resolved, which can be a scalar, vector of scalars, or vector of objects.
 * @returns {Promise<Vector<T, D>>} A promise that resolves to a vector of the specified type and dimension.
 */
export async function resolveValue<T, D extends number>(wait: boolean, data: Input<T, 0, 1> | Input<T, 1, 0> | Argument<T, D> | IResolvable<T, D, 1> | Value<T, D>): Promise<Vector<T, D>> {
  // Is the value itself resolvable?

  if (isSource<T, D, 1>(data)) {
    // ...if we are not waiting and there is no data then return with the null answer?
    if (!wait && data.Empty) return undefined

    // We want to clock out results one at a time.
    data.Config.setBatchSize(1)

    // Dereference the first item to clock out of the source
    return (await data.resolve(wait))[0]

    // Add and set
  } else if (isResolvable<T, D, 1>(data)) {
    // If it is resolvable..
    if (data.Resolved) {
      // .. but already resolved, we just get the data.
      return data.Data
    } else {
      // We resolve it from scratch
      return await data.resolve(wait)
    }
  } else if (Array.isArray(data)) {
    for (let a = 0; a < data.length; a++) {
      const d = data[a]
      // if it is resolvable..
      if (isResolvable<T, D, 1>(d)) {
        // Replacing the cells of a `Value<T, D>` transforms it into `Vector<T, D>`
        if (d.Resolved) {
          // So we do some coercion here, just get the pre-resolved data
          ;(data[a] as Vector<T, D>) = d.Data
        } else {
          // Resolve it from scratch.
          data[a] = (await resolveValue<T, D>(wait, d)) as T
        }
      }
    }
  }

  // Return data as Vector<T, D> as it was originally, or we transformed it mechanically above.
  return data as Vector<T, D>
}

/*
// data: T | ISource<T, D, 1> | IData<T, D, 1> | IResolvable<T, D, C> | Vector<Value<T, D>, C | 0>
export async function resolve<T, D extends number, C extends number>(wait: boolean, data: ISource<T, D, C> | Vector<Value<T, D>, C> | IData<T, D, C>): Promise<Vector<Vector<T, D>, C>> {
*/

/**
 * Resolves a collection of data elements or a single resolvable entity into a structured vector form. It processes
 * arrays by resolving each contained value, and directly resolves singular resolvable entities. The function is designed
 * to handle various input structures, ensuring they are all brought to a fully resolved state.
 *
 * @warning This function mutates the provided data `data`, especially when dealing with arrays.
 * @param {boolean} wait - Indicates if the resolution should pause for batch completions.
 * @param {T | IData<T, D, 1> | IResolvable<T, D, C> | Vector<Value<T, D>, C | 0>} data - The data to resolve, accommodating a range of input structures.
 * @returns {Promise<Vector<Vector<T, D>, C>>} - A promise that resolves to a vector of vectors, following the specified types and dimensions.
 */
export async function resolve<T, D extends number, C extends number>(wait: boolean, data: T | IData<T, D, 1> | IResolvable<T, D, C> | Vector<Value<T, D>, C | 0>): Promise<Vector<Vector<T, D>, C>> {
  // Cheap test for being a vector
  if (Array.isArray(data)) {
    // Resolve and replace each element if needed.
    for (let a = 0; a < data.length; a++) {
      data[a] = await resolveValue<T, D>(wait, data[a])
    }
  } else if (isResolvable<T, D, C>(data)) {
    return await data.resolve(wait)
  }

  // Return as Vector of Vector. All resolvable `Value` elements have been resolved.
  return data as Vector<Vector<T, D>, C>
}
