
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import QuoteRequests from './Components/QuoteRequests';
import QuoteProvided from './Components/QuoteProvided';
import WinLooseInactive from './Components/WinLooseInactive';
import Filters from '../../components/Filters';
import { agentQuoteProvidedPayloadTemplate, agentQuoteRequestPayloadTemplate, agentWonLossInactivePayloadTemplate } from '../../http/services/api-payload-prepare';
import { getAgentQuoteRequestApi } from '../../http/services/user.service';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import LoaderContext from '../../context/LoaderContext';
import Loader from '../../components/Loader';
import { Button, Card, Grid, MenuItem, Popper } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TablesComponent from '../../components/TablesComponent';
import TabIcon from '@mui/icons-material/Tab';
import { useNavigate } from 'react-router-dom';

const LeadManagement = () => {

    const [activeTab, setActiveTab] = useState(0);

    const [agentLeadList, setAgentLeadList] = useState([]);
    const [searchData, setSearchData] = useState({
        search: "",
        start_date: "",
        end_date: "",
        insurance_type: "",
        lead_priority: ""
    });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [pages, setPages] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [viewType, setViewType] = useState("tabs");

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const navigate = useNavigate();

    const handleViewStatus = (type) => {
        setViewType(type)
        setAnchorEl(null)
    }


    const { isLoader, setIsLoader } = useContext(LoaderContext);

    const handleTabChange = (event, newTab) => {
        setActiveTab(newTab);
    };

    useEffect(() => {
        const agentProfileDetails = JSON.parse(localStorage.getItem('agentProfileDetails'));
    
        const rejected = agentProfileDetails?.agentLicense?.find(item => item.license_verification_status == "reject")
    
        if(rejected){
          navigate('/warning/rejected')
        }
      },[])

    const getAgentQuoteRequest = async (payload) => {
        try {
            getAgentQuoteRequestApi(payload).then((response) => {
                console.log("getAgentQuoteRequestApi response:", response);
                setAgentLeadList(response)
                setIsLoader(false);
            })
        } catch (error) {
            console.log("Error:", error);
            setIsLoader(false);
        }
    };

    useEffect(() => {
        setViewType("tabs")
        setAgentLeadList([]);
        if (activeTab == 0) {
            setIsLoader(true);
            const payload = agentQuoteRequestPayloadTemplate(searchData);
            getAgentQuoteRequest(payload)
        }
        else if (activeTab == 1) {
            setIsLoader(true);
            const payload = agentQuoteProvidedPayloadTemplate(searchData);
            getAgentQuoteRequest(payload)
        }
        else if (activeTab == 2) {
            setIsLoader(true);
            const payload = agentWonLossInactivePayloadTemplate(searchData);
            getAgentQuoteRequest(payload)
        }
    }, [activeTab, searchData])

    const handleSearchFilter = (filterData) => {
        filterData.startDate = filterData.startDate ? moment(filterData.startDate).format("yyyy-MM-DD hh:mm:ss") : "";
        filterData.endDate = filterData.endDate ? moment(filterData.endDate).format("yyyy-MM-DD hh:mm:ss") : "";
        setSearchData(filterData)
    }


    const columns = [
        {
            id: "Profile",
            header: "Profile",
            width: 150,
        },
        {
            id: "Name",
            header: "Name",
            width: 100,
        },
        {
            id: "CreatedAt",
            header: "CreatedAt",
            width: 200,
        },
        {
            id: "insuranceType",
            header: "Insurance Type",
            width: 200,
        },
        {
            id: "action",
            header: "Action",
            width: 200,
        },
    ];


    console.log("search  : ", searchData);

    return (
        <div className="d-flex gap-30 card-main-dashboard">
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <h1>Lead Management</h1>
                </Grid>
                <Grid item>
                    <TabIcon onClick={() => handleViewStatus("tabs")} className={viewType == "tabs" ? "leadViewIconsInactive" : "leadViewIconsActive"} />
                    <FormatListBulletedIcon onClick={() => handleViewStatus("table")} className={viewType == "table" ? "leadViewIconsInactive" : "leadViewIconsActive"} />

                    {/* <Button onClick={(event) => setAnchorEl(anchorEl ? null : event.currentTarget)}> View {!open ? <ArrowDropDownOutlinedIcon /> : <ArrowDropUpOutlinedIcon />}</Button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Card>
                    <MenuItem onClick={() => handleViewStatus("tabs")}>Tab View</MenuItem>
                    <MenuItem onClick={() => handleViewStatus("table")}>Table View</MenuItem>
                </Card>
            </Popper> */}
                </Grid>
            </Grid>

            <Filters handleSearchFilter={handleSearchFilter} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} />
                    <>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={activeTab}
                                    onChange={handleTabChange}
                                    variant="fullWidth"
                                    className='leadManagementTabs'
                                    textColor="secondary"
                                    indicatorColor="primary"
                                >
                                    <Tab label="Quote Requests" value={0} className={activeTab === 0 ? "activeTabLeadDetails" : "inactiveTabLeadDetails"} />
                                    <Tab label="Quote Provided" value={1} className={activeTab === 1 ? "activeTabLeadDetails" : "inactiveTabLeadDetails"} />
                                    <Tab label="Win / Lost / Inactive" value={2} className={activeTab === 2 ? "activeTabLeadDetails" : "inactiveTabLeadDetails"} />
                                </Tabs>
                            </Box>
                            {
                                activeTab === 0 ?
                                    <>
                                        {
                                            isLoader ? <Loader loaderTransform="loaderTransform" />
                                                :
                                                <QuoteRequests agentLeadList={agentLeadList} activeTab={0} columns={columns} viewType={viewType} setPages={setPages}/>
                                        }
                                    </>
                                    :
                                    activeTab === 1 ?
                                        <QuoteProvided agentLeadList={agentLeadList} activeTab={1} columns={columns} viewType={viewType} setPages={setPages}/>
                                        :
                                        <WinLooseInactive agentLeadList={agentLeadList} activeTab={2} columns={columns} viewType={viewType} setPages={setPages}/>
                            }
                        </Box>
                    </>

        </div>
    )
}
export default LeadManagement;