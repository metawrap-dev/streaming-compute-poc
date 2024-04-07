import { DataVectorH } from '../src/Implementation/Data/DataVectorH.js'

describe('DataVectorN', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('A vector can be resolved', async () => {
    const number = new DataVectorH([1, 2, 3])

    expect(number.Resolved).toBe(true)

    expect(number.Data).toEqual([1, 2, 3])

    expect(await number.resolve()).toEqual([1, 2, 3])
  })

  it('A vector can be unresolved and set', async () => {
    const number = new DataVectorH()

    await expect(async () => number.Data).rejects.toThrow(Error)

    expect(number.Resolved).toBe(false)

    expect(number.toString()).toBe('unresolved')

    number.set([1, 2, 3])

    expect(number.Resolved).toBe(true)

    expect(number.Data).toEqual([1, 2, 3])

    expect(await number.resolve()).toEqual([1, 2, 3])

    expect(number.toString()).toBe('{DataVectorN <= [1,2,3]}')
  })
})
