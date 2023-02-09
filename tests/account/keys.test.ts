import { testing } from "../../deps.ts";
import fake_wallet from "../../config/fake_wallet.json" assert { type: "json" };
import { get_account_keys } from "../../mod.ts";

const { assertEquals } = testing;

for (let i = 0; i < fake_wallet.accounts.length; i++) {
    Deno.test(`Account Keys Gen - index: ${i}`, () => {
        const account = fake_wallet.accounts[i];
        const { address, private_key, public_key } = get_account_keys(
            account.private_key,
        );

        assertEquals(account.private_key, private_key);
        assertEquals(account.public_key, public_key);
        assertEquals(account.address, address);
    });
}
