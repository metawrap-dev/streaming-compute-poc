import { DataStatic } from './DataStatic.js'

/**
 * Implements a `Static` representation of a `Scalar` number
 *
 * The below is overkill for a simple number, but this is just a toy example of how to implement a data element.
 *
 * Also we need some overhead for the pipeline graph to work.
 * @class
 */
export class DataStaticNumber extends DataStatic<number, 1, 1> {}
