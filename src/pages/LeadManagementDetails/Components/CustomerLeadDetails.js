import { Grid, Typography } from "@mui/material"
import LeadDetailsAccordion from "../../../components/LeadDetailsAccordion";
import NotFound from "../../../components/NotFound";

const CustomerLeadDetails = ({ leadDetails }) => {

console.log("leadDetails  : 1",leadDetails);

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                spacing={5}
                mt={5}
            >
                <Grid item md={12}>
                    <LeadDetailsAccordion title={"Leads Details"} expanded={true}>
                        { leadDetails ? 
                         leadDetails?.map((cards,index) => {
                            return (
                                // <LeadDetailsAccordion title={cards?.card_heading} key={cards?.card_id}>
                                //     <Grid
                                //         container
                                //         direction="row"
                                //         className="leadDetailsContent"
                                //     >
                                //         {
                                //             cards?.questions?.map((questions, id) => {
                                //                 return (
                                //                     <Grid item md={6} key={"id" +""+id}>
                                //                         <Grid
                                //                             container
                                //                             direction="row"
                                //                         >
                                //                             <Grid item md={6}>
                                //                                 <Typography><strong>{questions?.question_text} : </strong></Typography>
                                //                             </Grid>
                                //                             <Grid item md={6}>
                                //                                 <Typography style={{textAlign: 'start'}}>{questions?.answer ? questions?.answer : "-"}</Typography>
                                //                             </Grid>
                                //                         </Grid>
                                //                     </Grid>
                                //                 )
                                //             })
                                //         }
                                //     </Grid>
                                // </LeadDetailsAccordion>
                                    <div key={index}>
                                    <Typography key={cards?.card_id}>
                                    {cards?.card_heading}
                                    </Typography>
                                    <Grid
                                        container
                                        direction="row"
                                        className="leadDetailsContent"
                                        mt={2}
                                        mb={5}
                                    >
                                        {
                                            cards?.questions?.map((questions, id) => {
                                                return (
                                                    <Grid item md={6} key={"id" +""+id}>
                                                        <Grid
                                                            container
                                                            direction="row"
                                                        >
                                                            <Grid item md={6}>
                                                                <Typography>{questions?.question_text} : </Typography>
                                                            </Grid>
                                                            <Grid item md={6}>
                                                                <Typography style={{textAlign: 'start'}}><strong>{questions?.answer ? questions?.answer : "-"}</strong></Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                    </div>
                            )
                        })
                    :
                    <NotFound />
                    }
                    </LeadDetailsAccordion>
                </Grid>

                <Grid item md={12}>
                <LeadDetailsAccordion title={"User Notes"}>
                    {
                        leadDetails?.user_notes ?
                        <Typography>{leadDetails?.user_notes ? leadDetails?.user_notes : ""}</Typography>
                          :
                        <NotFound />
                    }
                </LeadDetailsAccordion>
                </Grid>

                <Grid item md={12}>
                <LeadDetailsAccordion title={"Attachments"}>
                 
                </LeadDetailsAccordion>
                </Grid>
            </Grid>
        </>
    )
}
export default CustomerLeadDetails;