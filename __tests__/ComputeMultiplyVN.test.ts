import { ComputeMultiplyVN } from '../src/Implementation/Compute/ComputeMultiplyVN.js'
import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { DataVectorVN } from '../src/Implementation/Data/DataVectorVN.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('ComputeMultiplyN', () => {
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
    const m = new ComputeMultiplyVN([1, new DataNumber(2), 3, 4, 5])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(120)
  })

  it('Mixed Parameters 2', async () => {
    const m = new ComputeMultiplyVN(new DataVectorVN([1, 2, 3, 4, 5]))

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
    const m = new ComputeMultiplyVN(new SourceMemory([new DataNumber(10), new DataNumber(10), new DataNumber(10), new DataNumber(10)]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(10000)
  })
})
