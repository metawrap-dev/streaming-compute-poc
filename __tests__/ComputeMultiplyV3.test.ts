import { ComputeMultiplyV3 } from '../src/Implementation/Compute/ComputeMultiplyV3.js'
import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('ComputeMultiply3', () => {
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
    const m = new ComputeMultiplyV3([1, new DataNumber(2), 3])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(6)
  })

  /*
  it('Mixed Parameters 2', async () => {
    const m = new ComputeMultiply3(new DataVectorHN([1, 2, 3]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(24)
  })
  */

  it('Source', async () => {
    const m = new ComputeMultiplyV3(new SourceMemory([10, 10, 10]))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(1000)
  })

  /*
  it('Source', async () => {
    const m = new ComputeMultiply3(new SourceMemory([new DataNumber(10), new DataNumber(10), new DataNumber(10)))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(10000)
  })
  */
})
