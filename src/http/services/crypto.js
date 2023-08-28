//converting congnitoId in base64 format.
import {Buffer} from "buffer";
import * as CryptoJS from 'crypto-js';
import * as crypto from "crypto-browserify";
import {environment} from "../../environment/environment";

export function getBase64String(plainText) {
  return Buffer.from(plainText.toString()).toString('base64');
}

//encrypting the payload body.
export function getEncryptedBody(cognitoId, plainText) {
  const {key, iv, encodedUuid} = createPayloadKeys(cognitoId, environment.encryption.key.payload);
  return encryptPayload(plainText, {key, iv, encodedUuid});
}

//decrypting the payload body.
export function getDecryptedBody(cognitoId, encryptedText) {
  const {key, iv, encodedUuid} = createPayloadKeys(cognitoId, environment.encryption.key.payload);
  return decryptPayload(encryptedText, {key, iv, encodedUuid})
}

//create MD5 hash using congitoId and encryptSecretKey.
export function createPayloadKeys(cognitoId, encryptionKey) {
  let encryptSecretKey = encryptionKey
  let uuidSimple = cognitoId.toString().replace(/-/g, '');
  let mdString = crypto.createHash('md5').update(Buffer.from((uuidSimple + encryptSecretKey)).toString("ASCII"), 0, (uuidSimple.length + encryptSecretKey.length)).digest('hex');
  let key = CryptoJS.enc.Utf8.parse(mdString.substring(0, 16));
  let iv = CryptoJS.enc.Utf8.parse(mdString.substring(16));
  let encodedUuid = Buffer.from(cognitoId.toString()).toString('base64');
  return {key, iv, encodedUuid}
}

//converting text to Encryption.
export function encryptPayload(textToEncrypt, keyData) {
  let encrypted = CryptoJS.AES.encrypt(textToEncrypt, keyData.key, {
    keySize: 128 / 8,
    iv: keyData.iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

//converting text to Decryption.
export function decryptPayload(textToDecrypt, keyData) {
  let decrypted = CryptoJS.AES.decrypt(textToDecrypt, keyData.key, {
    keySize: 128 / 8,
    iv: keyData.iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// -----------------------------------

//encrypting the chat body.
export function getEncryptedChatMessage(cognitoId, plainText) {
  const {key, iv} = createChatPayloadKeys(cognitoId, environment.encryption.key.chat);
  return encryptChatPayload(plainText, {key, iv});
}

//decrypting the chat body.
export function getDecryptedChatMessage(cognitoId, encryptedText) {
  const {key, iv} = createChatPayloadKeys(cognitoId, environment.encryption.key.chat);
  return decryptChatPayload(encryptedText, {key, iv})
}

//create MD5 hash using congitoId and encryptSecretKey.
export function createChatPayloadKeys(cognitoId, encryptionKey) {
  let encryptSecretKey = encryptionKey
  let mdString = crypto.createHash('md5').update(Buffer.from((encryptSecretKey)).toString("ASCII"), 0, encryptSecretKey.length).digest('hex');
  let key = CryptoJS.enc.Utf8.parse(mdString.substring(0, 16));
  let iv = CryptoJS.enc.Utf8.parse(mdString.substring(16));
  return {key, iv}
}

//converting text to Encryption.
export function encryptChatPayload(textToEncrypt, keyData) {
  let encrypted = CryptoJS.AES.encrypt(textToEncrypt, keyData.key, {
    keySize: 128 / 8,
    iv: keyData.iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

//converting text to Decryption.
export function decryptChatPayload(textToDecrypt, keyData) {
  let decrypted = CryptoJS.AES.decrypt(textToDecrypt, keyData.key, {
    keySize: 128 / 8,
    iv: keyData.iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
