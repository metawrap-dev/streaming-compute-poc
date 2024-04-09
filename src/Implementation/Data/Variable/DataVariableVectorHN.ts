import { DataVariable } from './DataVariable.js'

/**
 *
 * Example of an entity with Dimension `Singleton` and Cardinality `Unlimited`
 *
 * A `Unlimited` dimension `Horizontal` vector `Row`.
 *
 *```
 *  +-                  -+
 *  | n1, n2, n3, n4, nN |
 *  +-                  -+
 *```
 *
 * @class
 */
export class DataVariableVectorHN extends DataVariable<number, 1, 0> {}
