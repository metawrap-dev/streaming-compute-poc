import { DataVariable } from './DataVariable.js'

/**
 *
 * Example of an entity with Dimension `Singleton` and Cardinality `Unlimited`
 *
 * "Horizontal" vector.
 *
 *```
 *  +-                  -+
 *  | n1, n2, n3, n4, nN |
 *  +-                  -+
 *```
 *
 * @class
 */
export class DataVectorHN extends DataVariable<number, 1, 0> {}
