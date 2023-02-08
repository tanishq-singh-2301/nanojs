import { raw_in_1_xno } from '../../config/raw_xno.ts';
import { BigNumber } from '../../deps.ts';

/**
 * @name This function convert xno to raw
 * @param {string} xno
 * @returns string
 * @author tanishqsingh.com
 * 
 * @example
 * ```ts
 * import { xno_to_raw } from './deps.ts';
 * 
 * const raw = xno_to_raw("1"); // "1000000000000000000000000000000"
 * ```
 */
export const xno_to_raw = (xno: string) => (raw_in_1_xno).multipliedBy(new BigNumber(xno)).toFixed();