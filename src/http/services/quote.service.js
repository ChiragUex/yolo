import {myAxios} from "../axios";
import {environment} from "../../environment/environment";

export const getAssignedAgentListApi = (payload) => {
  return myAxios.post(environment.api_endpoint + "/agents", payload)
}

export const getAgentQuoteListApi = (payload) => {
  return myAxios.post(environment.api_endpoint + "/agents", payload)
}

export const acceptQuoteApi = (payload) => {
  return myAxios.post(environment.api_endpoint + "/agents", payload)
}

export const dashboardStatsApi = (payload) => {
  return myAxios.post(environment.api_endpoint + "/users", payload)
}
