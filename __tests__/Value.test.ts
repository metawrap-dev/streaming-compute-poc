import { Vector } from '../src/Implementation/Utility/Vector.js'

describe('Value', () => {
  // Act before assertions
  beforeAll(async () => {})

  afterAll(() => {})

  it('Value Magic (N = 4)', async () => {
    type v4 = Vector<number, 4>

    const v: v4 = [1, 2, 3, 4]

    expect(Array.isArray(v)).toBe(true)

    for (const i of v) {
      expect(typeof i).toBe('number')
    }

    expect(v.length).toBe(4)
  })

  it('Value Magic (Arbitrary)', async () => {
    type vN = Vector<number, number>

    const v: vN = [1, 2, 3, 4, 5, 6]

    expect(Array.isArray(v)).toBe(true)

    for (const i of v) {
      expect(typeof i).toBe('number')
    }

    expect(v.length).toBe(6)
  })
})
