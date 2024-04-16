import { ComputeMultiplyV3 } from '../../src/Implementation/Compute/Multiply/ComputeMultiplyV3.js'
import { DataVariableNumber } from '../../src/Implementation/Data/Variable/DataVariableNumber.js'
import { SourceMemory } from '../../src/Implementation/Source/SourceMemory.js'

describe('ComputeMultiplyV3', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('Primitive Parameters', async () => {
    const m = new ComputeMultiplyV3([1, 2, 3])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(6)
  })

  it('Mixed Parameters 1', async () => {
    const m = new ComputeMultiplyV3([1, new DataVariableNumber(2), 3])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(6)
  })

  it('Source', async () => {
    const s = new SourceMemory<number, 3, 1>([10, 10, 10])

    const m = new ComputeMultiplyV3(s)

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(1000)
  })

  it('Source', async () => {
    const m = new ComputeMultiplyV3(new SourceMemory<number, 3, 1>([new DataVariableNumber(10), new DataVariableNumber(10), new DataVariableNumber(10)]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(1000)
  })
})
