<h1 align="center">
    <b>Nanojs</b>
</h1>

<img align="right" src="./assets/nanojs-round.png" height="150px">

_**NanoJs**_ is a _simple_, _modern_ and _secure_ library for **nanocurrency**.

### Features

- Secure by default. No sharing of private_key, all the blocks are created and
  signed locally. then get published to node.
- Get account information, balance, pending blocks, etc.
- Send, and Receive nano.
- Create wallet, account (with and without seed).
- Work Generate, block info, publish block to node, etc.
- xno to raw and vice-versa.

<br />

# _**Install**_

[Node](https://nodejs.org)

```sh
yarn add @tanishq-singh/nanojs
# or
npm install @tanishq-singh/nanojs
```

```ts
import nanojs from "@tanishq-singh/nanojs";
// or
const nanojs = require("@tanishq-singh/nanojs");
```

[Deno](https://deno.land)

```ts
import nanojs from "https://deno.land/x/nanojs/mod.ts";
```

<br />

# _**Getting Started**_

<details>
<summary><b>Account</b></summary>

1. ### _Account Information_
    ```ts
    const nano_address = "nano_1cp73fb93gkunh1yujbz3ecap46cmfsm5ozx3iqho7mu9jsx7p36hp5g39bn";
    const info = await nanojs.get_account_info(nano_address);

    if ("error" in info) console.log(info.error); // error reason
    else console.log(info); // account info
    ```

    ```bash
    {
        "frontier": "3611793EF73D629181ECE0F99BADDF1A02E85523D2CC8EE2C6637481080857D2",
        "open_block": "160816E90ECAB9726FC7A0208165EC5BAC5C00093DEC8C8F1D537FE7B1C11052",
        "representative_block": "3611793EF73D629181ECE0F99BADDF1A02E85523D2CC8EE2C6637481080857D2",
        "balance": "3850130000000000000000000000",
        "modified_timestamp": "1675659938",
        "block_count": "55",
        "account_version": "2",
        "confirmation_height": "55",
        "confirmation_height_frontier": "3611793EF73D629181ECE0F99BADDF1A02E85523D2CC8EE2C6637481080857D2",
    }
    ```

<br />

2. ### _Account Balance_
    ```ts
    const nano_address = "nano_1cp73fb93gkunh1yujbz3ecap46cmfsm5ozx3iqho7mu9jsx7p36hp5g39bn";
    const account_balance = await nanojs.get_account_balance(nano_address);

    console.log(account_balance);
    ```

    ```bash
    {
        "balance": "325586539664609129644855132177",
        "pending": "2309372510769300000000000000000000",
        "receivable": "2309372510769300000000000000000000"
    }
    ```

<br />

3. ### _Account Pending Blocks_
    ```ts
    const nano_address = "nano_1111111111111111111111111111111111111111111111111117353trpda";
    const pending_blocks = await nanojs.get_pending_blocks(nano_address);

    console.log(pending_blocks);
    ```

    ```bash
    {
        "blocks": [
            "0EF695810BEC8B4AE3DC217DA495885A42956456A4B168C0B788ADB17A5ED7F4",
            "142A538F36833D1CC78B94E11C766F75818F8B940771335C6C1B8AB880C5BB1D",
            "1AAE335A94C5DA1E4E1D0B45C3B100CCA241CC5BC557E24BB367C779D55E3A0C",
            "1F04048431842B8875CD0040B9F2B2AAC2E8B88A0256D11E7AE6769F4DF2B61A",
            "20D5D6EA5CA355B11A0E3C11A74FBB4E91D126F4B3FD97232945D451A621E6F7"
        ],
    }
    ```

<br />

4. ### _Receive Pending Blocks_
    ```ts
    const account_private_key = "40C146373BF03EF2D62E067D38A5E6BDE2B511B5C90A99C62B6F7C3D321DDEAC";
    const pending_block_hash = "20D5D6EA5CA355B11A0E3C11A74FBB4E91D126F4B3FD97232945D451A621E6F7";
    const { error, hash } = receive_pending_block(
        account_private_key,
        pending_block_hash,
        RPC_Node_URL.NANOS,
    );

    console.log({ error, hash });
    ```

    ```bash
    {
        error: undefined,
        hash: "142A538F36833D1CC78B94E11C766F75818F8B940771335C6C1B8AB880C5BB1D"
    }
    ```

<br />

5. ### _Send XNO_
    ```ts
    const sender_private_key = "40C146373BF03EF2D62E067D38A5E6BDE2B511B5C90A99C62B6F7C3D321DDEAC";
    const receiver_address = "nano_1trd73o8z76wnnwmuq6y5pe6r396p7m7qf5zufrox9uk3io8foyd8mowgxu3";
    const amount_xno = "10.31";

    const { error, hash } = await send_xno(sender_private_key, receiver_address, amount_xno, RPC_Node_URL.RAINSTROM);

    console.log({ error, hash });
    ```

    ```bash
    {
        hash: "142A538F36833D1CC78B94E11C766F75818F8B940771335C6C1B8AB880C5BB1D"
    }
    ```

<br />

</details>


<details>
<summary><b>Wallet</b></summary>

1. ### _Create Wallet_
    ```ts
    const wallet1 = await create_wallet({ });
    const wallet2 = await create_wallet({ seed: "5b4b36a524c213a1ef891af31dc5b3071c59c12e36b7fe14f692052b2ea9c74a", till_index: 2 });
    ```

    ```bash
    { # wallet1
        seed: "a4eb1443df8cb67d7b3a869412e8f9c89734962df0711af344a9e7c44afb145e",
        accounts: [
            {
                index: 0,
                private_key: "E4A3C94BBD0592070661002E253DDAD5B1345801AFC3175DBDCE923CB6FEEAEC",
                public_key: "C7537142ED0ADE795D6B73008B24A9BD31A09E477A83BCB9B7A6B0B3A7EB5418",
                address: "nano_3jtmg73gt4pyh7gppwr1jekcmhbjn4h6gyn5qkwuhboipgmypo1rdzbbadxa"
            }
        ]
    }

    { # wallet2
        seed: "5b4b36a524c213a1ef891af31dc5b3071c59c12e36b7fe14f692052b2ea9c74a",
        accounts: [
            {
                index: 0,
                private_key: "5C7F0183303876298751DF2482F1DB6DF27C789E1EEE42598B9BAD35B12130D2",
                public_key: "2BF49EAF6AEF19BCFEBF40A05D7782838957C212CE3AC1B441023A5029DDA4E0",
                address: "nano_1cznmtqpoursqmzdyi71dour71wbcz337mjtr8t641jtc1nxub915abj3pcm"
            },
            {
                index: 1,
                private_key: "325A1C6B0AC52350BD4DE2A15965753DB397E278DDE4A377346916A8DB7C8496",
                public_key: "4ADDA484090D7B14B24EE56B86D7DAB1F8694FE7E18133317C126DBD5A5AD121",
                address: "nano_1kpxnk41k5du4ks6xsddiudxoehrf79yhre38erqr6mfqof7onb3om5hdqax"
            },
            {
                index: 2,
                private_key: "5B573170C262F3243305880F385B61A20AA5C66757F55A76E51DCD5B4EF2C66C",
                public_key: "D8818A1D542976846759F2EE6A5D90D174BA089049B42961EC4FC2663BA92732",
                address: "nano_3p63jagoacdpijmomwqgfbgs3ndnqa6b1kfn77iyrmy4erxtkbskfws7pujn"
            }
        ]
    }
    ```

<br />

</details>

<details>
<summary><b>Block</b></summary>

1. ### _Block Information_
    ```ts
    const hash = "87434F8041869A01C8F6F263B87972D7BA443A72E0A97D7A3FD0CCC2358FD6F9";
    const info = await nanojs.get_block_info(hash);

    console.log(info);
    ```

    ```bash
    {
        "block_account": "nano_1ipx847tk8o46pwxt5qjdbncjqcbwcc1rrmqnkztrfjy5k7z4imsrata9est",
        "amount": "30000000000000000000000000000000000",
        "balance": "5606157000000000000000000000000000000",
        "height": "58",
        "local_timestamp": "0",
        "successor": "8D3AB98B301224253750D448B4BD997132400CEDD0A8432F775724F2D9821C72",
        "confirmed": "true",
        "contents": {
            "type": "state",
            "account": "nano_1ipx847tk8o46pwxt5qjdbncjqcbwcc1rrmqnkztrfjy5k7z4imsrata9est",
            "previous": "CE898C131AAEE25E05362F247760F8A3ACF34A9796A5AE0D9204E86B0637965E",
            "representative": "nano_1stofnrxuz3cai7ze75o174bpm7scwj9jn3nxsn8ntzg784jf1gzn1jjdkou",
            "balance": "5606157000000000000000000000000000000",
            "link": "5D1AA8A45F8736519D707FCB375976A7F9AF795091021D7E9C7548D6F45DD8D5",
            "link_as_account": "nano_1qato4k7z3spc8gq1zyd8xeqfbzsoxwo36a45ozbrxcatut7up8ohyardu1z",
            "signature": "82D41BC16F313E4B2243D14DFFA2FB04679C540C2095FEE7EAE0F2F26880AD56DD48D87A7CC5DD760C5B2D76EE2C205506AA557BF00B60D8DEE312EC7343A501",
            "work": "8a142e07a10996d5"
        },
        "subtype": "send",
    }
    ```

<br />

2. ### _Publish Block_
    ```ts
    import nanocurrency from "nanocurrency";

    const block_data = {}; // block data
    const account_private_key = "my-account-private-key";

    const { block } = nanocurrency.createBlock(account_private_key, block_data);
    const publish_block = await nanojs.publish_block(block);

    console.log(publish_block);
    ```

    ```bash
    {
        "hash": "87434F8041869A01C8F6F263B87972D7BA443A72E0A97D7A3FD0CCC2358FD6F9"
    }
    ```

<br />

</details>

<details>
<summary><b>Work</b></summary>

1. ### _Work Generate_
    ```ts
    const hash = "87434F8041869A01C8F6F263B87972D7BA443A72E0A97D7A3FD0CCC2358FD6F9";
    const work = await nanojs.work_generate(hash);

    console.log(work);
    ```

    ```bash
    {
        "difficulty": string,
        "multiplier": string,
        "work": string,
        "hash": string,
        "error": undefined
    }
    ```

<br />

</details>

<details>
<summary><b>Conversions</b></summary>

1. ### _XNO to RAW_
    ```ts
    const xno = "1.21";
    const raw = nanojs.xno_to_raw(xno);

    console.log(raw);
    ```

    ```bash
    "1210000000000000000000000000000"
    ```

<br />

2. ### _RAW to XNO_
    ```ts
    const raw = "1.21";
    const xno = nanojs.raw_to_xno(raw);

    console.log(xno);
    ```

    ```bash
    "1.5023"
    ```

</details>

<br/>

# _**license**_

MIT
