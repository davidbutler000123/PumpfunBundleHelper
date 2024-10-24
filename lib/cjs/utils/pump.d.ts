import {
    Connection,
    Keypair,
    PublicKey,
    VersionedTransaction
} from "@solana/web3.js"

export declare const createPumpfunBuyInst: (
    connection: Connection,
    buyer: Keypair, 
    tokenMint: PublicKey
) => Promise<any>

export declare const createPumpfunTokenAccountInst: (
    connection: Connection,
    buyer: Keypair, 
    tokenMint: PublicKey
) => Promise<any>

export declare const createPumpfunMintInst: (
    connection: Connection,
    name: String,
    symbol: String,
    meta_uri: String,
    payer: Keypair, 
    tokenMint: PublicKey
) => Promise<any>

export declare const bundleTransactions: (
    connection: Connection,
    txns: VersionedTransaction[],
    tokenMint: PublicKey,
    totalAmount: Number
) => Promise<any>