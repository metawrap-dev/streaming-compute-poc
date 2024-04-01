import { type IData } from '../Design/IData.js'
import { type ISettable } from '../Design/ISettable.js'

/**
 * A "simple" number.
 * @class
 */
export class DataNumber implements IData<number>, ISettable<number> {
  /**
   * The value of the number.
   * @type {number | undefined}
   * @private
   */
  #Number?: number

  /**
   * The number value
   * @type {number}
   * @readonly
   */
  get Data(): number {
    if (this.Resolved) {
      return this.#Number
    }
    throw new Error(`Number is not resolved.`)
  }

  /**
   * @constructor
   * @param {number} number The value of the number.
   */
  constructor(number?: number) {
    this.#Number = number
    this.#Resolved = number !== undefined
  }

  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @private
   */
  #Resolved: boolean

  /**
   * If true then this has been resolved.
   * @type {boolean}
   * @readonly
   */
  get Resolved(): boolean {
    return this.#Resolved
  }

  /**
   * Describe the element as a string.
   * @returns {string}
   */
  toString(): string {
    if (this.Resolved) {
      return this.#Number.toString()
    } else {
      return 'unresolved'
    }
  }

  /**
   * Resolve it using a promise.
   * @async
   */
  async resolve(): Promise<number> {
    this.#Resolved = true
    return this.Data
  }

  /**
   * Sets the value of the number data and marks it as resolved.
   * @param {number} value The value to set.
   */
  set(value: number): void {
    this.#Number = value
    this.#Resolved = true
  }
}
