import { ComputeMultiplyV4 } from '../src/Implementation/Compute/ComputeMultiplyV4.js'
import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { DataVectorVN } from '../src/Implementation/Data/DataVectorVN.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('ComputeMultiply4', () => {
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
    const m = new ComputeMultiplyV4([1, new DataNumber(2), 3, 4])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(24)
  })

  it('Mixed Parameters 2', async () => {
    const m = new ComputeMultiplyV4(new DataVectorVN([1, 2, 3, 4]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(24)
  })

  it('Source', async () => {
    const m = new ComputeMultiplyV4(new SourceMemory([10, 10, 10, 10]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(10000)
  })

  it('Source', async () => {
    const m = new ComputeMultiplyV4(new SourceMemory([new DataNumber(10), new DataNumber(10), new DataNumber(10), new DataNumber(10)]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(10000)
  })
})
