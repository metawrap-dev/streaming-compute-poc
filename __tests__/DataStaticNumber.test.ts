import { DataStaticNumber } from '../src/Implementation/Data/DataStaticNumber.js'

describe('DataStaticNumber', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('A number can be resolved', async () => {
    const number = new DataStaticNumber(123)

    expect(number.Resolved).toBe(true)

    expect(number.Data).toBe(123)

    expect(await number.resolve()).toBe(123)
  })

  it('A number can be unresolved and set', async () => {
    const number = new DataStaticNumber()

    await expect(async () => number.Data).rejects.toThrow(Error)

    expect(number.Resolved).toBe(false)

    expect(number.toString()).toBe('unresolved')

    number.set(123)

    expect(number.Resolved).toBe(true)

    expect(number.Data).toBe(123)

    expect(await number.resolve()).toBe(123)

    expect(number.toString()).toBe('{DataStaticNumber <= 123}')
  })
})
