import { RPC_Node_URL } from '../../config/rpc_node_url.ts';
import { axiod } from '../../deps.ts';

export type Work_Generate = {
    difficulty: string;
    multiplier: string;
    work?: string;
    hash?: string;
    error?: string;
}

/**
 * 
 * @name This function generates work for block.
 * @param {string} hash
 * @param {RPC_Node_URL | string} rpc_node_url
 * @returns Work_Generate
 * @author tanishqsingh.com
 * 
 * @example
 * ```ts
 * import { RPC_Node_URL, work_generate, Work_Generate } from './deps.ts';
 * 
 * const work: Work_Generate = await work_generate('12HHA8WEQW881', RPC_Node_URL.NANOS);
 * ```
 */
export const work_generate = async (hash: string, rpc_node_url: RPC_Node_URL | string = RPC_Node_URL.NANOS) => (await axiod.post<Work_Generate>(rpc_node_url, { action: 'work_generate', hash })).data;
