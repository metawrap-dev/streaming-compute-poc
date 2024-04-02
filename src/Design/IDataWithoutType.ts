import { type IData } from './IData.js'

/**
 * Some type surgery to resolve inheritance collisions so we can shoehorn in some covariance.
 * @interface
 */
export interface IDataWithoutIElement<T> extends Omit<IData<T>, 'Type'> {}
