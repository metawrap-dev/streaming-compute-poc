import { type IData } from '../../Design/IData.js'
import { type ISource } from '../../Design/ISource.js'
import { type Arguments } from '../../Design/Types/Arguments.js'
import { type Value } from '../../Design/Types/Value.js'

export function describe<T, D extends number, C extends number>(value: Arguments<Value<T, D>, C> | ISource<T, D, C> | IData<T, D, C> | Value<Value<T, D>, C>): string {
  const out: string[] = []

  if (Array.isArray(value)) {
    out.push('[')
    for (const i of value) {
      if (out.length > 1) {
        out.push(',')
      }
      out.push(describe(i))
    }
    out.push(']')
  } else {
    out.push(value.toString())
  }

  return out.join('')
}
