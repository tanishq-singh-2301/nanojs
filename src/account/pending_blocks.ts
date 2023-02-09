import { RPC_Node_URL } from "../../config/rpc_node_url.ts";
import { axiod } from "../../deps.ts";

export type Blocks = {
    blocks: string[] | string;
};

/**
 *
 * @name This function returns the nano account's pending blocks.
 * @param {string} account `nano address, eg: xrb_ or nano_`
 * @param {RPC_Node_URL | string} rpc_node_url
 * @returns Blocks

 * @example
 * ```ts
 * import { RPC_Node_URL, get_pending_blocks, Blocks } from './deps.ts';
 * const blocks: Blocks = await get_pending_blocks('nano_address', RPC_Node_URL.NANOS);
 * ```
 */
export const get_pending_blocks = async (
    account: string,
    rpc_node_url: RPC_Node_URL | string = RPC_Node_URL.NANOS,
) => {
    const data = {
        action: "pending",
        account,
    };

    return (await axiod.post<Blocks>(rpc_node_url, data)).data;
};
