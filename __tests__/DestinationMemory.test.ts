import { ComputeMultiply } from '../src/Implementation/Compute/ComputeMultiply.js'
import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { DestinationMemory } from '../src/Implementation/Destination/DestinationMemory.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('DestinationMemory', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  it('should initialize with primitive parameters', async () => {
    const a = new DestinationMemory<number>()
    expect(a).toBeDefined()
    expect(() => a.Data).toThrow(Error)

    await a.write(1)
    await a.write(2)
    await a.write(3)
    await a.write(4)

    expect(a.toString()).toBe('{DestinationMemory(4 stored, 0 in buffer, 1 batch size) <= []=>[1,2,3,4]}')
  })

  it('should batch as specified', async () => {
    const a = new DestinationMemory<number>()
    expect(a).toBeDefined()
    expect(() => a.Data).toThrow(Error)

    a.setBatchSize(2)
    expect(a.BatchSize).toBe(2)

    await a.write(1)
    await a.write(2)
    await a.write(3)
    await a.write(4)
    await a.write(5)

    expect(a.toString()).toBe('{DestinationMemory(4 stored, 1 in buffer, 2 batch size) <= [5]=>[1,2,3,4]}')
  })

  it('should batch as specified with multiple arguments', async () => {
    const a = new DestinationMemory<number>()
    expect(a).toBeDefined()
    expect(() => a.Data).toThrow(Error)

    a.setBatchSize(2)
    expect(a.BatchSize).toBe(2)

    await a.write(1, 2, 3, 4, 5)

    expect(a.toString()).toBe('{DestinationMemory(4 stored, 1 in buffer, 2 batch size) <= [5]=>[1,2,3,4]}')
  })

  it('should batch as specified with array arguments', async () => {
    const a = new DestinationMemory<number>()
    expect(a).toBeDefined()
    expect(() => a.Data).toThrow(Error)

    a.setBatchSize(2)
    expect(a.BatchSize).toBe(2)

    await a.write([1, 2, 3, 4, 5])



    expect(a.toString()).toBe("{DestinationMemory(5 stored, 0 in buffer, 2 batch size) <= []=>[1,2,3,4,5]}")
    // @todo: This should batch properly?
    // expect(a.toString()).toBe('{DestinationMemory(4 stored, 1 in buffer, 2 batch size) <= [5]=>[1,2,3,4]}')
  })


  it('should batch as specified with multiple arguments', async () => {
    const a = new DestinationMemory<number>()
    expect(a).toBeDefined()
    expect(() => a.Data).toThrow(Error)

    a.setBatchSize(2)
    expect(a.BatchSize).toBe(2)

    await a.write(new DataNumber(1),new DataNumber(2),new DataNumber(3),new DataNumber(4),new DataNumber(5))

    expect(a.toString()).toBe("{DestinationMemory(4 stored, 1 in buffer, 2 batch size) <= [{DataNumber <= 5}]=>[1,2,3,4]}")
  })

  it('should write the result of computation immediately', async () => {
    const a = new DestinationMemory<number>()
    expect(a).toBeDefined()
    expect(() => a.Data).toThrow(Error)

    // Because we have a batch size of 1, the result is written immediately which causes execution immediately
    await a.write(new ComputeMultiply(new SourceMemory(10, 10, 10, 10)))

    expect(a.toString()).toBe('{DestinationMemory(1 stored, 0 in buffer, 1 batch size) <= []=>[10000]}')
    await a.resolve()
    expect(a.toString()).toBe('{DestinationMemory(1 stored, 0 in buffer, 1 batch size) <= []=>[10000]}')
    expect(a.Resolved).toBe(true)
  })

  it('should write the result of computation after resolve', async () => {
    const a = new DestinationMemory<number>()
    expect(a).toBeDefined()
    expect(() => a.Data).toThrow(Error)

    a.setBatchSize(5)
    expect(a.BatchSize).toBe(5)

    // Because we have a batch size of 5, the result will not be flushed until we resolve.
    await a.write(new ComputeMultiply(new SourceMemory(10, 10, 10, 10)))
    expect(a.toString()).toBe('{DestinationMemory(0 stored, 1 in buffer, 5 batch size) <= [( multiply {SourceMemory(4 elements, 0 index, 1 batch size) <= [10,10,10,10]} => unresolved )]=>[]}')
    await a.resolve()
    expect(a.toString()).toBe('{DestinationMemory(1 stored, 0 in buffer, 5 batch size) <= []=>[10000]}')
    expect(a.Resolved).toBe(true)
  })

  it('should be able to chain from a source to a destination', async () => {
    const a = new DestinationMemory<number>()
    expect(a).toBeDefined()
    expect(() => a.Data).toThrow(Error)

    a.setBatchSize(2)
    expect(a.BatchSize).toBe(2)

    // We can chain from a source to a destination but it will be on hold until we resolve because it only counts as one. 
    await a.write(new SourceMemory(10, 10, 10, 10))
    expect(a.toString()).toBe('{DestinationMemory(0 stored, 1 in buffer, 2 batch size) <= [{SourceMemory(4 elements, 0 index, 1 batch size) <= [10,10,10,10]}]=>[]}')
    await a.resolve()
    expect(a.toString()).toBe("{DestinationMemory(4 stored, 0 in buffer, 2 batch size) <= []=>[10,10,10,10]}")
    expect(a.Resolved).toBe(true)
  })

  it('should be fail with invalid parameter', async () => {
    const a = new DestinationMemory<number>()
    expect(a).toBeDefined()
    expect(() => a.Data).toThrow(Error)

    a.setBatchSize(2)
    expect(a.BatchSize).toBe(2)

    // We can chain from a source to a destination but it will be on hold until we resolve because it only counts as one. 
    expect(async () => await a.write(undefined)).rejects.toThrow(Error)
  })

  it('should be fail with invalid second parameter', async () => {
    const a = new DestinationMemory<number>()
    expect(a).toBeDefined()
    expect(() => a.Data).toThrow(Error)

    a.setBatchSize(2)
    expect(a.BatchSize).toBe(2)

    // We can chain from a source to a destination but it will be on hold until we resolve because it only counts as one. 
    expect(async () => await a.write(1, undefined)).rejects.toThrow(Error)
  })


  
})
