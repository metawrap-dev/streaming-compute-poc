import { ComputeMultiplyVN } from '../../src/Implementation/Compute/Multiply/ComputeMultiplyVN.js'
import { DataVariableNumber } from '../../src/Implementation/Data/Variable/DataVariableNumber.js'
import { DestinationMemory } from '../../src/Implementation/Destination/DestinationMemory.js'
import { SourceMemory } from '../../src/Implementation/Source/SourceMemory.js'

describe('DestinationMemory', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('should initialize with no primitive parameters', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    expect(a.toString()).toBe('{DestinationMemory(0 stored, 0 in buffer, 1 batch size) <= []=>[]}')
    await a.resolve()
    expect(a.toString()).toBe('{DestinationMemory(0 stored, 0 in buffer, 1 batch size) <= []=>[]}')
  })

  it('should initialize with primitive parameters', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    await a.write(1)
    await a.write(2)
    await a.write(3)
    await a.write(4)

    expect(a.toString()).toBe('{DestinationMemory(4 stored, 0 in buffer, 1 batch size) <= []=>[1,2,3,4]}')
    await a.resolve()
    expect(a.toString()).toBe('{DestinationMemory(4 stored, 0 in buffer, 1 batch size) <= []=>[1,2,3,4]}')
  })

  it('should batch as specified', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    a.Config.setBatchSize(2)
    expect(a.Config.BatchSize).toBe(2)

    await a.write(1)

    // Chunk is not written out of buffer to storage yet.
    expect(a.toString()).toBe('{DestinationMemory(0 stored, 1 in buffer, 2 batch size) <= [1]=>[]}')

    await a.write(2)

    // Chunk of two numbers is written out of buffer to storage.
    expect(a.toString()).toBe('{DestinationMemory(2 stored, 0 in buffer, 2 batch size) <= []=>[1,2]}')

    await a.write(3)

    // Chunk is not written out of buffer to storage yet.
    expect(a.toString()).toBe('{DestinationMemory(2 stored, 1 in buffer, 2 batch size) <= [3]=>[1,2]}')

    await a.write(4)

    // Chunk or two numbers is written out of buffer to storage yet.
    expect(a.toString()).toBe('{DestinationMemory(4 stored, 0 in buffer, 2 batch size) <= []=>[1,2,3,4]}')

    await a.write(5)

    // We have a pending byte in the buffer.
    expect(a.toString()).toBe('{DestinationMemory(4 stored, 1 in buffer, 2 batch size) <= [5]=>[1,2,3,4]}')

    // Set a timeout
    setTimeout(async () => {
      console.log(`TIMER FIRES - write 6`)

      // When this fires..
      await a.write(6)
    }, 1000)

    console.log(`Resolve`)

    // Resolve should wait.
    await a.resolve(true)

    // 0..1000ms We are waiting...

    // tick tick tick

    // ...1000ms: We have a pending byte in the buffer.
    // The [DestinationMemory] releases the wait on the resolve above.

    console.log(`Resolved`)

    // This was enough to flush out a new block
    expect(a.toString()).toBe('{DestinationMemory(6 stored, 0 in buffer, 2 batch size) <= []=>[1,2,3,4,5,6]}')
  })

  it('should batch as specified', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    a.Config.setBatchSize(2)
    expect(a.Config.BatchSize).toBe(2)

    await a.write(1)

    // Chunk is not written out of buffer to storage yet.
    expect(a.toString()).toBe('{DestinationMemory(0 stored, 1 in buffer, 2 batch size) <= [1]=>[]}')

    await a.write(2)

    // Chunk of two numbers is written out of buffer to storage.
    expect(a.toString()).toBe('{DestinationMemory(2 stored, 0 in buffer, 2 batch size) <= []=>[1,2]}')

    await a.write(3)

    // Chunk is not written out of buffer to storage yet.
    expect(a.toString()).toBe('{DestinationMemory(2 stored, 1 in buffer, 2 batch size) <= [3]=>[1,2]}')

    await a.write(4)

    // Chunk or two numbers is written out of buffer to storage yet.
    expect(a.toString()).toBe('{DestinationMemory(4 stored, 0 in buffer, 2 batch size) <= []=>[1,2,3,4]}')

    await a.write(5)

    // We have a pending byte in the buffer.
    expect(a.toString()).toBe('{DestinationMemory(4 stored, 1 in buffer, 2 batch size) <= [5]=>[1,2,3,4]}')

    console.log(`Resolved`)

    // Resolve should *not* wait.
    await a.resolve(false)

    console.log(`Resolved`)

    // This was enough to flush out a new block
    expect(a.toString()).toBe('{DestinationMemory(5 stored, 0 in buffer, 2 batch size) <= []=>[1,2,3,4,5]}')
  })

  it('should batch as specified with multiple arguments', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    a.Config.setBatchSize(2)
    expect(a.Config.BatchSize).toBe(2)

    await a.write(1, 2, 3, 4, 5)

    expect(a.toString()).toBe('{DestinationMemory(4 stored, 1 in buffer, 2 batch size) <= [5]=>[1,2,3,4]}')
  })

  it('should batch as specified with array arguments', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    a.Config.setBatchSize(2)
    expect(a.Config.BatchSize).toBe(2)

    await a.write(1, 2, 3, 4, 5)

    expect(a.toString()).toBe('{DestinationMemory(4 stored, 1 in buffer, 2 batch size) <= [5]=>[1,2,3,4]}')
  })

  it('should batch as specified with multiple arguments', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    a.Config.setBatchSize(2)
    expect(a.Config.BatchSize).toBe(2)

    await a.write(new DataVariableNumber(1), new DataVariableNumber(2), new DataVariableNumber(3), new DataVariableNumber(4), new DataVariableNumber(5))

    expect(a.toString()).toBe('{DestinationMemory(4 stored, 1 in buffer, 2 batch size) <= [{DataVariableNumber <= 5}]=>[1,2,3,4]}')
  })

  it('should write the result of computation immediately', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    const b = new ComputeMultiplyVN(new SourceMemory<number, 0, 1>([10, 10, 10, 10]))

    expect(b.toString()).toBe('{ComputeMultiplyVN[{SourceMemory(1 elements, atoms 1, 0 index, 1 batch size) <= [[10,10,10,10]]}]=>unresolved}')

    // Because we have a batch size of 1, the result is written immediately which causes execution immediately
    await a.write(b)

    expect(a.toString()).toBe('{DestinationMemory(1 stored, 0 in buffer, 1 batch size) <= []=>[10000]}')
    await a.resolve()
    expect(a.toString()).toBe('{DestinationMemory(1 stored, 0 in buffer, 1 batch size) <= []=>[10000]}')
    expect(a.Resolved).toBe(true)
  })

  it('should write the result of computation after resolve', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    a.Config.setBatchSize(5)
    expect(a.Config.BatchSize).toBe(5)

    // Because we have a batch size of 5, the result will not be flushed until we resolve.
    await a.write(new ComputeMultiplyVN(new SourceMemory<number, 0, 1>([10, 10, 10, 10])))
    expect(a.toString()).toBe('{DestinationMemory(0 stored, 1 in buffer, 5 batch size) <= [{ComputeMultiplyVN[{SourceMemory(1 elements, atoms 1, 0 index, 1 batch size) <= [[10,10,10,10]]}]=>unresolved}]=>[]}')
    await a.resolve()
    expect(a.toString()).toBe('{DestinationMemory(1 stored, 0 in buffer, 5 batch size) <= []=>[10000]}')
    expect(a.Resolved).toBe(true)
  })

  it('should be able to chain from a source to a destination', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    a.Config.setBatchSize(2)
    expect(a.Config.BatchSize).toBe(2)

    // We can chain from a source to a destination but it will be on hold until we resolve because it only counts as one.
    await a.write(new SourceMemory<number, 1, 1>(10, 10, 10, 10))
    expect(a.toString()).toBe('{DestinationMemory(0 stored, 1 in buffer, 2 batch size) <= [{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [10,10,10,10]}]=>[]}')
    await a.resolve()
    expect(a.toString()).toBe('{DestinationMemory(4 stored, 0 in buffer, 2 batch size) <= []=>[10,10,10,10]}')
    expect(a.Resolved).toBe(true)
  })

  it.skip('should be fail with invalid parameter', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    a.Config.setBatchSize(2)
    expect(a.Config.BatchSize).toBe(2)

    // We can chain from a source to a destination but it will be on hold until we resolve because it only counts as one.
    expect(async () => await a.write(undefined as any)).rejects.toThrow(Error)
  })

  it.skip('should be fail with invalid second parameter', async () => {
    const a = new DestinationMemory<number, 1, 1>()
    expect(a).toBeDefined()

    a.Config.setBatchSize(2)
    expect(a.Config.BatchSize).toBe(2)

    // We can chain from a source to a destination but it will be on hold until we resolve because it only counts as one.
    expect(async () => await a.write(1, undefined as any)).rejects.toThrow(Error)
  })
})
