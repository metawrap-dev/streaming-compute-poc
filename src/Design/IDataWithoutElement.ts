import { type IData } from './IData.js'

/**
 * Some type surgery to resolve inheritance collisions so we can shoehorn in some covariance.
 *
 * @todo This may not be needed anymore.
 *
 * @interface
 */
export interface IDataWithoutIElement<T> extends Omit<IData<T>, 'Type'> {}
