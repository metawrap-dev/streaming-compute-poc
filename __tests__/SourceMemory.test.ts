import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('SourceMemory', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  it('should initialize with primitive parameters', async () => {
    const a = new SourceMemory<number>(1, 2, 3, 4)

    expect(a).toBeDefined()

    expect(a.Resolved).toBe(false)

    expect(a.Empty).toBe(false)

    expect(a.toString()).toBe('{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [1,2,3,4]}')

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
  })

  it('should initialize with hybrid parameters', async () => {
    const a = new SourceMemory<number>(new DataNumber(1), 2, new DataNumber(3), 4)

    expect(a).toBeDefined()

    expect(a.Resolved).toBe(false)

    expect(a.Empty).toBe(false)

    expect(a.toString()).toBe('{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [{DataNumber <= 1},2,{DataNumber <= 3},4]}')

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
  })

  it('should be able to chain sources', async () => {
    const a = new SourceMemory<number>(new SourceMemory<number>(1, 2, 3, 4))

    expect(a).toBeDefined()

    expect(a.Resolved).toBe(false)

    expect(a.Empty).toBe(false)

    expect(a.Config.BatchSize).toBe(1)

    expect(a.toString()).toBe('{SourceMemory(1 elements, atoms 4, 0 index, 1 batch size) <= [{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [1,2,3,4]}]}')

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
  })

  it('should be able to batch sources and imply type', async () => {
    const a = new SourceMemory(new SourceMemory(1, 2, 3, 4))

    a.Config.setBatchSize(2)

    expect(a.Config.BatchSize).toBe(2)

    expect(a).toBeDefined()

    expect(a.Resolved).toBe(false)

    expect(a.Empty).toBe(false)

    expect(a.toString()).toBe('{SourceMemory(1 elements, atoms 4, 0 index, 2 batch size) <= [{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [1,2,3,4]}]}')

    expect(a.Resolved).toBe(false)

    const d1 = await a.resolve()

    expect(d1).toEqual([1, 2])

    expect(a.Empty).toBe(false)

    const d2 = await a.resolve()

    expect(d2).toEqual([3, 4])

    expect(a.Empty).toBe(true)

    await expect(async () => await a.resolve()).rejects.toThrow(Error)
  })

  it('should be able to batch sources and imply type', async () => {
    const a = new SourceMemory(new SourceMemory(1, 2, 3, 4), new SourceMemory(5, 6, 7, 8), 9)

    a.Config.setBatchSize(2)

    expect(a.Config.BatchSize).toBe(2)

    expect(a).toBeDefined()

    expect(a.Resolved).toBe(false)

    expect(a.Empty).toBe(false)

    expect(a.toString()).toBe('{SourceMemory(3 elements, atoms 9, 0 index, 2 batch size) <= [{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [1,2,3,4]},{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [5,6,7,8]},9]}')

    expect(a.Resolved).toBe(false)

    const d1 = await a.resolve()

    expect(d1).toEqual([1, 2])

    expect(a.Empty).toBe(false)

    const d2 = await a.resolve()

    expect(d2).toEqual([3, 4])

    expect(a.Empty).toBe(false)

    const d3 = await a.resolve()

    expect(d3).toEqual([5, 6])

    expect(a.Empty).toBe(false)

    const d4 = await a.resolve()

    expect(d4).toEqual([7, 8])

    expect(a.Empty).toBe(false)

    // Set a timeout
    setTimeout(async () => {
      console.log(`TIMER FIRES - write 6`)

      // When this fires..
      await a.queue(10)
    }, 1000)

    const d5 = await a.resolve(true)

    expect(d5).toEqual([9, 10])

    expect(a.Empty).toBe(true)

    await expect(async () => await a.resolve()).rejects.toThrow(Error)
  })
})
