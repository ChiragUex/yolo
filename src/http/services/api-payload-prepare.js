export const createAgentAccountPayloadTemplate = (formData) => {
  return {
    header: {
      message_uuid: '',
      correlation_uuid: '',
      message_name: 'agent_profile-C',
      message_type: 'Q',
      request_id: '',
      version: '1.0',
      service_completion_status_code: '',
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
      origin: "*",
    },
    body: {
      agent_Profile: formData?.agent_Profile,
      agent_license: formData?.agent_license,
      agent_affiliation: formData?.agent_affiliation,
    }
  }
}

export const agentQuoteRequestPayloadTemplate = (searchData) => {
  return {
    header: {
      message_uuid: '',
      correlation_uuid: '',
      message_name: 'agent_lead_requested-R',
      message_type: 'Q',
      request_id: '',
      version: '1.0',
      service_completion_status_code: '',
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
      origin: "*",
    },
    body: {
      start: 0,
      limit: 10,
      search: searchData?.search,
      start_date: searchData?.startDate,
      end_date: searchData?.endDate,
      insurance_type: searchData?.insurance_type,
      lead_priority: searchData?.lead_priority
    }
  }
}


export const agentQuoteProvidedPayloadTemplate = (searchData) => {
  return {
    header: {
      message_uuid: '',
      correlation_uuid: '',
      message_name: 'agent_lead_quote_provided-R',
      message_type: 'Q',
      request_id: '',
      version: '1.0',
      service_completion_status_code: '',
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
      origin: "*",
    },
    body: {
      start: 0,
      limit: 10,
      search: searchData?.search,
      start_date: searchData?.startDate,
      end_date: searchData?.endDate,
      insurance_type: searchData?.insurance_type,
      lead_priority: searchData?.lead_priority
    }
  }
}


export const agentWonLossInactivePayloadTemplate = (searchData) => {
  return {
    header: {
      message_uuid: '',
      correlation_uuid: '',
      message_name: 'agent_lead_won-R',
      message_type: 'Q',
      request_id: '',
      version: '1.0',
      service_completion_status_code: '',
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
      origin: "*",
    },
    body: {
      start: 0,
      limit: 10,
      search: searchData?.search,
      start_date: searchData?.startDate,
      end_date: searchData?.endDate,
      insurance_type: searchData?.insurance_type,
      lead_priority: searchData?.lead_priority
    }
  }
}

export const customerDetailsPayloadTemplate = (customerId) => {
  return {
    header: {
      message_uuid: '',
      correlation_uuid: '',
      message_name: 'user_details-R',
      message_type: 'Q',
      request_id: '',
      version: '1.0',
      service_completion_status_code: '',
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
      origin: "*",
    },
    body: {
      user_profile_sequence_id : customerId
    }
  }
}

export const agentLeadDetailsPayloadTemplate = (sequenceId) => {
  return {
    header: {
      message_uuid: '',
      correlation_uuid: '',
      message_name: 'agent_lead_details-R',
      message_type: 'Q',
      request_id: '',
      version: '1.0',
      service_completion_status_code: '',
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
    },
    body: {
      lead_sequence_id: sequenceId,
      cognito_user_id: localStorage.getItem('authCognitoId'),
    },
  }
}

export const submitaQuotePayloadTemplate = (data) => {
  return {
    header: {
      message_uuid: '',
      correlation_uuid: '',
      message_name: 'submit_quote-C',
      message_type: 'Q',
      request_id: '',
      version: '1.0',
      service_completion_status_code: '',
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
      origin: "*",
    },
    body: {
      sequence_id: 0,
      user_profile_sequence_id: data?.userSequenceId,
      lead_sequence_id: data?.sequenceId,
      insurance_carrier: data.insurance_carrier,
      term: data.term,
      term_measure: data.term_measure,
      validity: data.validity,
      validity_measure: data.validity_measure,
      documents_loc: data?.documents_loc,
      total_amount: data.total_amount,
      cognito_user_id: localStorage.getItem('authCognitoId'),
    },
  }
};


export const updateaQuotePayloadTemplate = (data) => {
  return {
    header: {
      message_uuid: '',
      correlation_uuid: '',
      message_name: 'update_quote-U',
      message_type: 'Q',
      request_id: '',
      version: '1.0',
      service_completion_status_code: '',
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
      origin: "*",
    },
    body: {
      sequence_id: data?.lead_quote_id,
      user_profile_sequence_id: data?.userSequenceId,
      lead_sequence_id: data?.sequenceId,
      insurance_carrier: data.insurance_carrier,
      term: data.term,
      term_measure: data.term_measure,
      validity: data.validity,
      validity_measure: data.validity_measure,
      documents_loc: data?.documents_loc,
      total_amount: data.total_amount,
      cognito_user_id: localStorage.getItem('authCognitoId'),
    },
  }
};


export const getInsuranceTypePayloadTemplate = (data) => {
  return {
    header: {
      message_uuid: '',
      correlation_uuid: '',
      message_name: 'insurance_type-R',
      message_type: 'Q',
      request_id: '',
      version: '1.0',
      service_completion_status_code: '',
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
      origin: "*",
    },
    body: {
      cognito_user_id: localStorage.getItem('authCognitoId'),
    },
  }
};


export const markAsPurchasePayloadTemplate = (data) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "update_quote-MP",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
      origin: "*",
    },
    body: data
  }
}


export const sendPaymentLinkPayloadTemplate = (data) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "send_payment_link-C",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: '2020-01-01000000.000',
      origin: "*",
    },
    body : data
}}

