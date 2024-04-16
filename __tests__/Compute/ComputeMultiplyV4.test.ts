import { ComputeMultiplyV4 } from '../../src/Implementation/Compute/Multiply/ComputeMultiplyV4.js'
import { DataVariableVectorVN } from '../../src/Implementation/Data/DataVariableVectorVN.js'
import { DataVariableNumber } from '../../src/Implementation/Data/Variable/DataVariableNumber.js'
import { DataVariableVectorV4 } from '../../src/Implementation/Data/Variable/DataVariableVectorV4.js'
import { SourceMemory } from '../../src/Implementation/Source/SourceMemory.js'

describe('ComputeMultiplyV4', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('Primitive Parameters', async () => {
    const m = new ComputeMultiplyV4([1, 2, 3, 4])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(24)
  })

  it('Mixed Parameters 1', async () => {
    const m = new ComputeMultiplyV4([1, new DataVariableNumber(2), 3, 4])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(24)
  })

  it('Mixed Parameters 2', async () => {
    const m = new ComputeMultiplyV4(new DataVariableVectorVN([1, 2, 3, 4]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(24)
  })

  it('Mixed Parameters 2', async () => {
    const m = new ComputeMultiplyV4(new DataVariableVectorV4([1, 2, 3, 4]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(24)
  })

  it('Source', async () => {
    const m = new ComputeMultiplyV4(new SourceMemory<number, 4, 1>([10, 10, 10, 10]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(10000)
  })

  it('Source', async () => {
    const m = new ComputeMultiplyV4(new SourceMemory<number, 4, 1>([new DataVariableNumber(10), new DataVariableNumber(10), new DataVariableNumber(10), new DataVariableNumber(10)]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(10000)
  })
})
