import { raw_in_1_xno } from '../../config/raw_xno.ts';
import { BigNumber } from '../../deps.ts';

/**
 * @name This function convert raw to xno
 * @param {string} raw
 * @returns string
 * @author tanishqsingh.com
 * 
 * @example
 * ```ts
 * import { raw_to_xno } from './deps.ts';
 * 
 * const xno = raw_to_xno("1000000000000000000000000000000"); // "1"
 * ```
 */
export const raw_to_xno = (raw: string) => (new BigNumber(raw)).dividedBy(raw_in_1_xno).toFixed();