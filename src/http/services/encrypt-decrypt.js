import {getBase64String, getEncryptedBody, getDecryptedBody} from "./crypto";

export function encryptPayload(payload) {
  const cognitoIdEnc = getBase64String(payload.header.created_by);
  //stringify the payload
  const payload_stringify = JSON.stringify(payload).toString();
  const payload_createdId = payload.header.created_by;
  const encrypted_Payload = getEncryptedBody(payload_createdId, payload_stringify);
  return {
    "headers": {"x-shyld-app-id": cognitoIdEnc},
    "body": encrypted_Payload.toString()
  }
}

export function decryptResponse(createdBy, responseData) {
  return getDecryptedBody(createdBy, responseData);
}
