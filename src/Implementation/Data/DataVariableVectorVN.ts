import { DataVariable } from './Variable/DataVariable.js'

/**
 * Example of an entity with Dimension `Unlimited` and Cardinality `1`
 *
 * "Vertical" vector.
 *
 *```
 *  +-  -+
 *  | n1 |
 *  | n2 |
 *  | n3 |
 *  | nN |
 *  +-  -+
 *```
 *
 * @class
 */
export class DataVariableVectorVN extends DataVariable<number, 0, 1> {}
