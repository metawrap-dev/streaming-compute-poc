import { DataStaticVectorHN } from '../../src/Implementation/Data/Static/DataStaticVectorHN.js'

describe('DataVariableVectorHN', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('A vector can be resolved', async () => {
    const number = new DataStaticVectorHN([1, 2, 3])

    expect(number.Resolved).toBe(true)

    expect(await number.resolve()).toEqual([1, 2, 3])

    expect(number.Data).toEqual([1, 2, 3])
  })

  it('A vector can be unresolved and set', async () => {
    const number = new DataStaticVectorHN()

    await expect(async () => number.Data).rejects.toThrow(Error)

    expect(number.Resolved).toBe(false)

    expect(number.toString()).toBe('unresolved')

    number.set([1, 2, 3])

    expect(number.Resolved).toBe(true)

    expect(number.Data).toEqual([1, 2, 3])

    expect(await number.resolve()).toEqual([1, 2, 3])

    expect(number.toString()).toBe('{DataStaticVectorHN <= [1,2,3]}')
  })
})
