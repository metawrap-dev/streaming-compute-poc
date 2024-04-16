import { Generator } from '../../src/Implementation//Generator/Generator.js'
import { ComputeAddV4 } from '../../src/Implementation/Compute/Add/ComputeAddV4.js'
import { DestinationMemory } from '../../src/Implementation/Destination/DestinationMemory.js'
import { SourceMemory } from '../../src/Implementation/Source/SourceMemory.js'
import { describe as describe2 } from '../../src/Implementation/Utility/Describe.js'

describe('Generator', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('Generator matching 1:1 compute signature', async () => {
    // A source of pairs matching signature of compute element.
    const source = new SourceMemory<number, 4, 2>(
      [
        [1, 1, 1, 1],
        [2, 2, 2, 2],
      ],
      [
        [3, 3, 3, 3],
        [5, 5, 5, 5],
      ],
      [
        [7, 7, 7, 7],
        [11, 11, 11, 11],
      ],
    )

    // The generator
    const generator = new Generator<number, 4, 2, number, 4, 2, number, 4, 1, number, 4, 1>(source, ComputeAddV4)

    expect(generator).toBeDefined()

    expect(generator.toString()).toBe('{Generator(0 elements, 0 atoms, 0 index, 1 batch size){SourceMemory(3 elements, atoms 3, 0 index, 1 batch size) <= [[[1,1,1,1],[2,2,2,2]],[[3,3,3,3],[5,5,5,5]],[[7,7,7,7],[11,11,11,11]]]}=>ComputeAddV4=>[]}')

    const result = await generator.resolve()

    console.log(`result`, result)

    expect(describe2(result)).toBe('[[3,3,3,3]]')

    expect(generator.toString()).toBe('{Generator(1 elements, 0 atoms, 1 index, 1 batch size){SourceMemory(3 elements, atoms 2, 1 index, 1 batch size) <= [[[1,1,1,1],[2,2,2,2]],[[3,3,3,3],[5,5,5,5]],[[7,7,7,7],[11,11,11,11]]]}=>ComputeAddV4=>[[3,3,3,3]]}')

    console.log(generator.toString())
  })

  it('Generator matching 1:1 compute signature goes to datastore', async () => {
    // A source of pairs matching signature of compute element.
    // A source of pairs matching signature of compute element.
    const source = new SourceMemory<number, 4, 2>(
      [
        [1, 1, 1, 1],
        [2, 2, 2, 2],
      ],
      [
        [3, 3, 3, 3],
        [5, 5, 5, 5],
      ],
      [
        [7, 7, 7, 7],
        [11, 11, 11, 11],
      ],
    )

    // The generator
    const generator = new Generator<number, 4, 2, number, 4, 2, number, 4, 1, number, 4, 1>(source, ComputeAddV4)
    expect(generator).toBeDefined()

    console.log(generator.toString())

    const datastore = new DestinationMemory<number, 4, 1>()

    await datastore.write(generator)

    expect(generator.toString()).toBe('{Generator(3 elements, 0 atoms, 3 index, 1 batch size){SourceMemory(3 elements, atoms 0, 3 index, 1 batch size) <= [[[1,1,1,1],[2,2,2,2]],[[3,3,3,3],[5,5,5,5]],[[7,7,7,7],[11,11,11,11]]]}=>ComputeAddV4=>[[3,3,3,3],[8,8,8,8],[18,18,18,18]]}')

    console.log(datastore.toString())
  })

  it.skip('Generator not matching compute signature', async () => {
    // A source of vectors that we want to add together. Note that
    // there is an odd number of elements in the source. Want to test
    // that the generator stops leaving one.
    const source = new SourceMemory<number, 4, 0>([
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [5, 5, 5, 5],
      [7, 7, 7, 7],
      [11, 11, 11, 11],
    ])

    // The generator
    const generator = new Generator<number, 4, 0, number, 4, 2, number, 4, 1, number, 4, 1>(source, ComputeAddV4)

    expect(generator.toString()).toBe('{Generator{SourceMemory(1 elements, atoms 1, 0 index, 1 batch size) <= [[[1,1,1,1],[2,2,2,2],[5,5,5,5],[7,7,7,7],[11,11,11,11]]]}=>ComputeAddV4=>[]}')

    expect(generator).toBeDefined()

    const result = await generator.resolve()

    console.log(`result`, result)

    expect(generator.toString()).toBe('{Generator{SourceMemory(1 elements, atoms 0, 4 index, 1 batch size) <= [[[1,1,1,1],[2,2,2,2],[5,5,5,5],[7,7,7,7],[11,11,11,11]]]}=>ComputeAddV4=>[[3,3,3,3],[8,8,8,8],[18,18,18,18]]}')

    console.log(generator.toString())
  })
})
