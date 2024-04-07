import { Dimension, Vector } from '../src/Design/Types/Vector'

describe('Value', () => {
  beforeAll(async () => {})

  afterAll(() => {})

  it('v0_0', async () => {
    type v0 = Vector<Vector<number, 0>, 0>

    const v: v0 = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ]

    expect(Array.isArray(v)).toBe(true)
    expect(Array.isArray(v[0])).toBe(true)
    expect(Array.isArray(v[1])).toBe(true)

    for (const i of v) {
      expect(typeof i).toBe('object')
      expect(Array.isArray(i)).toBe(true)
    }

    expect(v.length).toBe(2)
  })

  it('v0', async () => {
    type v0 = Vector<number, Dimension.Unbounded>

    const v: v0 = [1, 2, 3, 4]

    expect(Array.isArray(v)).toBe(true)

    for (const i of v) {
      expect(typeof i).toBe('number')
    }

    expect(v.length).toBe(4)
  })

  it('v1', async () => {
    type v1 = Vector<number, Dimension.Scalar>

    const v: v1 = 1

    expect(Array.isArray(v)).toBe(false)

    expect(typeof v).toBe('number')
  })

  it('Value Magic (N = 4)', async () => {
    type v4 = Vector<number, Dimension.V4>

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
