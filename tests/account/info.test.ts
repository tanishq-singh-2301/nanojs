import { testing } from "../../deps.ts";
import fake_wallet from "../../config/fake_wallet.json" assert { type: "json" };
import { get_account_info } from "../../mod.ts";

const { assertEquals } = testing;

Deno.test("Check Account (registered account)", async () => {
    const info = await get_account_info(
        "nano_1trd73o8z76wnnwmuq6y5pe6r396p7m7qf5zufrox9uk3io8foyd8mowgxu3",
    );
    assertEquals("error" in info, false);
});

Deno.test("Check Account (non registered account)", async () => {
    const info = await get_account_info(fake_wallet.accounts[2].address);
    assertEquals("error" in info, true);
});
