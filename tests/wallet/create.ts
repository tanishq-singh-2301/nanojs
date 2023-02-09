import { create_wallet } from "../../mod.ts";
import { testing } from "../../deps.ts";
import fake_wallet from "../../config/fake_wallet.json" assert { type: "json" };

const { assertEquals } = testing;

Deno.test("Create Wallet", async (t) => {
    await t.step("Without Seed", async (t) => {
        await t.step("Index = null", async () => {
            const wallet = await create_wallet({});

            assertEquals(wallet.seed.length, 64);
            assertEquals(wallet.accounts.length, 1);
        });

        await t.step("Index = 4", async () => {
            const wallet = await create_wallet({ till_index: 4 });

            assertEquals(wallet.seed.length, 64);
            assertEquals(wallet.accounts.length, 5);
        });
    });

    await t.step("With Seed", async (t) => {
        await t.step("Index = null", async () => {
            const wallet = await create_wallet({ seed: fake_wallet.seed });

            assertEquals(wallet.seed.length, 64);
            assertEquals(wallet.accounts.length, 1);

            assertEquals(wallet.seed, fake_wallet.seed);
            assertEquals(wallet.accounts[0], fake_wallet.accounts[0]);
        });

        await t.step("Index = max of fake wallet", async () => {
            const wallet = await create_wallet({
                seed: fake_wallet.seed,
                till_index: fake_wallet.accounts.length - 1,
            });

            assertEquals(wallet.seed.length, 64);
            assertEquals(wallet.accounts.length, fake_wallet.accounts.length);

            assertEquals(wallet.seed, fake_wallet.seed);
            assertEquals(wallet.accounts, fake_wallet.accounts);
        });
    });
});
