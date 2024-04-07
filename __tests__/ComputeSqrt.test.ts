import { ComputeSqrt } from '../src/Implementation/Compute/ComputeSqrt.js'
import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('ComputeSqrt', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('Primitive Parameters', async () => {
    const m = new ComputeSqrt(2)

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(Math.SQRT2)
  })

  it('Mixed Parameters 1', async () => {
    const m = new ComputeSqrt(new DataNumber(2))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(Math.SQRT2)
  })

  it('Source', async () => {
    const m = new ComputeSqrt(new SourceMemory<number, 1, 1>(10, 10, 10, 10))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(Math.sqrt(10))
  })

  it('Source', async () => {
    const m = new ComputeSqrt(new ComputeSqrt(new SourceMemory<number, 1, 1>(10, 10, 10, 10)))

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(Math.sqrt(Math.sqrt(10)))
  })
})
