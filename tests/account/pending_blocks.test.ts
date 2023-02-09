import { testing } from '../../deps.ts';
import fake_wallet from '../../config/fake_wallet.json' assert { type: "json" };
import { get_pending_blocks } from '../../mod.ts';

const { assertEquals } = testing;

Deno.test("Pending Blocks - empty", async () => {
    const info = await get_pending_blocks(fake_wallet.accounts[2].address);
    assertEquals(info.blocks, "");
})

Deno.test("Pending Blocks - present", async () => {
    const info = await get_pending_blocks("nano_1111111111111111111111111111111111111111111111111117353trpda");
    assertEquals(typeof info.blocks === "object", true);
})