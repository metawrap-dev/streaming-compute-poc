import { DataVector4 } from '../src/Implementation/Data/DataVector4.js'

describe('DataVector4', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  it('A vector can be resolved', async () => {
    const number = new DataVector4([1, 2, 3, 4])

    expect(number.Resolved).toBe(true)

    expect(number.Data).toEqual([1, 2, 3, 4])

    expect(await number.resolve()).toEqual([1, 2, 3, 4])
  })

  it('A vector can be unresolved and set', async () => {
    const number = new DataVector4()

    await expect(async () => number.Data).rejects.toThrow(Error)

    expect(number.Resolved).toBe(false)

    expect(number.toString()).toBe('unresolved')

    number.set([1, 2, 3, 4])

    expect(number.Resolved).toBe(true)

    expect(number.Data).toEqual([1, 2, 3, 4])

    expect(await number.resolve()).toEqual([1, 2, 3, 4])

    expect(number.toString()).toBe('{DataVectorN <= [1,2,3,4]}')
  })
})
