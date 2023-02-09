import { RPC_Node_URL } from "../../config/rpc_node_url.ts";
import { axiod } from "../../deps.ts";

export type Block_Info = {
    "block_account": string;
    "amount": string;
    "balance": string;
    "height": string;
    "local_timestamp": string;
    "successor": string;
    "confirmed": string;
    "contents": {
        "type": string;
        "account": string;
        "previous": string;
        "representative": string;
        "balance": string;
        "link": string;
        "link_as_account": string;
        "signature": string;
        "work": string;
    };
    "subtype": string;
} | { error: string };

/**
 *
 * @name This function return block's information.
 * @param {string} hash
 * @param {RPC_Node_URL | string} rpc_node_url
 * @returns Block_Info

 * @example
 * ```ts
 * import { RPC_Node_URL, get_block_info, Block_Info } from './deps.ts';
 * const block_info: Block_Info = await get_block_info('12HHA8WEQW881', RPC_Node_URL.NANOS);
 * ```
 */
export const get_block_info = async (
    hash: string,
    rpc_node_url: RPC_Node_URL | string = RPC_Node_URL.NANOS,
) => {
    const data = {
        action: "block_info",
        hash,
    };

    return (await axiod.post<Block_Info>(rpc_node_url, data)).data;
};
