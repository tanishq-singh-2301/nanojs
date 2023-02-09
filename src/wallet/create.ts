import { nanocurrency } from "../../deps.ts";
import { get_account_keys } from "../../mod.ts";

export type Account = {
    index: number;
    private_key: string;
    public_key: string;
    address: string;
};

export type Wallet = {
    seed: string;
    accounts: Account[];
};

export type Create_Wallet_Props = { seed?: string; till_index?: number };

/**
 * @name create wallet
 * @param {Props} Props
 * @returns {Wallet}
 *
 * @example
 * ```ts
 * import { create_wallet } from './deps';
 *
 * const wallet1 = await create_wallet({ });
 * const wallet2 = await create_wallet({ till_index: 2 });
 * const wallet3 = await create_wallet({ seed: "5b4b36a524c213a1ef891af31dc5b3071c59c12e36b7fe14f692052b2ea9c74a" });
 * const wallet4 = await create_wallet({ seed: "5b4b36a524c213a1ef891af31dc5b3071c59c12e36b7fe14f692052b2ea9c74a", till_index: 3 });
 * ```
 */
export const create_wallet = async (
    { seed, till_index = 0 }: Create_Wallet_Props,
): Promise<Wallet> => {
    const wallet: Wallet = {
        seed: seed ? seed : await nanocurrency.generateSeed(),
        accounts: [],
    };

    for (let i = 0; i <= till_index; i++) {
        const private_key = nanocurrency.deriveSecretKey(wallet.seed, i);
        const account = get_account_keys(private_key);

        wallet.accounts.push({ index: i, ...account });
    }

    return wallet;
};
