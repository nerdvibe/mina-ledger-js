import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
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
    txType: TxType.PAYMENT,
    senderAccount: 0,
    senderAddress: "B62qoBEWahYw3CzeFLBkekmT8B7Z1YsfhNcP32cantDgApQ97RNUMhT",
    receiverAddress: "B62qoBEWahYw3CzeFLBkekmT8B7Z1YsfhNcP32cantDgApQ97RNUMhT",
    amount: 3000000,
    fee: 1000000000,
    nonce: 1,
    memo: "any text up to 32 char",
    networkId: Networks.DEVNET,
  });
  console.log(signature);
};
const getDelegation = async (instance: any) => {
  const signature = await instance.signTransaction({
    txType: TxType.DELEGATION,
    senderAccount: 0,
    senderAddress: "delegator",
    receiverAddress: "delegatee",
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
