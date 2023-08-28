import * as CryptoJS from 'crypto-js';
import {environment} from "../../environment/environment";

// export interface AwsSignatureInputDataInterface {
//   method: string;
//   host: string;
//   canonicalUri: string;
//   canonicalQuerystring?: string;
//   requestParameters?: string;
//   contentType?: string;
// }

// export interface AwsSignatureCredential {
//   _accessKey: string,
//   _secretAccessKey: string,
//   _sessionToken: string,
// }

export class AwsSignatureInputData {
  method;
  service;
  host;
  region;
  accessKey;
  secretKey;
  sessionToken;
  canonicalUri;
  canonicalQuerystring = '';
  requestParameters = '';
  contentType = 'application/json; charset=UTF-8';

  constructor(data, awsCred) {
    this.method = data.method;
    this.host = data.host;
    this.region = environment.aws.region;
    this.service = environment.aws.service;
    this.accessKey = awsCred._accessKey;
    this.secretKey = awsCred._secretAccessKey;
    this.sessionToken = awsCred._sessionToken;
    this.canonicalUri = data.canonicalUri;

    this.canonicalQuerystring = '';
   
    if (data.canonicalQuerystring) {
      this.canonicalQuerystring = data.canonicalQuerystring
    }

    this.requestParameters = '';
    if (data.requestParameters) {
      this.requestParameters = data.requestParameters
    }
  }
}

/**
 * Amazon web services (AWS) Signature version 4 - EC2 API requests signing tool.
 * @class AwsSignature
 */
export class AwsSignature {
  constructor() {
  }

  /**
   * Generates the signature
   *
   * @param input - structure with data to be signed and keys
   * @param currentDate - optional parameter to pass custom date
   */
  static generateSignature(input, currentDate = new Date()) {
    if (!input) {
      return {};
    }
    const {canonicalHeaders, dateStamp, amzDate} =
      AwsSignature.prepareCanonicalHeaders(currentDate, input);
    const {canonicalRequest, signedHeaders} =
      AwsSignature.prepareCanonicalRequest(input, canonicalHeaders);
    const {stringToSign, algorithm, credentialScope} =
      AwsSignature.generateStringToSign(dateStamp, input, amzDate, canonicalRequest);
    const signature = AwsSignature.signString(input, dateStamp, stringToSign);
    const authorizationHeader = AwsSignature.generateAuthorizationHeader(
      algorithm, input, credentialScope, signedHeaders, signature);

    return {
      'Content-Type': input.contentType,
      'X-Amz-Date': amzDate,
      'Authorization': authorizationHeader,
      'X-Amz-Security-Token': input.sessionToken
    };
  }

  static generateAuthorizationHeader(algorithm, input, credentialScope, signedHeaders, signature) {
    return algorithm + ' ' + 'Credential=' + input.accessKey + '/'
      + credentialScope + ', ' + 'SignedHeaders=' + signedHeaders
      + ', ' + 'Signature=' + signature;
  }

  static signString(input, dateStamp, stringToSign) {
    const signingKey = AwsSignature.getSignatureKey(input.secretKey, dateStamp, input.region, input.service);
    return CryptoJS.HmacSHA256(stringToSign, signingKey).toString();
  }

  static generateStringToSign(dateStamp, input, amzDate, canonicalRequest) {
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = dateStamp + '/' + input.region + '/' + input.service + '/' + 'aws4_request';
    const stringToSign = algorithm + '\n' + amzDate + '\n' + credentialScope + '\n' + CryptoJS.SHA256(canonicalRequest).toString();
    return {stringToSign, algorithm, credentialScope};
  }

  static prepareCanonicalRequest(input, canonicalHeaders) {
    const signedHeaders = 'content-type;host;x-amz-date';
    const payloadHash = CryptoJS.SHA256(input.requestParameters).toString();
    const canonicalRequest = input.method + '\n' + input.canonicalUri + '\n'
      + input.canonicalQuerystring + '\n' + canonicalHeaders + '\n'
      + signedHeaders + '\n' + payloadHash;

    return {canonicalRequest, signedHeaders};
  }

  static prepareCanonicalHeaders(currentDate, input) {
    const amzDate = currentDate.toISOString().replace(/-|:|\..{3}/g, '');
    const dateStamp = amzDate.substr(0, 8);
    const canonicalHeaders = 'content-type:' + input.contentType + '\n' + 'host:'
      + input.host + '\n' + 'x-amz-date:' + amzDate + '\n';

    return {canonicalHeaders, dateStamp, amzDate};
  }

  static getSignatureKey(key, dateStamp, regionName, serviceName) {
    const kDate = CryptoJS.HmacSHA256(dateStamp, "AWS4" + key);
    const kRegion = CryptoJS.HmacSHA256(regionName, kDate);
    const kService = CryptoJS.HmacSHA256(serviceName, kRegion);
    const kSigning = CryptoJS.HmacSHA256("aws4_request", kService);
    return kSigning;
  }
}
