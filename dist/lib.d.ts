import { SignTransactionArgs, Transport, SignTransactionResponse, GetAddressResponse, GetAppVersionResponse, GetAppNameResponse } from "./types";
/**
 * Mina App API
 */
export declare class MinaLedgerJS {
    transport: Transport;
    constructor(transport: Transport, scrambleKey?: string);
    protected pad(n: number | string, width?: number, paddingValue?: number | string): string;
    protected asciiToHex(str: string): string;
    protected convertMemo(memo: string): string;
    protected createTXApdu({ txType, senderAccount, senderAddress, receiverAddress, amount, fee, nonce, validUntil, memo, networkId, }: SignTransactionArgs): string;
    /**
     * Get Mina address for a given account number.
     *
     * @param account int of the account number
     * @param display optionally enable or not the display
     * @return an object with a publicKey
     * @example
     * const result = await Mina.getAddress(1);
     * const { publicKey, returnCode } = result;
     */
    getAddress(account?: number): Promise<GetAddressResponse>;
    signTransaction({ txType, senderAccount, senderAddress, receiverAddress, amount, fee, nonce, validUntil, memo, networkId, }: SignTransactionArgs): Promise<SignTransactionResponse>;
    /**
     * get the version of the Mina app installed on the hardware device
     * the version is returned from the installed app.
     *
     * @return an object with a version
     */
    getAppVersion(): Promise<GetAppVersionResponse>;
    /**
     * get the name and version of the Mina app installed on the hardware device
     * it can be used to ping the app and know the name of the running app.
     * The name and version is returned from the Ledger firmware.
     *
     * @return an object with an app name and version
     */
    getAppName(): Promise<GetAppNameResponse>;
}
