import { testing } from '../../deps.ts';
import { get_block_info } from '../../mod.ts';

const { assertEquals } = testing;

Deno.test("Invalid hash", async () => {
    const block = await get_block_info("blahblah balh");

    if ('error' in block)
        assertEquals(block.error, "Invalid block hash");
})

Deno.test("Correct hash", async () => {
    const block = await get_block_info("87434F8041869A01C8F6F263B87972D7BA443A72E0A97D7A3FD0CCC2358FD6F9");

    if (!('error' in block))
        assertEquals(typeof block, "object");
})