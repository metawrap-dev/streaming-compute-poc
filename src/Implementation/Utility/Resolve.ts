import { isResolvable } from '../../Design/ElementType.js'
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
export async function resolve<T, D extends number>(wait: boolean, data: Value<T, D>): Promise<Vector<T, D>> {
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
        if (d.Resolved) {
          // Just get the pre-resolved data
          ;(data[a] as Vector<T, D>) = d.Data
        } else {
          // Resolve it from scratch
          data[a] = (await resolve<T, D>(wait, d as Value<T, D>)) as T
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
 * @param data
 * @returns
 */
export async function resolveWhole<T, D extends number, A extends number>(wait: boolean, data: Vector<Value<T, D>, A>): Promise<Vector<Vector<T, D>, A>> {
  console.log(`resolveWhole`, data)

  // Is it a vector ot scalar?
  if (Array.isArray(data)) {
    // Look at each element
    for (let a = 0; a < data.length; a++) {
      // Resolve each element of the vector
      // Note that we replace each cell in `Vector<Value<T, D>, A>` with `Value<T, D>` transforming it into a `Vector<Vector<T, D>, A>`
      data[a] = await resolve<T, D>(wait, data[a])
    }
    return data as Vector<Vector<T, D>, A>
  } else {
    // Typescript Type system breaks here and does not
    // Consider that A could be 1
    throw new Error(`resolveWhole: Scalar?`)
    // return resolve(wait, data)
  }
}
