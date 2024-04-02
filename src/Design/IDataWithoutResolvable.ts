import { type IData } from './IData.js'

/**
 * Some type surgery to resolve inheritance collisions so we can shoehorn in some covariance.
 *
 * @todo This may not be needed anymore.
 *
 * @interface
 */
export interface IDataWithoutIResolvable<T> extends Omit<IData<T>, 'Resolved' | 'resolve'> {}
