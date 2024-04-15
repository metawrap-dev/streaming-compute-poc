import { ComputeAddV4 } from '../../src/Implementation/Compute/Add/ComputeAddV4.js'
import { DataVariableNumber } from '../../src/Implementation/Data/Variable/DataVariableNumber.js'
import { DataVariableVectorV4 } from '../../src/Implementation/Data/Variable/DataVariableVectorV4.js'
import { SourceMemory } from '../../src/Implementation/Source/SourceMemory.js'

describe('ComputeAddV4', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('Primitive Parameters', async () => {
    const m = new ComputeAddV4([1, 1, 1, 1], [1, 1, 1, 1])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual([2, 2, 2, 2])
  })

  it('Complex Parameter', async () => {
    const a = new DataVariableVectorV4([1, 1, 1, 1])

    const m = new ComputeAddV4(a, a)

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual([2, 2, 2, 2])
  })

  it('Complex Parameter', async () => {
    const a = new DataVariableVectorV4([1, 1, 1, 1])

    const b = [1, 1, 1, 1]

    const m = new ComputeAddV4(a, b)

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual([2, 2, 2, 2])
  })

  it('Complex Parameter', async () => {
    const a = new DataVariableVectorV4([1, 1, 1, 1])

    const b = [1, new DataVariableNumber(1), 1, 1]

    const m = new ComputeAddV4(a, b)

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual([2, 2, 2, 2])
  })

  it('Vector Parameter', async () => {
    const a = [1, 1, 1, 1]

    const m = new ComputeAddV4(a, a)

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual([2, 2, 2, 2])
  })

  it('Composite Add', async () => {
    const a = new DataVariableNumber(1)
    const b = new DataVariableNumber(1)
    const c = new DataVariableNumber(1)
    const d = new DataVariableNumber(1)

    const m = new ComputeAddV4(new ComputeAddV4([a, b, c, d], [a, b, c, d]), [a, b, c, d])

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual([3, 3, 3, 3])
  })

  it('Composite Add2', async () => {
    const a = new DataVariableNumber(1)
    const b = new DataVariableNumber(1)
    const c = new DataVariableNumber(1)
    const d = new DataVariableNumber(1)

    const m = new ComputeAddV4(new ComputeAddV4([a, b, c, d], [a, b, c, d]), new DataVariableVectorV4([a, b, c, d]))

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual([3, 3, 3, 3])
  })

  it('Add4 From Source', async () => {
    const a = new SourceMemory<number, 4, 1>([10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10])

    const m = new ComputeAddV4(a, a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual([20, 20, 20, 20])

    console.log(m.toString())

    console.log(m.Data.toString())
  })
})
