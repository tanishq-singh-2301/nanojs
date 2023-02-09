import { testing } from '../../deps.ts';
import { raw_to_xno } from '../../mod.ts';

const { assertEquals } = testing;

Deno.test("RAW to XNO", () => {
    assertEquals(raw_to_xno("1100231000000000000000000000000"), "1.100231");
    assertEquals(raw_to_xno("100000000000000000000000000000000000000000000000000000"), "100000000000000000000000");
    assertEquals(raw_to_xno("11002310000"), "0.00000000000000000001");
})