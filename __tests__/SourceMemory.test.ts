import { ComputeMultiplyN } from '../src/Implementation/Compute/ComputeMultiplyN.js'
import { DataNumber } from '../src/Implementation/Data/DataNumber.js'
import { DataVectorV } from '../src/Implementation/Data/DataVectorV.js'
import { SourceMemory } from '../src/Implementation/Source/SourceMemory.js'

describe('SourceMemory', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('should initialize with primitive parameters', async () => {
    // A source of an array of number
    const a = new SourceMemory<number, 1, 1>(1, 2, 3, 4)

    expect(a).toBeDefined()

    console.log(a.toString())

    expect(a.Empty).toBe(false)

    expect(a.Count).toBe(4)

    expect(a.toString()).toBe('{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [1,2,3,4]}')

    for (let i = 1; i <= 4; i++) {
      const d = await a.resolve()
      expect(d).toEqual([i])
      expect(a.Empty).toBe(i == 4)
    }
  })

  it('should initialize with primitive parameters', async () => {
    // A source of an array of number
    const a = new SourceMemory<number, 1, 0>([1, 2, 3, 4])

    expect(a).toBeDefined()

    console.log(a.toString())

    expect(a.Empty).toBe(false)

    expect(a.Count).toBe(1)

    expect(a.toString()).toBe('{SourceMemory(1 elements, atoms 1, 0 index, 1 batch size) <= [[1,2,3,4]]}')

    const d = await a.resolve()

    console.log(d[0])

    expect(d[0]).toEqual([1, 2, 3, 4])
  })

  it('should initialize with hybrid parameters', async () => {
    const a = new SourceMemory<number, 1, 1>(new DataNumber(1), 2, new DataNumber(3), 4)

    expect(a).toBeDefined()

    console.log(a.toString())

    expect(a.Empty).toBe(false)

    expect(a.toString()).toBe('{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [{DataNumber <= 1},2,{DataNumber <= 3},4]}')

    for (let i = 1; i <= 4; i++) {
      const d = await a.resolve()
      expect(d).toEqual([i])
      expect(a.Empty).toBe(i == 4)
    }
  })

  it('should be able to chain sources', async () => {
    const a = new SourceMemory<number, 1, 1>(new SourceMemory<number, 1, 1>(1, 2, 3, 4))

    expect(a).toBeDefined()

    console.log(a.toString())

    expect(a.Empty).toBe(false)

    expect(a.Config.BatchSize).toBe(1)

    expect(a.toString()).toBe('{SourceMemory(1 elements, atoms 4, 0 index, 1 batch size) <= [{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [1,2,3,4]}]}')

    for (let i = 1; i <= 4; i++) {
      const d = await a.resolve()
      expect(d).toEqual([i])
      expect(a.Empty).toBe(i == 4)
    }
  })

  it('should be able to chain composed hybrid sources', async () => {
    const a = new SourceMemory<number, 1, 1>(1, new SourceMemory<number, 1, 1>(2, 3, 4, 5), new SourceMemory<number, 1, 1>(6, 7, 8, 9), 10)

    expect(a).toBeDefined()

    console.log(a.toString())

    expect(a.Empty).toBe(false)

    expect(a.Config.BatchSize).toBe(1)

    expect(a.toString()).toBe('{SourceMemory(4 elements, atoms 10, 0 index, 1 batch size) <= [1,{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [2,3,4,5]},{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [6,7,8,9]},10]}')

    for (let i = 1; i <= 10; i++) {
      const d = await a.resolve()
      expect(d).toEqual([i])
      expect(a.Empty).toBe(i == 10)
    }
  })

  it('should be able to chain composed hybrid sources and control batch size', async () => {
    const a = new SourceMemory<number, 1, 1>(1, new SourceMemory<number, 1, 1>(2, 3, 4, 5), new SourceMemory<number, 1, 1>(6, 7, 8, 9), 10)

    expect(a).toBeDefined()

    a.Config.setBatchSize(2)

    console.log(a.toString())

    expect(a.Empty).toBe(false)

    expect(a.Config.BatchSize).toBe(2)

    expect(a.toString()).toBe('{SourceMemory(4 elements, atoms 10, 0 index, 2 batch size) <= [1,{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [2,3,4,5]},{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [6,7,8,9]},10]}')

    for (let i = 1; i <= 10; i += 2) {
      const d = await a.resolve()
      expect(d).toEqual([i, i + 1])
      expect(a.Empty).toBe(i == 9)
    }
  })

  it('should be able to chain composed hybrid sources and control batch size', async () => {
    const a = new SourceMemory<number, 1, 1>(1, new SourceMemory<number, 1, 1>(2, 3, 4, 5), new SourceMemory<number, 1, 1>(6, 7, 8, 9), 10, 11)

    expect(a).toBeDefined()

    a.Config.setBatchSize(2)

    console.log(a.toString())

    expect(a.Empty).toBe(false)

    expect(a.Config.BatchSize).toBe(2)

    expect(a.toString()).toBe('{SourceMemory(5 elements, atoms 11, 0 index, 2 batch size) <= [1,{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [2,3,4,5]},{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [6,7,8,9]},10,11]}')

    // Set a timeout
    setTimeout(async () => {
      console.log(`TIMER FIRES - write 12`)

      // When this fires..
      await a.queue(12)
    }, 1000)

    for (let i = 1; i <= 12; i += 2) {
      console.log(a.toString())
      const d = await a.resolve(true) // We want to wait
      console.log(a.toString())
      console.log(d)
      expect(d).toEqual([i, i + 1])
      expect(a.Empty).toBe(i == 11)
    }
  })

  it('should initialize with primitive parameters', async () => {
    // A source of an array of number
    const a = new SourceMemory<number, 1, 1>(new ComputeMultiplyN(new DataVectorV([1, 2, 3, 4, 5])), new ComputeMultiplyN(new DataVectorV([1, 2, 3, 4, 5])), new ComputeMultiplyN(new DataVectorV([1, 2, 3, 4, 5])), new ComputeMultiplyN(new DataVectorV([1, 2, 3, 4, 5])))

    expect(a).toBeDefined()

    console.log(a.toString())

    expect(a.Empty).toBe(false)

    expect(a.toString()).toBe('{SourceMemory(4 elements, atoms 4, 0 index, 1 batch size) <= [(multiply{DataVectorV <= [1,2,3,4,5]}=>unresolved),(multiply{DataVectorV <= [1,2,3,4,5]}=>unresolved),(multiply{DataVectorV <= [1,2,3,4,5]}=>unresolved),(multiply{DataVectorV <= [1,2,3,4,5]}=>unresolved)]}')

    for (let i = 1; i <= 4; i++) {
      const d = await a.resolve()
      expect(d).toEqual([120])
      expect(a.Empty).toBe(i == 4)
    }

    console.log(a.toString())

    expect(a.Empty).toBe(true)

    expect(a.toString()).toBe(
      '{SourceMemory(4 elements, atoms 0, 4 index, 1 batch size) <= [(multiply{DataVectorV <= [1,2,3,4,5]}=>{DataNumber <= 120}),(multiply{DataVectorV <= [1,2,3,4,5]}=>{DataNumber <= 120}),(multiply{DataVectorV <= [1,2,3,4,5]}=>{DataNumber <= 120}),(multiply{DataVectorV <= [1,2,3,4,5]}=>{DataNumber <= 120})]}',
    )
  })
})
