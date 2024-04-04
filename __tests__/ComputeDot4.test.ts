import { ComputeDot4 } from '../src/Implementation/Compute/ComputeDot4.js'

describe('ComputeDot4', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  it('One Primitive Parameter', async () => {
    const m = new ComputeDot4([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ])

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual([4])
  })

  /*
  it('One Parameter', async () => {
    const a = new DataNumber(1)

    const m = new ComputeDot4([[a], [a]])

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(10)
  })
  */

  /*
  it('Two Mixed Parameters', async () => {
    const a = new DataNumber(10)

    const m = new ComputeDot4(a, 10)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(100)
  })

  it('Composite Multiplication', async () => {
    const a = new DataNumber(10)
    const b = new DataNumber(10)
    const c = new DataNumber(10)
    const d = new DataNumber(10)

    const m = new ComputeDot4(a, b, new ComputeDot4(c, d))

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(10000)
  })

  it('Dot4 From Source', async () => {
    const a = new SourceMemory(10, 10, 10, 10)

    const m = new ComputeDot4(a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(10000)
  })
  */

  it('should be fail with bad inputs', async () => {
    expect(() => new (ComputeDot4 as any)()).toThrow(Error)
  })
})
