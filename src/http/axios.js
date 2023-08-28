import axios from 'axios'
import {decryptResponse, encryptPayload} from "./services/encrypt-decrypt";
import {AwsSignature, AwsSignatureInputData} from "./services/aws-signature";

// Add a request interceptor
axios.interceptors.request.use(
  request => {
    let createdBy = null;
    if (request.method.toUpperCase() === "GET") {
      // Todo: In future we need to do encryption on payload/params of GET API call.
    } else if (request.method.toUpperCase() === "POST") {
      createdBy = request.data.header.created_by
      let awsCred = localStorage.getItem('authAwsCred');
     
      const encryptedBody = encryptPayload(request.data)
      request.headers.created_by = createdBy;
      let headers = {}
      let domainDetails = new URL(request.url)
      if (awsCred) {
        awsCred = JSON.parse(awsCred)
        const opts = {
          method: 'POST',
          host: domainDetails.host,
          canonicalUri: domainDetails.pathname,
          requestParameters: JSON.stringify(encryptedBody)
        }
       
        headers = AwsSignature.generateSignature(new AwsSignatureInputData(opts, awsCred))
        request.headers = {...request.headers, ...headers}
      }
      request.data = encryptedBody
    }
    return request
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    let createdBy = response.config.headers.created_by
    let res = decryptResponse(createdBy, response.data.body);
    return JSON.parse(res);
  },
  function (error) {
    return Promise.reject(error)
  }
)

export {axios as myAxios};
