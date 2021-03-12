# Mina Ledger JS
<p align="center"> 
  <img src="https://westake.club/assets/minaledgerjs.png">
</p>
This package provides a basic client library to communicate with ledger-app-mina running in a Ledger Nano S/X.

## Install

Add the ledger client to your application:

```
yarn add mina-ledger-js
```

and a transporter of your choice. For node: `@ledgerhq/hw-transport-node-hid`

## Usage

```javascript
import { MinaLedgerJS } from "mina-ledger-js";
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";

(async () => {
  const transport = await transportMethod.create();
  const instance = new MinaLedgerJS(transpoort);

  const response = await instance.getAppVersion();
  console.log(`Installed version is ${response.version}`);
})();
```

## API

### `constructor`

Acceptes a transporter and optionally a scramble key. Returns the instance of the MinaLedgerJS.

```javascript
const instance = new MinaLedgerJS(transport);
```

### `getAppVersion`

Returns the installed ledger version.

```javascript
const version = await instance.getAppVersion();
console.log(version);
```

### `getAddress`

Returns the public key for the given account.

```javascript
const address = await instance.getAddress(0);
console.log(address);
```

### `signTransaction`

Signs the transaction for the given transaction.

```javascript
const signature = await instance.signTransaction({
  txType: TxType.PAYMENT,
  senderAccount: 0,
  senderAddress: "B62qoBEWahYw3CzeFLBkekmT8B7Z1YsfhNcP32cantDgApQ97RNUMhT",
  receiverAddress: "B62qoBEWahYw3CzeFLBkekmT8B7Z1YsfhNcP32cantDgApQ97RNUMhT",
  amount: 3000000,
  fee: 1000000000,
  nonce: 1,
  memo: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  networkId: Networks.DEVNET,
});
console.log(signature);
```

## Types

See `src/types.ts`

## License

Copyright 2016-2020 Carbonara

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
