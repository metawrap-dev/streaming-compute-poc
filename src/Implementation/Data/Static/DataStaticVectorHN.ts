import { DataStatic } from './DataStatic.js'

/**
 *
 * Example of an entity with Dimension `Singleton` and Cardinality `Unlimited`
 *
 * A `Horizontal` vector consisting of `Static` entities
 *
 *```
 *  +-                  -+
 *  | n1, n2, n3, n4, nN |
 *  +-                  -+
 *```
 *
 * @class
 */
export class DataStaticVectorHN extends DataStatic<number, 1, 0> {}
