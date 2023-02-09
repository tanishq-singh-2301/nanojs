import { RPC_Node_URL } from "../../config/rpc_node_url.ts";
import { axiod } from "../../deps.ts";

export interface BlockRepresentation {
    type: "state";
    account: string;
    previous: string;
    representative: string;
    balance: string;
    link: string;
    link_as_account: string;
    work: string | null;
    signature: string;
}

export type Publish_Block = {
    hash?: string;
    error?: string;
};

/**
 *
 * @name This function publish block to nano node.
 * @param {BlockRepresentation} block
 * @param {RPC_Node_URL | string} rpc_node_url
 * @returns Publish_Block

 * @example
 * ```ts
 * import { RPC_Node_URL, publish_block, Publish_Block } from './deps.ts';
 * const { hash }: Publish_Block = await publish_block(block, RPC_Node_URL.NANOS);
 * ```
 */
export const publish_block = async (
    block: BlockRepresentation,
    rpc_node_url: RPC_Node_URL | string = RPC_Node_URL.NANOS,
) => {
    const data = {
        action: "process",
        json_block: "true",
        block,
    };

    return (await axiod.post<Publish_Block>(rpc_node_url, data)).data;
};
