import { RPC_Node_URL } from "../../config/rpc_node_url.ts";
import { axiod } from "../../deps.ts";

export type Account_Info = {
    "frontier": string;
    "open_block": string;
    "representative_block": string;
    "balance": string;
    "modified_timestamp": string;
    "block_count": string;
    "account_version": string;
    "confirmation_height": string;
    "confirmation_height_frontier": string;
} | { error: string };

/**
 *
 * @name This function returns the nano account's information.
 * @param {string} account `nano address, eg: xrb_ or nano_`
 * @param {RPC_Node_URL | string} rpc_node_url
 * @returns Account_Info

 * @example
 * ```ts
 * import { RPC_Node_URL, get_account_info, Account_Info } from './deps.ts';
 * const account_info: Account_Info = await get_account_info('nano_address', RPC_Node_URL.NANOS);
 * ```
 */
export const get_account_info = async (
    account: string,
    rpc_node_url: RPC_Node_URL | string = RPC_Node_URL.NANOS,
) => {
    const data = {
        action: "account_info",
        account,
    };

    return (await axiod.post<Account_Info>(rpc_node_url, data)).data;
};