export const updateQuotePriorityPayloadTemplate = (data) => {
  return {
header: {
  message_uuid: '',
  correlation_uuid: '',
  message_name: 'agent_lead_priority-U',
  message_type: 'Q',
  request_id: '',
  version: '1.0',
  service_completion_status_code: '',
  created_by: localStorage.getItem('authCognitoId'),
  created_timestamp: '2020-01-01000000.000',
  origin: "*",
},
body: data
}}


export const getAgentProfileDetailsPayloadTemplate = (email) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "agent_profile-R",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000"
    },
    body: {
      cognito_user_id: localStorage.getItem('authCognitoId'),
    }
  };
}

export const updateAgentProfilePersonalDetailsPayloadTemplate = (agentPersonalDetails) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "agent_profile-U",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000"
    },
    body: agentPersonalDetails
  };
}


export const updateAgentProfileLicenseDetailsPayloadTemplate = (agentLicenseDetails) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "update_licence-U",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000"
    },
    body: agentLicenseDetails
  };
}


export const updateAgentProfileAffiliationDetailsPayloadTemplate = (affiliationProfileUpdateDetails) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "update_affiliation-U",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000"
    },
    body: affiliationProfileUpdateDetails
  };
}

export const updateProfilePicturePayloadTemplate = (profilePicture) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "agent_profile_picture-U",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000"
    },
    body: {
      cognito_user_id: localStorage.getItem('authCognitoId'),
      profile_picture: profilePicture
    }
  };
}






export const getDashboardStatsPayloadTemplate = () => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "user_dashboard-R",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000",
    },
    body: {
      cognito_user_id: localStorage.getItem('authCognitoId'),
    },
  }
}

export const getUserLeadListPayloadTemplate = () => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "user_lead_list-R",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000",
    },
    body: {
      cognito_user_id: localStorage.getItem('authCognitoId'),
    },
  }
}

export const getUserLeadStoreOrUpdatePayloadTemplate = (id, insuranceType, leadDetails, otherData) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "user_lead-C",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000",
    },
    body: {
      sequence_id: id || 0,
      cognito_user_id: localStorage.getItem('authCognitoId'),
      insurance_type: insuranceType,
      city: otherData.city,
      state: otherData.state,
      status: otherData.status,
      zip: otherData.zip,
      lead_details: leadDetails,
    },
  }
}

export const getUserLeadDetailsPayloadTemplate = (id) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "user_lead-R",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000",
    },
    body: {
      sequence_id: Number(id),
      cognito_user_id: localStorage.getItem('authCognitoId'),
    },
  };
}

export const getAssignedAgentListPayloadTemplate = (sequence_id) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "user_lead_assigned_agents-R",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000",
    },
    body: {
      lead_id: sequence_id,
      cognito_user_id: localStorage.getItem('authCognitoId'),
    },
  }
}

export const getAgentQuoteListPayloadTemplate = (leadSequenceId, agentProfileId) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "view_lead_agent_quote-R",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000",
    },
    body: {
      lead_sequence_id: leadSequenceId,
      agent_profile_sequence_id: agentProfileId,
      cognito_user_id: localStorage.getItem('authCognitoId'),
    },
  };
}

export const getAcceptQuotePayloadTemplate = (quoteId, agent_profile_sequence_id, lead_sequence_id, user_profile_sequence_id) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "submit_quote-A",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000",
    },
    body: {
      quote_sequence_id: quoteId,
      agent_profile_sequence_id: agent_profile_sequence_id,
      lead_sequence_id: lead_sequence_id,
      user_profile_sequence_id: user_profile_sequence_id,
    },
  };
}

export const createAccountPayloadTemplate = (formData) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "user_profile-C",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000",
    },
    body: {
      cognito_user_id: localStorage.getItem('authCognitoId'),
      dob: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      has_kids: "",
      marital_status: "",
      has_pets: "",
      assets_owned: "",
      policies_owned: "",
      ...formData
    },
  };
}

export const getProfileDetailsPayloadTemplate = (email) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "agent_profile-registrationvalidate-R",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000"
    },
    body: {
      cognito_user_id: localStorage.getItem('authCognitoId'),
      email: email
    }
  };
}

export const getDashboardDataPayloadTemplate = (searchData) => {
  return {
header: {
  message_uuid: '',
  correlation_uuid: '',
  message_name: 'agent_dashboard-R',
  message_type: 'Q',
  request_id: '',
  version: '1.0',
  service_completion_status_code: '',
  created_by: localStorage.getItem('authCognitoId'),
  created_timestamp:  "2020-01-01000000.000"
},
body: {
  start_date: searchData?.startDate  || '' ,
  end_date: searchData?.endDate || '',
  insurance_type: searchData?.insurance_type || '',
  lead_priority: searchData?.lead_priority || '',
},
};
}


export const updateProfileDetailsPayloadTemplate = (formData) => {
  return {
    header: {
      message_uuid: "",
      correlation_uuid: "",
      message_name: "user_profile-U",
      message_type: "Q",
      request_id: "",
      version: "1.0",
      service_completion_status_code: "",
      created_by: localStorage.getItem('authCognitoId'),
      created_timestamp: "2020-01-01000000.000",
    },
    body: {
      cognito_user_id: localStorage.getItem('authCognitoId'),
      dob: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      has_kids: "",
      marital_status: "",
      has_pets: "",
      assets_owned: "",
      policies_owned: "",
      ...formData
    },
  };
}
