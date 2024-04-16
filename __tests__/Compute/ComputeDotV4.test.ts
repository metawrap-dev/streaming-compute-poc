import { ComputeDotV4 } from '../../src/Implementation/Compute/ComputeDotV4.js'
import { DataVariableNumber } from '../../src/Implementation/Data/Variable/DataVariableNumber.js'
import { DataVariableVectorV4 } from '../../src/Implementation/Data/Variable/DataVariableVectorV4.js'
import { SourceMemory } from '../../src/Implementation/Source/SourceMemory.js'

describe('ComputeDotV4', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('Primitive Parameters', async () => {
    const m = new ComputeDotV4([1, 1, 1, 1], [1, 1, 1, 1])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(4)
  })

  it('Complex Parameter', async () => {
    const a = new DataVariableVectorV4([1, 1, 1, 1])

    const m = new ComputeDotV4(a, a)

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4)
  })

  it('Complex Parameter', async () => {
    const a = new DataVariableVectorV4([1, 1, 1, 1])

    const b = [1, new DataVariableNumber(1), 1, 1]

    const m = new ComputeDotV4(a, b)

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4)
  })

  it('Vector Parameter', async () => {
    const a = [1, 1, 1, 1]

    const m = new ComputeDotV4(a, a)

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4)
  })

  it('Composite Dot', async () => {
    const a = new DataVariableNumber(10)
    const b = new DataVariableNumber(10)
    const c = new DataVariableNumber(10)
    const d = new DataVariableNumber(10)

    const m = new ComputeDotV4([a, b, new ComputeDotV4([a, b, c, d], [a, b, c, d]), d], [a, b, c, d])

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4300)
  })

  it('Composite Dot2', async () => {
    const a = new DataVariableNumber(10)
    const b = new DataVariableNumber(10)
    const c = new DataVariableNumber(10)
    const d = new DataVariableNumber(10)

    const m = new ComputeDotV4([a, b, new ComputeDotV4([a, b, c, d], [a, b, c, d]), d], new DataVariableVectorV4([a, b, c, d]))

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4300)
  })

  it('Dot4 From Source', async () => {
    const a = new SourceMemory<number, 4, 1>([10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10])

    const m = new ComputeDotV4(a, a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(400)
  })
})
