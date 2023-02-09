import { testing } from '../../deps.ts';
import { xno_to_raw } from '../../mod.ts';

const { assertEquals } = testing;

Deno.test("XNO to RAW", () => {
    assertEquals(xno_to_raw("1.100231"), "1100231000000000000000000000000");
    assertEquals(xno_to_raw("100000000000000000000000"), "100000000000000000000000000000000000000000000000000000");
    assertEquals(xno_to_raw("0.000000000000000000001100231"), "1100231000");
})