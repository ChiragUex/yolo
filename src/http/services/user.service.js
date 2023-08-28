import {myAxios} from "../axios";
import {environment} from "../../environment/environment";

export const getProfileDetailsApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const getAgentQuoteRequestApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const getLeadsDetailsApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}


export const submitQuoteApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const updateQuoteApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const getAgentProfileApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const getInsuranceTypeApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const markLeadPurchasedApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const sendPaymentLinkApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const updateQuotePriorityApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const getDashboardDataApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const customerDetailsApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const updatePersonalProfileDetailsApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const updateProfilePictureApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const updateLiceseProfileDetailsApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const updateAffiliationProfileDetailsApi = (payload) => {
  return myAxios.post(environment.api_endpoint, payload)
}

export const createAccountApi = (payload) => {
  return myAxios.post(environment.api_endpoint + "/users", payload)
}

export const createAgentAccountApi = (payload) => {

  console.log("data payload : ", payload);
  return myAxios.post(environment.api_endpoint, payload)
}

export const updateProfileDetailsApi = (payload) => {
  return myAxios.post(environment.api_endpoint + "/users", payload)
}
