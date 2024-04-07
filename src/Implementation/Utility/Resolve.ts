
import { isResolvable } from '../../Design/ElementType.js'
import { type IData } from '../../Design/IData.js'
import { type IResolvable } from '../../Design/IResolvable.js'
import { type Value } from '../../Design/Types/Value.js'
import { type Cardinality, type Dimension, type Vector } from '../../Design/Types/Vector.js'


/**
 * Resolves a value into a Vector.
 * Data can be a scalar, or a vector or scalars or a vector of objects.
 * Converting a [Value] into a [Vector] is a matter of replacing its elements with unresolvable elements.
 * @warning This mutates and returns [data]
 * @param {boolean} wait
 * @param {Value<T,D>} data
 * @returns
 */
async function resolveValue<T, D extends Dimension>(wait: boolean, data: IResolvable<T, D, Cardinality.One> | Value<T, D>): Promise<Vector<T, D>> {
  // Is the value itself resolvable?
  if (isResolvable<T, D, Cardinality.One>(data)) {
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
      if (isResolvable<T, D, Cardinality.One>(d)) {
        // Replacing the cells of a `Value<T, D>` transforms it into `Vector<T, D>`        
        if (d.Resolved) {
          // So we do some coercion here, just get the pre-resolved data
          data[a] = d.Data
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

/**
 * 
 * @warning This mutates and returns [data]. Note that we replace each cell in `Vector<Value<T, D>, A>` with `Value<T, D>` transforming it into a `Vector<Vector<T, D>, A>`
 * @param data Value<T, T>[] | IData<Value<number, 1>, 0, 1> | Value<number, 0>[]
 * @returns
 */
export async function resolve<T, D extends Dimension, C extends number>(wait: boolean, data: T | IData<T, D, Cardinality.One> | IResolvable<T, D, C> | Vector<Value<T, D>, C | Cardinality.Unbounded>): Promise<Vector<Vector<T, D>, C>> {
  console.log(`resolveWhole`, data)

  // Cheap test for being a vector
  if (Array.isArray(data)) {
    // Resolve and replace each element if needed.
    for (let a = 0; a < data.length; a++) {
      data[a] = await resolveValue<T, D>(wait, data[a])
    }
  }

  // Return as Vector of Vector. All resolvable `Value` elements have been resolved.
  return data as Vector<Vector<T, D>, C>
}
