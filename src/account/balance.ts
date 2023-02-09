import { RPC_Node_URL } from "../../config/rpc_node_url.ts";
import { axiod } from "../../deps.ts";

export type Account_Balance = {
    "balance": string;
    "pending": string;
    "receivable": string;
};

/**
 * @name This function returns the nano account's balance.
 * @param {string} account `nano address, eg: xrb_ or nano_`
 * @param {RPC_Node_URL | string} rpc_node_url
 * @returns Account_Balance
 *
 * @example
 * ```ts
 * import { RPC_Node_URL, get_account_balance, Account_Balance } from './deps.ts';
 * const account_balance: Account_Balance = await get_account_balance('nano_address', RPC_Node_URL.NANOS);
 * ```
 */
export const get_account_balance = async (
    account: string,
    rpc_node_url: RPC_Node_URL | string = RPC_Node_URL.NANOS,
) => {
    const data = {
        action: "account_balance",
        account,
    };

    return (await axiod.post<Account_Balance>(rpc_node_url, data)).data;
};
