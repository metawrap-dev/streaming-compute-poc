import { ComputeMultiply } from '../Implementation/ComputeMultiply.js'
import { DataNumber } from '../Implementation/DataNumber.js'

describe('greeter function', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  it('Simple multiplication', async () => {
    const a = new DataNumber(10)
    const b = new DataNumber(10)
    const c = new DataNumber(10)

    const m = new ComputeMultiply(a, b, c)

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())
  })

  it('Composite multiplication', async () => {
    const m = new ComputeMultiply(new DataNumber(10), new DataNumber(10), new ComputeMultiply(new DataNumber(10), new DataNumber(10)))

    console.log(m.toString())

    await m.resolve()

    console.log(m.toString())

    console.log(m.Data.toString())
  })
})
