import { DataNumber } from '../Implementation/DataNumber.js'

describe('greeter function', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  it('A number can be resolved', async () => {
    const number = new DataNumber(123)

    expect(number.Resolved).toBe(true)

    expect(number.Data).toBe(123)

    expect(await number.resolve()).toBe(123)
  })

  it('A number can be unresolved ans set', async () => {
    const number = new DataNumber()

    expect(number.Resolved).toBe(false)

    expect(number.toString()).toBe('unresolved')

    await expect(async () => number.Data).rejects.toThrow(Error)

    number.set(123)

    expect(number.Resolved).toBe(true)

    expect(number.Data).toBe(123)

    expect(await number.resolve()).toBe(123)

    expect(number.toString()).toBe('123')
  })
})
