import { ComputeDotV4 } from '../src/Implementation/Compute/ComputeDotV4.js'
import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { DataVectorV4 } from '../src/Implementation/Data/DataVectorV4.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('ComputeDot4', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('Primitive Parameters', async () => {
    const m = new ComputeDotV4([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(4)
  })

  it('Complex Parameter', async () => {
    const a = new DataVectorV4([1, 1, 1, 1])

    const m = new ComputeDotV4([a, a])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4)
  })

  it('Complex Parameter', async () => {
    const a = new DataVectorV4([1, 1, 1, 1])

    const b = [1, new DataNumber(1), 1, 1]

    const m = new ComputeDotV4([a, b])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4)
  })

  it('Vector Parameter', async () => {
    const a = [1, 1, 1, 1]

    const m = new ComputeDotV4([a, a])

    expect(m).toBeDefined()

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4)
  })

  it('Composite Dot', async () => {
    const a = new DataNumber(10)
    const b = new DataNumber(10)
    const c = new DataNumber(10)
    const d = new DataNumber(10)

    const m = new ComputeDotV4([
      [
        a,
        b,
        new ComputeDotV4([
          [a, b, c, d],
          [a, b, c, d],
        ]),
        d,
      ],
      [a, b, c, d],
    ])

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4300)
  })

  it.skip('Composite Dot2', async () => {
    const a = new DataNumber(10)
    const b = new DataNumber(10)
    const c = new DataNumber(10)
    const d = new DataNumber(10)

    const m = new ComputeDotV4([
      [
        a,
        b,
        new ComputeDotV4([
          [a, b, c, d],
          [a, b, c, d],
        ]),
        d,
      ],
      new DataVectorV4([a, b, c, d]),
    ])

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4300)
  })

  it('Dot4 From Source', async () => {
    const a = new SourceMemory<number, 4, 2>(
      [
        [10, 10, 10, 10],
        [10, 10, 10, 10],
      ],
      [
        [10, 10, 10, 10],
        [10, 10, 10, 10],
      ],
    )

    const m = new ComputeDotV4(a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(400)
  })

  /*
  it('Streamer', async () => {
    type v4 = Vector<number, 4> | DataVectorN | (number | IData<number>)[]

    const source = new SourceMemory<[v4, v4]>(
      [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ],
      [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ],
    )

    const compute = new ComputeDot4()

    const streamer = new Streamer2<v4, v4, number>(source, compute)

    console.log(streamer.toString())

    const answer = await streamer.resolve()

    console.log(streamer.toString())

    expect(answer).toBe(2)
  })
  */

  /*
  it('should be fail with bad inputs', async () => {
    expect(() => new (ComputeDot4 as any)()).toThrow(Error)
  })
  */
})
