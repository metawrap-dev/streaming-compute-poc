import { DataNumber } from '../src/Implementation/Data/DataNumber.js'

describe('NumberData', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  it('A number can be resolved', async () => {
    const number = new DataNumber(123)

    expect(number.Resolved).toBe(true)

    expect(number.Data).toBe(123)

    expect(await number.resolve()).toBe(123)
  })

  it('A number can be unresolved and set', async () => {
    const number = new DataNumber()

    await expect(async () => number.Data).rejects.toThrow(Error)

    expect(number.Resolved).toBe(false)

    expect(number.toString()).toBe('unresolved')

    number.set(123)

    expect(number.Resolved).toBe(true)

    expect(number.Data).toBe(123)

    expect(await number.resolve()).toBe(123)

    expect(number.toString()).toBe('{DataNumber <= 123}')
  })
})
