import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('SourceMemory', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  // eslint-disable-next-line jest/expect-expect
  it('should initialize with primitive parameters', async () => {
    const a = new SourceMemory(1, 2, 3, 4)

    expect(() => a.Data).toThrow(Error)

    expect(a).toBeDefined()

    expect(a.Resolved).toBe(false)

    expect(a.Empty).toBe(false)

    expect(a.toString()).toBe('{SourceMemory(4 elements, 0 index, 1 batch size) <= [1,2,3,4]}')

    expect(a.Resolved).toBe(false)

    const d1 = await a.resolve()

    expect(d1).toEqual([1]) 

    expect(a.Empty).toBe(false)

    const d2 = await a.resolve()

    expect(d2).toEqual([2]) 

    expect(a.Empty).toBe(false)

    const d3 = await a.resolve()

    expect(d3).toEqual([3]) 

    expect(a.Empty).toBe(false)

    const d4 = await a.resolve()

    expect(d4).toEqual([4]) 

    expect(a.Empty).toBe(true)

    expect(a.Resolved).toBe(true)

    await expect(async () => await a.resolve()).rejects.toThrow(Error)

    expect(() => a.Data).not.toThrow(Error)

  })


  // eslint-disable-next-line jest/expect-expect, jest/no-focused-tests
  it('should initialize with hybrid parameters', async () => {
    const a = new SourceMemory(new DataNumber(1), 2, new DataNumber(3), 4)

    expect(() => a.Data).toThrow(Error)

    expect(a).toBeDefined()

    expect(a.Resolved).toBe(false)

    expect(a.Empty).toBe(false)

    expect(a.toString()).toBe('{SourceMemory(4 elements, 0 index, 1 batch size) <= [{DataNumber <= 1},2,{DataNumber <= 3},4]}')

    expect(a.Resolved).toBe(false)

    const d1 = await a.resolve()

    expect(d1).toEqual([1]) 

    expect(a.Empty).toBe(false)

    const d2 = await a.resolve()

    expect(d2).toEqual([2]) 

    expect(a.Empty).toBe(false)

    const d3 = await a.resolve()

    expect(d3).toEqual([3]) 

    expect(a.Empty).toBe(false)

    const d4 = await a.resolve()

    expect(d4).toEqual([4]) 

    expect(a.Empty).toBe(true)

    expect(a.Resolved).toBe(true)

    await expect(async () => await a.resolve()).rejects.toThrow(Error)

    expect(() => a.Data).not.toThrow(Error)

  })


   // eslint-disable-next-line jest/expect-expect, jest/no-focused-tests, jest/no-disabled-tests
   it.skip('should initialize with a source a parameter', async () => {
    const a = new SourceMemory(new SourceMemory(1,2,3,4))

    expect(() => a.Data).toThrow(Error)

    expect(a).toBeDefined()

    expect(a.Resolved).toBe(false)

    expect(a.Empty).toBe(false)

    expect(a.toString()).toBe('{SourceMemory(4 elements, 0 index, 1 batch size) <= [{DataNumber <= 1},2,{DataNumber <= 3},4]}')

    expect(a.Resolved).toBe(false)

    const d1 = await a.resolve()

    expect(d1).toEqual([1]) 

    expect(a.Empty).toBe(false)

    const d2 = await a.resolve()

    expect(d2).toEqual([2]) 

    expect(a.Empty).toBe(false)

    const d3 = await a.resolve()

    expect(d3).toEqual([3]) 

    expect(a.Empty).toBe(false)

    const d4 = await a.resolve()

    expect(d4).toEqual([4]) 

    expect(a.Empty).toBe(true)

    expect(a.Resolved).toBe(true)

    await expect(async () => await a.resolve()).rejects.toThrow(Error)

    expect(() => a.Data).not.toThrow(Error)

  })
  
  
})
