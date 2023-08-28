import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputFieldController from "../../../components/FormControls/InputFieldController";
import ImageUploadComponent from "../../../components/ImageUploadComponent";
import { getAgentProfileDetailsPayloadTemplate, markAsPurchasePayloadTemplate, sendPaymentLinkPayloadTemplate, submitaQuotePayloadTemplate, updateaQuotePayloadTemplate } from "../../../http/services/api-payload-prepare";
import { getAgentProfileApi, markLeadPurchasedApi, sendPaymentLinkApi, submitQuoteApi, updateQuoteApi } from "../../../http/services/user.service";
import Base64Converter from "../../../utils/Base64Converter";
import document from "../../../assets/images/pin.png"
import { useNavigate, useParams } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import QuoteForm from "../../../components/QuoteForm";
import ModalPopup from "../../../components/ModalPopup";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import NotFound from "../../../components/NotFound";
import QuoteCards from "../../../components/QuoteCards";
import AddIcon from '@mui/icons-material/Add';

const SubmitQuoteForm = ({ sequenceId, userSequenceId, leadDetails, agentProfileSequenceId, refetchQuotes, setRefetchQuotes, submitQuoteFormModal, setSubmitQuoteFormModal }) => {


    const [selectedQuote, setSelectedQuote] = useState();
    const [paymentLinkModal, setPaymentLinkModal] = useState(false);
    const [quoteAcceptedId, setQuoteAcceptedId] = useState(0);
    const [quoteAccepted, setQuoteAccepted] = useState(leadDetails && leadDetails.quote_list?.find((quote) => quote?.status == "accepted"));

    const { Lead_sequenceId } = useParams();
    console.log("quoteAccepted quoteAccepted : ", agentProfileSequenceId);

    const form = useForm();
    const navigate = useNavigate();
    const { control, handleSubmit, errors, watch, getValues, setValue } = form;

    const handleSubmitQuoteForm = async (formData) => {

        // if (formData?.documents_loc instanceof File) {

        formData.documents_loc = formData?.documents_loc instanceof File ? [await Base64Converter(formData.documents_loc)] : [];
        // }
        // else {
        //     formData.documents_loc = []
        // }

        formData.sequenceId = sequenceId;
        formData.userSequenceId = userSequenceId;

        if (formData?.insurance_carrier && formData?.term && formData?.term_measure && formData?.total_amount && formData?.validity && formData?.validity_measure) {
            const payload = submitaQuotePayloadTemplate(formData);
            console.log("formData : ", payload);
            submitQuoteApi(payload).then((response) => {
                console.log("response : ", response);
                if (response.sequence_id) {
                    enqueueSnackbar(response?.message, {
                        variant: 'success'
                    })
                    navigate('/lead-management')
                }
            })
                .catch((error) => {
                    console.log("error : ", error);
                })
        }
        else {
            console.log("all fields empty");
        }
    }

    console.log("leadDetails quotes : ", leadDetails);

    const handleUpdateQuoteForm = async (formData) => {
        // formData.documents_loc = Base64Converter(formData.documents_loc)
        // if (formData?.documents_loc instanceof File){
        //     formData.documents_loc = Base64Converter(formData.documents_loc);
        formData.documents_loc = formData?.documents_loc instanceof File ? [await Base64Converter(formData.documents_loc)] : [];
        // }
        // else {
        //     formData.documents_loc = []
        // }
        formData.sequenceId = Lead_sequenceId ? Lead_sequenceId : sequenceId;
        formData.userSequenceId = userSequenceId;
        formData.lead_quote_id = selectedQuote?.lead_quote_id;

        const payload = updateaQuotePayloadTemplate(formData);
        console.log("updated payload", payload);
        updateQuoteApi(payload).then((response) => {
            console.log("updateaQuotePayloadTemplate response : ", response, formData?.sequenceId);
            // if (response.sequence_id || response.sequence_id == 0) {
            setSubmitQuoteFormModal(false)
            setRefetchQuotes(true)
            enqueueSnackbar(response?.message, {
                variant: 'success'
            })
            navigate(`/lead-management-details/${sequenceId}`)
            // }
        })
            .catch((error) => {
                console.log("error : ", error);
            })
    }


    useEffect(() => {
        if (leadDetails) {
            setQuoteAcceptedId(leadDetails.quote_list?.find((quote) => quote.status == "accepted") ? leadDetails.quote_list?.find((quote) => quote.status == "accepted")?.lead_quote_id : 0)
            setQuoteAccepted(leadDetails.quote_list?.find((quote) => quote.status == "accepted"))
        }
    }, [])


    const handlePaymentLink = (link) => {
        console.log("working", quoteAccepted, link);
        if (quoteAccepted?.status == "accepted") {
            const data = {
                payment_link: link?.payment_link,
                user_cognito_id: leadDetails?.cognito_user_id,
                // user_profile_sequence_id: userSequenceId,
                lead_sequence_id: sequenceId,
                agent_profile_sequence_id: agentProfileSequenceId,
                quote_sequence_id: quoteAcceptedId,
                insurance_type: leadDetails?.insurance_type,
            }
            const payload = sendPaymentLinkPayloadTemplate(data);
            console.log("sendPaymentLinkPayloadTemplate  : ", payload);
            sendPaymentLinkApi(payload).then((response) => {
                console.log("sendPaymentLinkPayloadTemplate response : ", response);
                enqueueSnackbar(response?.message, {
                    variant: 'success'
                })
            })
                .catch((error) => {
                    console.log("error : ", error);
                })
        }
    }


    const handleMarkLeadAsPurchased = () => {
        if (quoteAccepted?.status == "accepted") {
            const data = {
                // user_profile_sequence_id: userSequenceId,
                lead_sequence_id: sequenceId,
                agent_profile_sequence_id: agentProfileSequenceId,
                sequence_id: quoteAcceptedId,
                user_cognito_id: leadDetails?.cognito_user_id,
                quote_sequence_id: quoteAcceptedId,
                insurance_type: leadDetails?.insurance_type
            }
            const payload = markAsPurchasePayloadTemplate(data);
            console.log("handleMarkLeadAsPurchased : payload ", payload);
            markLeadPurchasedApi(payload).then((response) => {
                console.log("markAsPurchasePayloadTemplate response : ", response);
                enqueueSnackbar(response?.message, {
                    variant: 'success'
                })
                navigate('/lead-management')
            })
                .catch((error) => {
                    console.log("error : ", error);
                })
        }
    }


    const handleClose = () => {
        setSubmitQuoteFormModal(false)
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
            >
                {/* <Grid item md={3}>
                <div className={`card-active leadRequestBackground`} style={{display: 'flex', justifyContent: 'center', alignItems: 'center',width:'80%',height:'auto',minWidth:'100px',minHeight:'400px',marginTop:'44px'}} onClick={() => setSubmitQuoteFormModal(true)} >
                        <AddIcon />
                        <h3>Submit a Quote</h3>
                </div>
                </Grid> */}

                {leadDetails?.quote_list?.length > 0 ?
                    leadDetails?.quote_list?.map((quote, index) => {
                        return (
                            <Grid item md={3}>
                                <QuoteCards quote={quote} index={index} setSubmitQuoteFormModal={setSubmitQuoteFormModal} setSelectedQuote={setSelectedQuote}
                                    handleSubmitQuoteForm={handleSubmitQuoteForm} handleMarkLeadAsPurchased={handleMarkLeadAsPurchased}
                                    handlePaymentLink={handlePaymentLink} quoteAccepted={quoteAccepted} refetchQuotes={refetchQuotes} setRefetchQuotes={setRefetchQuotes}
                                />
                            </Grid>
                        )
                    })
                    :
                    <NotFound width={'250px'} height={'auto'} />
                }

            

                {/* <Grid item md={8}>
                    <QuoteForm edit={false} handleSubmitQuoteForm={handleSubmitQuoteForm} handleMarkLeadAsPurchased={handleMarkLeadAsPurchased}
                        handlePaymentLink={handlePaymentLink} quoteAccepted={quoteAccepted}
                    />
                </Grid>
                <Grid item md={4}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        // alignItems="center"
                        // alignContent="center"
                        textAlign="center"
                        rowSpacing={3}
                        columnSpacing={3}
                        spacing={5}
                        mt={5}
                    // mb={3}
                    >
                        <Grid item md={12}>
                            <h3>All Quotes</h3>
                            <Grid item md={12}>
                                {leadDetails?.quote_list?.length > 0 ?
                                    leadDetails?.quote_list?.map((quote, index) => {
                                        return (
                                            <Card className="quoteCard">
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    textAlign="start"
                                                // spacing={5}
                                                >
                                                    <Grid item md={7}>
                                                        <Typography>{quote?.insurance_carrier}</Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography>{`$` + quote?.total_amount}</Typography>
                                                    </Grid>
                                                    <Grid item md={1}>
                                                        <Edit className="editIcon" onClick={() => { setSelectedQuote(quote); setSubmitQuoteFormModal(true) }} />
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        )
                                    })
                                    :
                                    <NotFound width={'250px'} height={'auto'} />
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> */}
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                spacing={5}
                mt={5}
                mb={5}
            >
                <Grid item md={5}>
                    <Button className='nextBtn' fullWidth onClick={() => setPaymentLinkModal(true)} disabled={quoteAccepted?.status == "accepted" ? false : true}>
                        <img src={document} alt="next" /> <span>Send Payment Link</span>
                    </Button>
                </Grid>
                <Grid item md={5}>
                    <Button className='nextBtn' fullWidth onClick={handleMarkLeadAsPurchased} disabled={quoteAccepted?.status == "accepted" ? false : true}>
                        <img src={document} alt="next" /> <span>Mark Lead as purchased</span>
                    </Button>
                </Grid>
                </Grid>
            <ModalPopup open={submitQuoteFormModal} handleClose={handleClose} selectedQuote={selectedQuote} title={selectedQuote ? "Update Quote" : "Add Quote"} handleSubmitQuoteForm={handleSubmitQuoteForm} handleUpdateQuoteForm={handleUpdateQuoteForm} />
            <ModalPopup open={paymentLinkModal} handleClose={() => setPaymentLinkModal(false)} selectedQuote={selectedQuote} title={"Send Payment Link"} handlePaymentLink={handlePaymentLink} />
        </>
    )
}

export default SubmitQuoteForm;