import { ComputeMultiplyVN } from '../src/Implementation/Compute/ComputeMultiplyVN.js'
import { DataVariableNumber } from '../src/Implementation/Data/DataVariableNumber.js'
import { DataVariableVectorVN } from '../src/Implementation/Data/DataVariableVectorVN.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('ComputeMultiplyVN', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('Primitive Parameters', async () => {
    const m = new ComputeMultiplyVN([1, 2, 3, 4, 5])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(120)
  })

  it('Mixed Parameters 1', async () => {
    const m = new ComputeMultiplyVN([1, new DataVariableNumber(2), 3, 4, 5])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(120)
  })

  it('Mixed Parameters 2', async () => {
    const m = new ComputeMultiplyVN(new DataVariableVectorVN([1, 2, 3, 4, 5]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(120)
  })

  it('Source', async () => {
    const m = new ComputeMultiplyVN(new SourceMemory([10, 10, 10, 10]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(10000)
  })

  it('Source', async () => {
    const m = new ComputeMultiplyVN(new SourceMemory([new DataVariableNumber(10), new DataVariableNumber(10), new DataVariableNumber(10), new DataVariableNumber(10)]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(10000)
  })
})
