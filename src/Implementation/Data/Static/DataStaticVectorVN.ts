import { DataStatic } from './DataStatic.js'

/**
 * Example of a `Static` entity with Dimension `Unlimited` and Cardinality `1`
 *
 * `Vertical` vector consisting of `Static` elements.
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
export class DataStaticVectorVN extends DataStatic<number, 0, 1> {}
