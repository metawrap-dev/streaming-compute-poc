import { ComputeMultiply } from "../src/Implementation/Compute/ComputeMultiply.js"
import { DataNumber } from "../src/Implementation/Data/DataNumber.js"
import { SourceMemory } from "../src/Implementation/Source/SourceMemory.js"


describe('ComputeMultiply', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  // eslint-disable-next-line jest/no-focused-tests
  it('One Primitive Parameter', async () => {
        
    const m = new ComputeMultiply(10)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(10)
  
  })


  // eslint-disable-next-line jest/no-focused-tests
  it('One Parameter', async () => {
    
    const a = new DataNumber(10)

    const m = new ComputeMultiply(a)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(10)
  
  })

  // eslint-disable-next-line jest/no-focused-tests
  it('Two Mixed Parameters', async () => {
    
    const a = new DataNumber(10)

    const m = new ComputeMultiply(a, 10)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(100)
  
  })



  it('Composite multiplication', async () => {
    
    const a = new DataNumber(10)
    const b = new DataNumber(10)
    const c = new DataNumber(10)
    const d = new DataNumber(10)

    const m = new ComputeMultiply(a, b, new ComputeMultiply(c, d))    

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(10000)
  
  })

  it('Multiply from datasource', async () => {
    
    const a = new SourceMemory(10,10,10,10)

    const m = new ComputeMultiply(a)    

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())

    expect(m.Data).toBe(10000)
  
  })
})
