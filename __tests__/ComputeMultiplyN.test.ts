import { ComputeMultiplyN } from '../src/Implementation/Compute/ComputeMultiplyN.js'
import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { DataVectorN } from '../src/Implementation/Data/DataVectorN.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('ComputeMultiplyN', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  it('Primitive Parameters', async () => {
    const m = new ComputeMultiplyN([1, 2, 3, 4, 5])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(120)
  })

  it('Mixed Parameters', async () => {
    const m = new ComputeMultiplyN([1, new DataNumber(2), 3, 4, 5])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(120)
  })

  it('Mixed Parameters', async () => {
    const m = new ComputeMultiplyN(new DataVectorN([1, 2, 3, 4, 5]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(120)
  })

  it('Mixed Parameters', async () => {
    const m = new ComputeMultiplyN(new SourceMemory([10, 10, 10, 10]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(10000)
  })
})
