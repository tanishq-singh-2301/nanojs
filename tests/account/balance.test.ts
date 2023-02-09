import { testing } from "../../deps.ts";
import fake_wallet from "../../config/fake_wallet.json" assert { type: "json" };
import { get_account_balance } from "../../mod.ts";

const { assertObjectMatch } = testing;

Deno.test("Check Balance (non registered account)", async () => {
    const info = await get_account_balance(fake_wallet.accounts[2].address);

    assertObjectMatch(info, {
        balance: "0",
        pending: "0",
        receivable: "0",
    });
});
