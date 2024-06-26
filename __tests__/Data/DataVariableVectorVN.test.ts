import { DataVariableVectorVN } from '../../src/Implementation/Data/DataVariableVectorVN.js'
import { DataVariableNumber } from '../../src/Implementation/Data/Variable/DataVariableNumber.js'

describe('DataVariableVectorVN', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('A vector can be resolved', async () => {
    const number = new DataVariableVectorVN([1, 2, 3])

    expect(number.Resolved).toBe(false)

    expect(await number.resolve()).toEqual([1, 2, 3])

    expect(number.Data).toEqual([1, 2, 3])
  })

  it('A nested vector can be resolved', async () => {
    const number = new DataVariableVectorVN([1, new DataVariableNumber(2), 3])

    expect(number.Resolved).toBe(false)

    expect(await number.resolve()).toEqual([1, 2, 3])

    expect(number.Data).toEqual([1, 2, 3])
  })

  it('A vector can be unresolved and set', async () => {
    const number = new DataVariableVectorVN()

    await expect(async () => number.Data).rejects.toThrow(Error)

    expect(number.Resolved).toBe(false)

    expect(number.toString()).toBe('unresolved')

    number.set([1, 2, 3])

    expect(number.Resolved).toBe(true)

    expect(number.Data).toEqual([1, 2, 3])

    expect(await number.resolve()).toEqual([1, 2, 3])

    expect(number.toString()).toBe('{DataVariableVectorVN <= [1,2,3]}')
  })
})
