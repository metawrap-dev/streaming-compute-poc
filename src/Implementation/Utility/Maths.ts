import { type Dimension, type Vector } from '../../Design/Types/Vector.js'

/**
 * Calculate the length of a v4
 * @param {number[4]} vectorA
 * @returns
 */
export function length4(vectorA: number[]): number {
  if (vectorA.length !== 4) {
    throw new Error('Vector must be of length (4)')
  }

  // Calculate the length of vectorA
  return Math.sqrt(vectorA[0] * vectorA[0] + vectorA[1] * vectorA[1] + vectorA[2] * vectorA[2] + vectorA[3] * vectorA[3])
}

/**
 * Dot product v4
 * @param {number[4]} vectorA
 * @param {number[4]} vectorB
 * @returns
 */
export function dot4(vectorA: Vector<number, Dimension.V4>, vectorB: Vector<number, Dimension.V4>): number {
  if (vectorA.length !== 4) {
    throw new Error(`dot4:Vectors must be of length (4) ${vectorA.length}`)
  }

  if (vectorB.length !== 4) {
    throw new Error(`dot4:Vectors must be of length (4) ${vectorB.length}`)
  }

  let product = 0
  for (let i = 0; i < vectorA.length; i++) {
    product += vectorA[i] * vectorB[i]
  }

  return product
}

/**
 * Multiply all the values in the vector together
 * @param {number[4]} vectorA
 * @returns
 */
export function multiplyN(vectorA: Vector<number, Dimension.Unbounded>): number {
  
  let accumulator = 1

  for (let i = 0; i < vectorA.length; i++) {
    accumulator *= vectorA[i]
  }

  return accumulator
}
