import { Vector } from '../../src/Design/Types/Vector.js'
import { ComputeLengthV4 } from '../../src/Implementation/Compute/Length/ComputeLengthV4.js'
import { DataVariableNumber } from '../../src/Implementation/Data/Variable/DataVariableNumber.js'
import { DataVariableVectorV4 } from '../../src/Implementation/Data/Variable/DataVariableVectorV4.js'
import { SourceMemory } from '../../src/Implementation/Source/SourceMemory.js'

describe('ComputeLengthV4', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('Primitive Parameters', async () => {
    const m = new ComputeLengthV4([1, 1, 1, 1])

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(2)
  })

  it('Complex Parameter', async () => {
    const a = new DataVariableVectorV4([1, 1, 1, 1])

    const m = new ComputeLengthV4(a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(2)
  })

  it('Vector Parameter', async () => {
    const a = [1, 1, 1, 1] as Vector<number, 4>

    const m = new ComputeLengthV4(a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(2)
  })

  it('Composite Length', async () => {
    const a = new DataVariableNumber(10)
    const b = new DataVariableNumber(10)
    const c = new DataVariableNumber(10)
    const d = new DataVariableNumber(10)

    const m = new ComputeLengthV4([a, b, c, d])

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(20)
  })

  it('Length4 From Source', async () => {
    const a = new SourceMemory<number, 4, 1>([10, 10, 10, 10])

    const m = new ComputeLengthV4(a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(20)
  })
})
