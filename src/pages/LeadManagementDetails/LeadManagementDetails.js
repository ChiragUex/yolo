import { Box, Button, Card, Grid, MenuItem, Popper, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { agentLeadDetailsPayloadTemplate, getAgentProfileDetailsPayloadTemplate, updateQuotePriorityPayloadTemplate } from "../../http/services/api-payload-prepare";
import { getAgentProfileApi, getLeadsDetailsApi, updateQuotePriorityApi } from "../../http/services/user.service";
import CustomerLeadDetails from "./Components/CustomerLeadDetails";
import SubmitQuoteForm from "./Components/SubmitQuoteForm";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { enqueueSnackbar } from "notistack";
import Agent from "./Components/Agent";
import { useLocalStorage } from "../../http/services/local-storage";
import AddIcon from '@mui/icons-material/Add';

const LeadManagementDetails = () => {

    const [leadDetails, setLeadDetails] = useState();
    const [activeTab, setActiveTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [priorityStatus, setPriorityStatus] = useState("0");
    const [agentProfile, setAgentProfile] = useState();
    const [refetchQuotes, setRefetchQuotes] = useState(false);
    const [submitQuoteFormModal, setSubmitQuoteFormModal] = useState(false);
    const { getItem, setItem } = useLocalStorage();

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const param = useParams();

    useEffect(() => {

        const leadDetailsPayload = agentLeadDetailsPayloadTemplate(param?.sequenceId);
        getLeadsDetailsApi(leadDetailsPayload).then((response) => {
            setLeadDetails(response?.lead_details)
        }).catch((error) => {
            console.log("error : ", error);
        })

        const payload = getAgentProfileDetailsPayloadTemplate();
        getAgentProfileApi(payload).then((response) => {
            console.log("getAgentProfileDetailsPayloadTemplate response : ", response);
            setAgentProfile(response?.profile)
            // enqueueSnackbar(response?.message, {
            //     variant: 'success'
            // })
        })
            .catch((error) => {
                console.log("error : ", error);
            })
            console.log("workinh : ",refetchQuotes,leadDetails);
            setRefetchQuotes(false)
    }, [refetchQuotes])

    const handleTabChange = (event, newTab) => {
        setActiveTab(newTab);
    };

    const handlePriorityStatus = (status) => {
        setPriorityStatus(status)
        setAnchorEl(null)
        const data = {
            lead_sequence_id: leadDetails?.lead_sequence_id,
            lead_priority: status,
            cognito_user_id: localStorage.getItem('authCognitoId'),
        }
        const payload = updateQuotePriorityPayloadTemplate(data);
        updateQuotePriorityApi(payload).then((response) => {
            console.log("updateQuotePriorityPayloadTemplate response : ", response);
            enqueueSnackbar(response?.message, {
                variant: 'success'
            })
        })
            .catch((error) => {
                console.log("error : ", error);
            })
    }


    console.log("localStorage.getItem('authCognitoId') : ",localStorage.getItem('authCognitoId'));

    return (
        <>
            <div className="d-flex gap-30 card-main-dashboard">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    ml={5}
                    mr={5}
                >
                    <Grid item>
                        <h1>{leadDetails?.insurance_type === "homeinsurance" ? <><span className="span-primary">Home</span> Insurance</>
                            : leadDetails?.insurance_type === "floodinsurance" ? <><span className="span-primary">Flood</span>  Insurance</>
                                : <><span className="span-primary">Auto</span>  Insurance</>
                        }</h1>
                    </Grid>
                    {
                        activeTab === 0 &&
                        <Grid item>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                            >
                                <Grid item>
                                    <span>Priority  : </span>
                                </Grid>
                                <Grid item>
                                    <Button onClick={(event) => setAnchorEl(anchorEl ? null : event.currentTarget)}> {JSON.parse(localStorage.getItem('priorityStatus')) == "0" ? "Interested" : JSON.parse(localStorage.getItem('priorityStatus')) == "1" ? "Not Interested" : JSON.parse(localStorage.getItem('priorityStatus')) == "2" ? "Come Back Later" : "Select Priority"} {!open ? <ArrowDropDownOutlinedIcon /> : <ArrowDropUpOutlinedIcon />}</Button>
                                    <Popper id={id} open={open} anchorEl={anchorEl}>
                                        <Card>
                                            <MenuItem onClick={() => { handlePriorityStatus("0"); setItem('priorityStatus', JSON.stringify("0")) }} className={JSON.parse(localStorage.getItem('priorityStatus')) == "0" ? "selectedStatus" : "defaultStatus"} >Interested</MenuItem>
                                            <MenuItem onClick={() => { handlePriorityStatus("1"); setItem('priorityStatus', JSON.stringify("1")) }} className={JSON.parse(localStorage.getItem('priorityStatus')) == "1" ? "selectedStatus" : "defaultStatus"} >Not Interested</MenuItem>
                                            <MenuItem onClick={() => { handlePriorityStatus("2"); setItem('priorityStatus', JSON.stringify("2")) }} className={JSON.parse(localStorage.getItem('priorityStatus')) == "2" ? "selectedStatus" : "defaultStatus"} >Come Back Later</MenuItem>
                                        </Card>
                                    </Popper>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                </Grid>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            textColor="secondary"
                            className='leadManagementTabs'
                        >
                            <Tab label="Lead details" value={0} className={activeTab === 0 ? "activeTabLeadDetails" : "inactiveTabLeadDetails"} />
                            <Tab label="Quotes" value={1} className={activeTab === 1 ? "activeTabLeadDetails" : "inactiveTabLeadDetails"} />
                            <Tab label="Chat" value={2} className={activeTab === 2 ? "activeTabLeadDetails" : "inactiveTabLeadDetails"} />
                            {
                                activeTab === 1 &&
                                <Grid item md={3}>
                                    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', backgroundColor: '#FFB600', padding: '5px', position: 'absolute', right: '0', cursor: 'pointer',borderRadius:'40px', padding: '5px',paddingInline:'10px' }} onClick={() => setSubmitQuoteFormModal(true)}>
                                        <AddIcon />  Submit a Quote
                                    </div>
                                </Grid>}
                        </Tabs>
                    </Box>
                    {
                        activeTab === 0 ?
                            <CustomerLeadDetails leadDetails={leadDetails?.lead_detail?.cards} />
                            :
                            activeTab === 1 ?
                                <SubmitQuoteForm sequenceId={param?.sequenceId} userSequenceId={leadDetails?.user_profile_sequence_id} refetchQuotes={refetchQuotes} leadDetails={leadDetails} agentProfileSequenceId={agentProfile?.sequence_id} setRefetchQuotes={setRefetchQuotes} setSubmitQuoteFormModal={setSubmitQuoteFormModal} submitQuoteFormModal={submitQuoteFormModal} />
                                :
                                <Agent leadDetails={leadDetails} agentProfile={agentProfile} />
                    }
                </Box>
            </div>
        </>
    )
}
export default LeadManagementDetails;

