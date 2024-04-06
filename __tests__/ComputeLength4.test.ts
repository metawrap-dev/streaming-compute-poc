import { Vector } from '../src/Design/Types/Vector.js'
import { ComputeLength4 } from '../src/Implementation/Compute/ComputeLength4.js'
import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { DataVector4 } from '../src/Implementation/Data/DataVector4.js'

describe('ComputeLength4', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  it('Primitive Parameters', async () => {
    const m = new ComputeLength4([1, 1, 1, 1])

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toEqual(2)
  })

  it('Complex Parameter', async () => {
    const a = new DataVector4([1, 1, 1, 1])

    const m = new ComputeLength4(a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(2)
  })

  it('Vector Parameter', async () => {
    const a = [1, 1, 1, 1] as Vector<number, 4>

    const m = new ComputeLength4(a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(2)
  })

  /*
  it('Streamer', async () => {
    type v4 = Vector<number, 4>

    const source = new SourceMemory<v4>([1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1])

    const compute = new ComputeLength4<v4>()

    const streamer = new Streamer<v4, number>(source, compute)

    console.log(streamer.toString())

    await streamer.resolve()

    console.log(streamer.toString())
  })

  it('Streamer Compact', async () => {
    type v4 = Vector<number, 4>

    const streamer = new Streamer<v4, number>(new SourceMemory([1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]), new ComputeLength4())

    console.log(streamer.toString())

    await streamer.resolve()

    console.log(streamer.toString())
  })

  it('Streamer Mixed', async () => {
    type v4 = Vector<number, 4> | DataVectorN

    const source = new SourceMemory<v4>([1, 1, 1, 1], new DataVectorN([1, 1, 1, 1]), [1, 1, 1, 1], [1, 1, 1, 1])

    const compute = new ComputeLength4<v4>()

    const streamer = new Streamer<v4, number>(source, compute)

    console.log(streamer.toString())

    await streamer.resolve()

    console.log(streamer.toString())
  })

  it('Streamer Very Mixed', async () => {
    type v4 = Vector<number, 4> | DataVectorN | (number | IData<number>)[]

    const source = new SourceMemory([1, 1, 1, 1], new DataVectorN([1, 1, 1, 1]), [1, new DataNumber(1), 1, 1], [1, 1, 1, 1])

    const compute = new ComputeLength4()

    const streamer = new Streamer<v4, number>(source, compute)

    console.log(streamer.toString())

    await streamer.resolve()

    console.log(streamer.toString())
  })
  */

  it.only('Composite Length', async () => {
    const a = new DataNumber(10)
    const b = new DataNumber(10)
    const c = new DataNumber(10)
    const d = new DataNumber(10)

    const m = new ComputeLength4([a, b, c, d])

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(20)
  })

  /*
  it('Length4 From Source', async () => {
    const a = new SourceMemory(10, 10, 10, 10)

    const m = new ComputeLength4(a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(10000)
  })
  */

  /*
  it('should be fail with bad inputs', async () => {
    expect(() => new (ComputeLength4 as any)()).toThrow(Error)
  })
  */
})
