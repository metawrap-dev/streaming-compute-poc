import { ComputeLength4 } from '../src/Implementation/Compute/ComputeLength4.js'
import { DataVectorN } from '../src/Implementation/Data/DataVectorN.js'
import { Vector } from '../src/Implementation/Utility/Vector.js'

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
    const a = new DataVectorN([1, 1, 1, 1])

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

    const source = new SourceMemory<v4>([1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1])

    const compute = new ComputeLength4(undefined as any, undefined as any)

    const streamer = new Streamer<v4,number>(source,compute)

    

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(4)
  })
  */
  


  /*
  it('Two Mixed Parameters', async () => {
    const a = new DataNumber(10)

    const m = new ComputeLength4(a, 10)

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

    const m = new ComputeLength4(a, b, new ComputeLength4(c, d))

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(10000)
  })

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

  it('should be fail with bad inputs', async () => {
    expect(() => new (ComputeLength4 as any)()).toThrow(Error)
  })
})
