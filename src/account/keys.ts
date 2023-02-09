import { nanocurrency } from "../../deps.ts";

/**
 * @name get_account_keys
 * @description Returns a private key, public key, and address.
 * @param {string} private_key
 *
 * @example
 * ```ts
 * import { get_account_keys } from './deps.ts';
 *
 * const account_private_key = "FF851DC0A6205B93984AE374C6662A076909400F91125CFFC06852D06272B1B7";
 * const { private_key, public_key, address } = get_account_keys(account_private_key);
 * ```
 */
export const get_account_keys = (private_key: string) => {
    const public_key = nanocurrency.derivePublicKey(private_key);
    const address = nanocurrency.deriveAddress(public_key, {
        useNanoPrefix: true,
    });

    return { private_key, public_key, address };
};
