import { isResolvable } from '../../Design/ElementType.js'
import { type Value } from '../../Design/Types/Value.js'
import { type Vector } from '../../Design/Types/Vector.js'

export async function resolve<T, D extends number>(d: Value<T, D>): Promise<Vector<T, D>> {
  if (isResolvable(d)) {
    if (d.Resolved) {
      return d.Data as Vector<T, D>
    } else {
      return (await d.resolve()) as Vector<T, D>
    }
  } else {
    return d as Vector<T, D>
  }
}
