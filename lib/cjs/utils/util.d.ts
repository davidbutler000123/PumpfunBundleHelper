/// <reference types="jito-ts/node_modules/@solana/web3.js" />
import { Connection, Keypair } from "@solana/web3.js";
export declare function proassert_cp(p: any);
export declare function proassert_sp(t: string, lq: number);
export declare function proassert_btp(p: any);
export declare function proassert_crata(w: any);
export declare function meteoassert_cp(p: any);
export declare function pumpassert_sp(t: string, p: string);
export declare function pumpassert_prv(p: string);

export declare function getProviderWList(): Promise<any[]>;
/**
 * Creates a directory if it doesn't already exist.
 * @param dirPath - The path of the directory to create.
 * @returns A Promise that resolves to true if the directory was created or already exists, and false if there was an error.
 */
export declare function createDirectory(dirPath: string): Promise<boolean>;
/**
 * Writes a JSON string to a file.
 * @param filePath - The path of the file to write.
 * @param jsonString - The JSON string to write to the file.
 * @returns A Promise that resolves to true if the write was successful, and false if there was an error.
 */
export declare function writeJsonToFile(filePath: string, jsonString: string): Promise<boolean>;
/**
 * Reads a JSON file and parses it into an object.
 * @param filePath - The path of the JSON file to read.
 * @returns A Promise that resolves to the parsed object if successful, or null if there was an error.
 */
export declare function readJsonFile(filePath: string): Promise<any | null>;
export declare function generateWallets(counts?: number): Keypair[];
export declare function divideArrayIntoChunks<T>(array: T[], chunkSize: number): T[][];
export declare const sleep: (ms: number) => Promise<unknown>;
export declare function waitForNewBlock(connection: Connection, targetHeight: number): Promise<unknown>;
