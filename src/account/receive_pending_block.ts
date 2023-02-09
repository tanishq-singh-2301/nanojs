import { RPC_Node_URL } from "../../config/rpc_node_url.ts";
import { representatives } from "../../config/representatives.ts";
import { BigNumber, nanocurrency } from "../../deps.ts";
import {
    get_account_info,
    get_account_keys,
    get_block_info,
    Publish_Block,
    publish_block,
    work_generate,
} from "../../mod.ts";
import { Work_Generate } from "../work/generate.ts";

export type Receive_Pending_Block = Publish_Block;

/**
 *
 * @name Receive Pending Block
 * @param {string} account_secret_key
 * @param {string} pending_block_hash
 * @param {RPC_Node_URL} rpc_node_url
 * @returns

 * @example
 * ```ts
 * import { RPC_Node_URL, receive_pending_block } from './deps.ts';
 *
 * const account_private_key = "40C146373BF03EF2D62E067D38A5E6BDE2B511B5C90A99C62B6F7C3D321DDEAC";
 * const pending_block_hash = "20D5D6EA5CA355B11A0E3C11A74FBB4E91D126F4B3FD97232945D451A621E6F7";
 *
 * const { error, hash } = receive_pending_block(account_private_key, pending_block_hash, RPC_Node_URL.NANOS);
 * ```
 */
export const receive_pending_block = async (
    account_secret_key: string,
    pending_block_hash: string,
    rpc_node_url: RPC_Node_URL | string = RPC_Node_URL.NANOS,
): Promise<Receive_Pending_Block> => {
    const pending_block_info = await get_block_info(
        pending_block_hash,
        rpc_node_url,
    );

    if ("error" in pending_block_info) {
        return { error: pending_block_info.error };
    }

    const { private_key, address, public_key } = get_account_keys(
        account_secret_key,
    );
    const account_info = await get_account_info(address, rpc_node_url);

    let account_balance: BigNumber;
    let previous: string | null;
    let work: Work_Generate;

    if ("error" in account_info) {
        account_balance = new BigNumber("0");
        previous = null;
        work = await work_generate(public_key, rpc_node_url);
    } else {
        account_balance = new BigNumber(account_info.balance);
        previous = account_info.frontier;
        work = await work_generate(previous, rpc_node_url);
    }

    if (work.error || !work.work) return { error: work.error };

    const pending_balance = (account_balance).plus(pending_block_info.amount);

    const block_data: nanocurrency.BlockData = {
        balance: pending_balance.toFixed(),
        link: pending_block_hash,
        previous,
        work: work.work,
        representative: representatives.KRAKEN,
    };

    const { block } = nanocurrency.createBlock(private_key, block_data);
    return await publish_block(block, rpc_node_url);
};
