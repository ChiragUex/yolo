import notFound from "../assets/images/notfound.png"
import defaultProfile from '../assets/images/profile-thumb.svg'
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import { Button, Divider, Grid } from "@mui/material";
import { useState } from "react";
import ModalPopup from "./ModalPopup";
import document from "../assets/images/pin.png"


const QuoteCards = ({ quote, setSelectedQuote, setSubmitQuoteFormModal, handleMarkLeadAsPurchased, handlePaymentLink }) => {

    const [paymentLinkModal, setPaymentLinkModal] = useState(false);

    console.log("sdfds ", quote?.documents_loc, quote?.documents_loc[0], defaultProfile);

    return (
        <>
            <div className="mt-44 d-flex gap-50 flex-wrap">
                {
                    quote ?
                        (
                            <>
                                <div className={`card-active leadRequestBackground quoteCard`} >
                                    <p className="tag"><EditIcon className="editIcon" onClick={() => { setSelectedQuote(quote); setSubmitQuoteFormModal(true) }} /></p>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mt={4}
                                    >
                                        <Grid item>
                                            <p className="quoteHeadings">{JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.first_name + " " + JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.last_name}</p>
                                        </Grid>
                                        <Grid item>
                                            <p className="quoteAmount">{`$` + quote?.total_amount}</p>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Grid item md={6}>
                                            <p className="quoteHeadings">Carrier Name</p>
                                        </Grid>
                                        <Grid item md={6}>
                                            <p className="quoteValues">{quote?.insurance_carrier}</p>
                                        </Grid>
                                        <Grid item md={6}>
                                            <p className="quoteHeadings">Term</p>
                                        </Grid>
                                        <Grid item md={6}>
                                            <p className="quoteValues">{quote?.term + " " + quote?.term_measure}</p>
                                        </Grid>
                                        <Grid item md={6}>
                                            <p className="quoteHeadings">Quote Validity</p>
                                        </Grid>
                                        <Grid item md={6}>
                                            <p className="quoteValues">{quote?.validity + " " + quote?.validity_measure}</p>
                                        </Grid>
                                    </Grid>

                                    <Divider />
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Grid item md={12}>
                                            <p className="quoteHeadings">Document</p>
                                        </Grid>
                                        <Grid item md={12}>
                                            <img
                                                src={quote?.documents_loc ? quote?.documents_loc[0] : defaultProfile}
                                                alt={"Quote Icon"}
                                                width="60px"
                                                height="60px"
                                            />
                                        </Grid>
                                        {/* <Grid item md={12}>
                                            <Button className='nextBtn' fullWidth onClick={() => setPaymentLinkModal(true)} disabled={quote?.status == "accepted" ? false : true}>
                                                <img src={document} alt="next" /> <span>Send Payment Link</span>
                                            </Button>
                                        </Grid>
                                        <Grid item md={12}>
                                            <Button className='nextBtn' fullWidth onClick={handleMarkLeadAsPurchased} disabled={quote?.status == "accepted" ? false : true}>
                                                <img src={document} alt="next" /> <span>Mark Lead as purchased</span>
                                            </Button>
                                        </Grid> */}
                                    </Grid>
                                    {/* </Grid> */}

                                    {/* <div className="icon-bg-active-card">
                                    <img
                                        src={quote?.documents_loc ? quote?.documents_loc[0] : defaultProfile}
                                        alt={"Quote Icon"}
                                        width="60px"
                                        height="60px"
                                    />
                                </div> */}
                                    {/* <div>
                                    
                                    <p>{`$` + quote?.total_amount}</p>
                                </div> */}
                                </div>
                            </>
                        ) : (
                            <div className="d-block m-auto">
                                <div className="mainNoRecordFound">
                                    <img
                                        src={notFound}
                                        alt="noRecordFound"
                                        width="579px"
                                        height="300px"
                                    />
                                    <p>
                                        No <span className="spanPrimary">Record</span> Found
                                    </p>
                                </div>
                            </div>
                        )}
            </div>
            <ModalPopup open={paymentLinkModal} handleClose={() => setPaymentLinkModal(false)} selectedQuote={quote} title={"Send Payment Link"} handlePaymentLink={handlePaymentLink} />
        </>
    )
}
export default QuoteCards;