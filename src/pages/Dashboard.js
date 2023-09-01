import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import TablesComponent from "../components/TablesComponent";
import { getDashboardDataPayloadTemplate } from "../http/services/api-payload-prepare";
import { getDashboardDataApi } from "../http/services/user.service";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import moment from "moment";

const Dashboard = () => {

  const [dashboardStats, setDashboardStats] = useState({});
  const [searchData, setSearchData] = useState({
    search: "",
    start_date: "",
    end_date: "",
    insurance_type: "",
    lead_priority: ""
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();
  const { authUser, setAuthUser, isLoggedIn } = useAuth();

  const columns = [
    {
      id: "Username",
      header: "Username",
      width: 150,
    },
    {
      id: "insuranceType",
      header: "Insurance Type",
      width: 200,
    },
    {
      id: "CreatedAt",
      header: "Date & Time",
      width: 200,
    },
    {
      id: "action",
      header: "Action",
      width: 200,
    },
  ];

  useEffect(() => {
    const agentProfileDetails = JSON.parse(localStorage.getItem('agentProfileDetails'));

    const rejected = agentProfileDetails?.agentLicense?.find(item => item.license_verification_status ==  "reject") || agentProfileDetails?.agentLicense?.find(item => item.license_verification_status == "pending")

    if(rejected){
      navigate('/warning/rejected')
    }
  },[])


  useEffect(() => {
    const payload = getDashboardDataPayloadTemplate(searchData);
    getDashboardDataApi(payload).then((response) => {
      console.log("getDashboardDataApi response : ", response);
      setDashboardStats(response?.dashboard_stats)
      // enqueueSnackbar(response?.message, {
      //     variant: 'success'
      //   })
    })
      .catch((error) => {
        console.log("error : ", error);
      })
  }, [searchData])


  const handleSearchFilter = (filterData) => {
    console.log("filterData : ", filterData);
    filterData.startDate = filterData.startDate ? moment(filterData.startDate).format("yyyy-MM-DD hh:mm:ss") : "";
    filterData.endDate = filterData.endDate ? moment(filterData.endDate).format("yyyy-MM-DD hh:mm:ss") : "";
    setSearchData(filterData)
  }

  // console.log("searchData: ", searchData);

  return (
    <>
      <div className="d-flex gap-30 card-main-dashboard">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          spacing={5}
        >
          <Grid item md={12}>
            <h1>Dashboard</h1>
            {/* <Filters handleSearchFilter={handleSearchFilter} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} /> */}
          </Grid>

          <Grid item md={4}>
            <div className="dashboard-card" onClick={() => navigate('/lead-management')}>
              <div className="d-flex gap-20 align-items-center">
                <h1 className="m-0 p-0 font-36">
                  {dashboardStats && dashboardStats?.total_leads}
                </h1>
              </div>
              <div className="dashboard-card-text">Total leads</div>
            </div>
          </Grid>
          <Grid item md={4}>
            <div className="dashboard-card orange" >
              <div className="d-flex gap-20 align-items-center">
                <h1 className="m-0 p-0 font-36">{dashboardStats && dashboardStats?.consumer_leads}</h1>
              </div>
              <div className="dashboard-card-text">Consumer-Generated</div>
            </div>
          </Grid>
          <Grid item md={4}>
            <div className="dashboard-card yellow">
              <div className="d-flex gap-20 align-items-center">
                <h1 className="m-0 p-0 font-36">
                  {dashboardStats && dashboardStats?.platforms_leads}
                </h1>
              </div>
              <div className="dashboard-card-text">Platform-Generated</div>
            </div>
          </Grid>

          <Grid item md={12}>
            <TablesComponent columns={columns} data={[]} upcomingLeads={dashboardStats && dashboardStats?.upcoming_leads} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
