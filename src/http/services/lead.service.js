import {myAxios} from "../axios";
import {environment} from "../../environment/environment";

// 2 possible values [step2 & step3]
// This is will decide that
// which address will be sent to server upon creation of lead.
export const currentActivatedAddressForHomeInsurance = "step2"

export const getLeadList = (payload) => {
  return myAxios.post(environment.api_endpoint + "/agents", payload)
}

export const storeOrUpdateLead = (payload) => {
  return myAxios.post(environment.api_endpoint + "/agents", payload)
}

export const saveLeadAsDraft = (payload) => {
  return myAxios.post(environment.api_endpoint + "/agents", payload)
}

export const getLeadDetails = (payload) => {
  return myAxios.post(environment.api_endpoint + "/agents", payload)
}
