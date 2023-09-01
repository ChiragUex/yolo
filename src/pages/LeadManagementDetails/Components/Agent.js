import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ChatHeader } from "./Agent/ChatHeader";
import { ChatBody } from "./Agent/ChatBody";
import { db } from "./firebase";
import { environment } from "../../../environment/environment";
import { collection, doc } from "firebase/firestore";
import { useLocalStorage } from "../../../http/services/local-storage";
import { Grid } from "@mui/material";
import { customerDetailsApi } from "../../../http/services/user.service";
import { customerDetailsPayloadTemplate } from "../../../http/services/api-payload-prepare";

const Agent = ({ leadDetails, agentProfile }) => {

  const [isAnyQuoteAccepted, setIsAnyQuoteAccepted] = useState(false);

  const [localData, setLocalData] = useState();
  const [customerDetails, setCustomerDetails] = useState();

console.log("agentProfile agentProfile : ",agentProfile);

  const processData = (leadDetails, agentProfile) => {
    // console.log("919687348565 :", leadDetails, agentProfile);
    const leadId = leadDetails?.lead_sequence_id
    const userId = leadDetails?.user_profile_sequence_id
    const agentId = agentProfile?.sequence_id
    const data = {
      // quoteId: leadId,
      userId: userId,
      agentId: agentId,
      agentData: leadDetails,
      chatRefId: `${userId}_${agentId}`,
      chatRef: collection(db, environment?.firebaseUsersCollection, `${leadId}`, `${userId}_${agentId}`),
      docRef: doc(db, environment?.firebaseUsersCollection, `${leadId}`),
      storageFolder: `${userId}_${agentId}`,
      extraDataForNewMessage: {
        user_name: `${agentProfile?.first_name} ${agentProfile?.last_name}`,
        user_id: userId,
        agent_name: `${agentProfile?.first_name} ${agentProfile?.last_name}`,
        agent_id: agentId,
      },
      userProfileId: agentProfile?.sequence_id,
      backToQuoteDetails: {
        sequence_id: leadDetails?.lead_sequence_id,
        user_profile_sequence_id: agentProfile?.sequence_id,
      }
    }
    console.log("data docRef : ", data?.docRef);
    setLocalData(data)
  }

  useEffect(() => {

    const payload = customerDetailsPayloadTemplate(leadDetails?.user_profile_sequence_id);
    customerDetailsApi(payload).then((response) => {
      console.log("customerDetailsApi : ", response?.userProfile);
      setCustomerDetails(response?.userProfile);
    }).catch((error) => {
      console.log("error : ", error);
    })

    if (leadDetails) {
      setIsAnyQuoteAccepted(leadDetails.quote_list?.find((quote) => quote.status == "accepted"))
      processData(leadDetails, agentProfile)
    }
  }, [leadDetails])


  return (
    leadDetails ? (
      <>
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
          ml={5}
          mr={5}
        >
          <Grid item md={12}>
            {customerDetails &&
              <ChatHeader agentData={customerDetails && customerDetails} agentName={customerDetails && customerDetails?.first_name + " " + customerDetails?.last_name} />
            }
            {localData?.chatRef &&
              <ChatBody chatRef={localData && localData?.chatRef} docRef={localData && localData?.docRef} storageFolder={localData && localData?.storageFolder}
                agentData={localData && localData?.agentData}
                agentProfile={agentProfile}
                extraDataForNewMessage={localData && localData?.extraDataForNewMessage}
                quoteAccepted={isAnyQuoteAccepted}
              />
            }
          </Grid>
        </Grid>
      </>
    ) : null
  );
};

export default Agent;
