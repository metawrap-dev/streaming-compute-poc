import { DataVariableNumber } from '../src/Implementation/Data/DataVariableNumber.js'

describe('DataVariableNumber', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('A number can be resolved', async () => {
    const number = new DataVariableNumber(123)

    expect(number.Resolved).toBe(true)

    expect(number.Data).toBe(123)

    expect(await number.resolve()).toBe(123)
  })

  it('A number can be resolved when nested', async () => {
    const number = new DataVariableNumber(new DataVariableNumber(123))

    expect(number.Resolved).toBe(true)

    expect(number.Data).toBe(123)

    expect(await number.resolve()).toBe(123)
  })

  it('A number can be unresolved and set', async () => {
    const number = new DataVariableNumber()

    await expect(async () => number.Data).rejects.toThrow(Error)

    expect(number.Resolved).toBe(false)

    expect(number.toString()).toBe('unresolved')

    number.set(123)

    expect(number.Resolved).toBe(true)

    expect(number.Data).toBe(123)

    expect(await number.resolve()).toBe(123)

    expect(number.toString()).toBe('{DataVariableNumber <= 123}')
  })
})
