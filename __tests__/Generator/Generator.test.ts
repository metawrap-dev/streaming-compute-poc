import { Generator } from '../../src/Implementation//Generator/Generator.js'
import { ComputeAddV4 } from '../../src/Implementation/Compute/Add/ComputeAddV4.js'
import { SourceMemory } from '../../src/Implementation/Source/SourceMemory.js'

describe('Generator', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it.only('Generator matching 1:1 compute signature', async () => {
    // A source of pairs matching signature of compute element.
    const source = new SourceMemory<number, 4, 2>(
      [
        [10, 10, 10, 10],
        [10, 10, 10, 10],
      ],
      [
        [10, 10, 10, 10],
        [10, 10, 10, 10],
      ],
    )

    // The compute element that will take input from the source
    const compute = new ComputeAddV4()

    // The generator
    const generator = new Generator<number, 4, 2, number, 4, 2, number, 4, 1, number, 4, 1>(source, compute)
    expect(generator).toBeDefined()

    const result = await generator.resolve()

    console.log(`result`, result)

    // If the generator's generic/template parameters can be inferred from inputs then we can have this
    // const generator = new Generator(source, compute)

    // input pairs       output vectors
    // <number,4,2>[] => <number,4,1>[]
    // ISource<number,4,2> => ISource<number,4,1>
  })

  it('Generator matching 1:1 compute signature', async () => {
    // A source of vectors that we want to add together. Note that
    // there is an odd number of elements in the source.
    const source = new SourceMemory<number, 4, 0>([
      [10, 10, 10, 10],
      [10, 10, 10, 10],
      [10, 10, 10, 10],
      [10, 10, 10, 10],
      [10, 10, 10, 10],
    ])

    // The compute element that will take input from the source
    const compute = new ComputeAddV4()

    // The generator
    const generator = new Generator<number, 4, 0, number, 4, 2, number, 4, 1, number, 4, 1>(source, compute)

    // input pairs       output vectors
    // <number,4,0>[] => <number,4,1>[]
    // ISource<number,4,0> => ISource<number,4,1>

    expect(generator).toBeDefined()
  })
})
