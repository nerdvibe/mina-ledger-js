import TransportNodeHid from "@ledgerhq/hw-transport-node-hid-singleton";
import { MinaLedgerJS, Networks, TxType } from "../src/";

const getAppVersion = async (instance: any) => {
  const version = await instance.getAppVersion();
  console.log(version);
};
const getAddress = async (instance: any) => {
  const address = await instance.getAddress(0);
  console.log(address);
};
const getNameVersion = async (instance: any) => {
  const address = await instance.getAppName();
  console.log(address);
};
const getSignature = async (instance: any) => {
  const signature = await instance.signTransaction({
    "senderAccount": 0,
    "senderAddress": "B62qoBEWahYw3CzeFLBkekmT8B7Z1YsfhNcP32cantDgApQ97RNUMhT",
    "receiverAddress": "B62qkEB9FPhBs9mYdPJPVkUevrJuYr22MwANNvavy6HWZEDqL8WKR3F",
    "fee": +"98146290",
    "amount": +"1000000000",
    "memo": "hub <3 ledger!",
    "nonce": 2,
    "txType": 0,
    "networkId": 0,
    "validUntil": "4294967295"
   });
  console.log(signature);
};
const getDelegation = async (instance: any) => {
  const signature = await instance.signTransaction({
    txType: TxType.DELEGATION,
    senderAccount: 0,
    senderAddress: "delegator",
    receiverAddress: "delegatee(perhaps carbonara? ;) )",
    amount: 0,
    fee: 1000000000,
    nonce: 0,
    memo: "delegate-to-carbonara",
    networkId: Networks.DEVNET,
  });
  console.log(signature);
};

(async () => {

  console.log(` 
  
  >> mina-ledger-js usage example on Node:
  
  `)

  const transport = await TransportNodeHid.create();
  const instance = new MinaLedgerJS(transport);
  await getNameVersion(instance);
  await getAppVersion(instance);
  await getAddress(instance);
  await getDelegation(instance);
  await getSignature(instance);
})();
