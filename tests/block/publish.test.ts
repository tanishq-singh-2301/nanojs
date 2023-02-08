import { testing, nanocurrency } from '../../deps.ts';
import { publish_block } from '../../src/block/publish.ts';
import fake_wallet from '../../config/fake_wallet.json' assert { type: "json" };
import { representatives } from '../../config/representatives.ts';

const { assertEquals } = testing;

Deno.test("Work less than threshold", async () => {
    const block_data: nanocurrency.BlockData = {
        balance: "1000000000000000000000000000000",
        link: "87434F8041869A01C8F6F263B87972D7BA443A72E0A97D7A3FD0CCC2358FD6F9",
        representative: representatives.KRAKEN,
        previous: null,
        work: "2b3d689bbcb21dca"
    }
    
    const { block } = nanocurrency.createBlock(fake_wallet.accounts[0].private_key, block_data);
    const { error, hash } = await publish_block(block);

    assertEquals(error, "Block work is less than threshold");
    assertEquals(hash, undefined);
})