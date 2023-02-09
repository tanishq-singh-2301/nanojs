import { RPC_Node_URL } from "../../config/rpc_node_url.ts";
import { representatives } from "../../config/representatives.ts";
import { BigNumber, nanocurrency } from "../../deps.ts";
import {
    get_account_info,
    get_account_keys,
    Publish_Block,
    publish_block,
    work_generate,
    xno_to_raw,
} from "../../mod.ts";

export type Send_XNO = Publish_Block;

/**
 *
 * @name Send Amount
 * @param {string} sender_private_key
 * @param {string} receiver_address
 * @param {string} amount_xno
 * @param {RPC_Node_URL} rpc_node_url
 * @returns {Send_XNO}

 * @example
 * ```ts
 * import { RPC_Node_URL, send_xno } from './deps.ts';
 *
 * const sender_private_key = "40C146373BF03EF2D62E067D38A5E6BDE2B511B5C90A99C62B6F7C3D321DDEAC";
 * const receiver_address = "nano_1trd73o8z76wnnwmuq6y5pe6r396p7m7qf5zufrox9uk3io8foyd8mowgxu3";
 * const amount_xno = "10.31";
 *
 * const { error, hash } = await send_xno(sender_private_key, receiver_address, amount_xno, RPC_Node_URL.NANOS);
 * ```
 */
export const send_xno = async (
    sender_private_key: string,
    receiver_address: string,
    amount_xno: string,
    rpc_node_url: RPC_Node_URL = RPC_Node_URL.NANOS,
): Promise<Send_XNO> => {
    const { address, private_key } = get_account_keys(sender_private_key);
    const sender_account_info = await get_account_info(address, rpc_node_url);

    if ("error" in sender_account_info) {
        return { error: sender_account_info.error };
    }

    const { error, work } = await work_generate(
        sender_account_info.frontier,
        rpc_node_url,
    );

    if (error || !work) return { error };

    const sender = {
        address,
        balance: new BigNumber(sender_account_info.balance),
        frontier: sender_account_info.frontier,
        work: work,
    };

    const amount_to_send_raw = xno_to_raw(amount_xno);
    const balance = (sender.balance).minus(amount_to_send_raw);

    if (balance.isGreaterThanOrEqualTo(0)) {
        const block_data: nanocurrency.BlockData = {
            balance: balance.toFixed(),
            link: receiver_address,
            previous: sender.frontier,
            representative: representatives.KRAKEN,
            work: sender.work,
        };

        const { block } = nanocurrency.createBlock(private_key, block_data);
        return await publish_block(block, rpc_node_url);
    } else return { error: "No sufficient balance" };
};
