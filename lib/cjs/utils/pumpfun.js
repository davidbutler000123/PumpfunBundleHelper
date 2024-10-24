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
} = require('@solana/web3.js')

// FOR PUMPFUN CONFIGURE
const PROGRAM_ID = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
const GLOBAL_ACCOUNT = new PublicKey('4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf') // fixed
const MPL_TOKEN_METADATA = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
const RENT_ACCOUNT = new PublicKey('SysvarRent111111111111111111111111111111111');
const FEE_RECIPIENT = "CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM";
const EVENT_AUTH = "Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1";
const TOKEN_PROGRAM_ACCOUNT = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const EVENT_AUTH_ACCOUNT = new PublicKey('Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1');
const SYSTEM_PROGRAM_ACCOUNT = new PublicKey('11111111111111111111111111111111');


async function getBondingCurve(tokenMint, programId) {
    const seedString = 'bonding-curve'

    const [PDA, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(seedString), tokenMint.toBuffer()],
        programId
    )

    return new PublicKey(PDA)
}

    async function getMetadataAccount(tokenMint) {

        const seedString = "metadata";

        const [PDA, bump] = PublicKey.findProgramAddressSync(
            [Buffer.from(seedString), MPL_TOKEN_METADATA.toBuffer(), tokenMint.toBuffer()],
            MPL_TOKEN_METADATA,
        );

        return new PublicKey(PDA);
    }

async function getMintAuthority(programId) {
    const seedString = 'mint-authority'

    const [PDA, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(seedString)],
        programId
    )

    return new PublicKey(PDA)
}

module.exports = {
    PROGRAM_ID,
    GLOBAL_ACCOUNT,
    TOKEN_PROGRAM_ACCOUNT,
    RENT_ACCOUNT,
    MPL_TOKEN_METADATA,
    FEE_RECIPIENT,
    EVENT_AUTH,
    EVENT_AUTH_ACCOUNT,
    SYSTEM_PROGRAM_ACCOUNT,
    getBondingCurve,
    getMetadataAccount,
    getMintAuthority
};
