import { type Vector } from '../../Design/Types/Vector.js'
import { resolve } from './Resolve.js'

/**
 * Calculate the length of a v4
 * @param {number[4]} vectorA
 * @returns
 */
export async function length4(vectorA: number[]): Promise<number> {
  if (vectorA.length !== 4) {
    throw new Error('Vector must be of length (4)')
  }

  // Calculate the length of vectorA
  return Math.sqrt(await resolve<number,1>(vectorA[0]) * await resolve<number,1>(vectorA[0]) + await resolve<number,1>(vectorA[1]) * await resolve<number,1>(vectorA[1]) + await resolve<number,1>(vectorA[2]) * await resolve<number,1>(vectorA[2]) + await resolve<number,1>(vectorA[3]) * await resolve<number,1>(vectorA[3]))
}

/**
 *
 * @param {number[4]} vectorA
 * @param {number[4]} vectorB
 * @returns
 */
export function dot4(vectorA: Vector<number, 4>, vectorB: Vector<number, 4>): number {
  if (vectorA.length !== 4 || vectorB.length !== 4) {
    throw new Error('Vectors must be of length (4)')
  }

  let product = 0
  for (let i = 0; i < vectorA.length; i++) {
    product += vectorA[i] * vectorB[i]
  }

  return product
}

/**
 *
 * @param {number[4]} vectorA
 * @returns
 */
export async function multiplyN(vectorA: Vector<number, 0>): Promise<number> {
  let accumulator = 1
  for (let i = 0; i < vectorA.length; i++) {
    accumulator *= await resolve<number,1>(vectorA[i])
  }

  return accumulator
}
