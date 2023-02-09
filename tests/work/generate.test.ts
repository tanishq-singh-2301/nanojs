import { testing } from "../../deps.ts";
import fake_wallet from "../../config/fake_wallet.json" assert { type: "json" };
import { work_generate } from "../../mod.ts";

const { assertEquals } = testing;

Deno.test("Invalid hash", async () => {
    const { error, hash } = await work_generate("hello");

    assertEquals(error, "Invalid hash");
    assertEquals(hash, undefined);
});

Deno.test("Correct hash", async () => {
    const { error, hash } = await work_generate(
        fake_wallet.accounts[2].public_key,
    );

    assertEquals(error, undefined);
    assertEquals(
        hash,
        "F15B16CAEA79AC090CA6E4987535C6E05E9228BC662FEDCB6315F3432AF227B0",
    );
});
