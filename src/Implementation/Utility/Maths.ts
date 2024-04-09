import { type Vector } from '../../Design/Types/Vector.js'

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
export function dot4(vectorA: Vector<number, 4>, vectorB: Vector<number, 4>): number {
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
 * Add v4
 * @param {number[4]} vectorA
 * @param {number[4]} vectorB
 * @returns
 */
export function add4(vectorA: Vector<number, 4>, vectorB: Vector<number, 4>): Vector<number, 4> {
  if (vectorA.length !== 4) {
    throw new Error(`dot4:Vectors must be of length (4) ${vectorA.length}`)
  }

  if (vectorB.length !== 4) {
    throw new Error(`dot4:Vectors must be of length (4) ${vectorB.length}`)
  }

  return [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1], vectorA[2] + vectorB[2], vectorA[3] + vectorB[3]]
}

/**
 * Multiply all the values in the vector together
 * @param {number[4]} vectorA
 * @returns
 */
export function multiplyN(vectorA: Vector<number, 0>): number {
  let accumulator = 1

  for (let i = 0; i < vectorA.length; i++) {
    accumulator *= vectorA[i]
  }

  return accumulator
}
