import { isResolvable } from '../../Design/ElementType.js'
import { type IData } from '../../Design/IData.js'
import { type IResolvable } from '../../Design/IResolvable.js'
import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'

/**
 * Resolves a value into a Vector.
 * Data can be a scalar, or a vector or scalars or a vector of objects.
 * Converting a [Value] into a [Vector] is a matter of replacing its elements with unresolvable elements.
 * @warning This mutates and returns [data]
 * @param {boolean} wait
 * @param {Value<T,D>} data
 * @returns
 */
async function resolveValue<T, D extends number>(wait: boolean, data: Value<T, D>): Promise<Vector<T, D>> {
  // Is the value itself resolvable?
  if (isResolvable<T, D, 1>(data)) {
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
        // Replacing the cells of a Value<T, D> transforms it into Vector<T, D>
        // No way to formally express this in Typescript...
        if (d.Resolved) {
          // So we do some coercion here, just get the pre-resolved data
          ;(data[a] as Vector<T, D>) = d.Data
        } else {
          // Resolve it from scratch
          data[a] = (await resolveValue<T, D>(wait, d as Value<T, D>)) as T
        }
      }
    }
    // It must be a vector if it is an array.
    return data as Vector<T, D>
  } else {
    // It must be a simple vector if it is this simple.
    return data as Vector<T, D>
  }
}

/**
 * @warning This mutates and returns [data]
 * @param data Value<T, T>[] | IData<Value<number, 1>, 0, 1> | Value<number, 0>[]
 * @returns
 */
export async function resolve<T, D extends number, A extends number>(wait: boolean, data: T | IData<T, D, 1> | IResolvable<T, D, A> | Vector<Value<T, D>, A | 0>): Promise<Vector<Vector<T, D>, A>> {
  console.log(`resolveWhole`, data)

  // Cheap test for being a vector
  if (Array.isArray(data)) {
    // Look at each element
    for (let a = 0; a < data.length; a++) {
      // Resolve each element of the vector
      // Note that we replace each cell in `Vector<Value<T, D>, A>` with `Value<T, D>` transforming it into a `Vector<Vector<T, D>, A>`
      data[a] = await resolveValue<T, D>(wait, data[a])
    }
  }

  // Return
  return data as Vector<Vector<T, D>, A>
}
