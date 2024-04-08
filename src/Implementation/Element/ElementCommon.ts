import { type IConfig } from '../../Design/IConfig.js'
import { type IElement } from '../../Design/IElement.js'
import { type IState } from '../../Design/IState.js'
import { type IStrategy } from '../../Design/IStrategy.js'
import { type ElementType } from '../../Design/Types/ElementType.js'
import { Synchronizer } from '../Utility/Synchronizer.js'

/**
 * Compute Element: A function that takes some data and produces some output.
 * @class
 */
export abstract class ElementCommon implements IElement {
  /**
   * The type of an element
   * @type {ElementType}
   * @readonly
   */
  abstract readonly Type: ElementType

  /**
   * The runtime state of the element.
   * @type {IState}
   * @readonly
   */
  abstract readonly State: IState

  /**
   * Reflects the current applied strategy.
   * @type {IConfig}
   * @readonly
   */
  abstract readonly Config: IConfig

  /**
   * The strategy that can be applied to the element's config.
   * @type {IStrategy}
   * @readonly
   */
  abstract readonly Strategy: IStrategy

  /**
   * Description placeholder
   * @type {Synchronizer}
   */
  readonly #Sync: Synchronizer = new Synchronizer()

  /**
   * Wait for the resource to be resolvable.
   * @async
   */
  async wait(): Promise<void> {
    await this.#Sync.wait()
  }

  /**
   * Release the waiting resource
   * @async
   */
  async release(): Promise<void> {
    await this.#Sync.release()
  }

  /**
   * Check if we are waiting.
   * @type {boolean}
   * @readonly
   */
  get Waiting(): boolean {
    return this.#Sync.Waiting
  }
}
