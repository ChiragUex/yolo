import { Grid } from "@mui/material";
import LeadsCard from "../../../components/LeadsCard";
import NotFound from "../../../components/NotFound";
import TablesComponent from "../../../components/TablesComponent";

const WinLooseInactive = ({ agentLeadList, activeTab, columns, viewType, setPages }) => {

    return (
        <>
            {
                agentLeadList?.agent_lead_list?.length > 0 ?
                    <>
                        {
                            viewType == "tabs" ?
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    spacing={5}
                                >

                                    {agentLeadList?.agent_lead_list?.map((lead, index) => {
                                        return (
                                            <Grid item md={2} key={index}>
                                                <LeadsCard lead={lead} activeTab={activeTab} />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                                :
                                <TablesComponent columns={columns} data={agentLeadList?.agent_lead_list} setPages={setPages} totalRecords={agentLeadList?.agent_lead_list?.list}/>
                        }
                    </>
                    :
                    <NotFound />
            }
        </>
    )
}
export default WinLooseInactive;