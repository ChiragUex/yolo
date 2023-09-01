import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogContent, Grid, Modal } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputFieldController from "./FormControls/InputFieldController";
import QuoteForm from "./QuoteForm";

const ModalPopup = (props) => {

    const { open, handleClose, selectedQuote, title, handleUpdateQuoteForm, setLeadQuoteSequenceId, handlePaymentLink, handleSubmitQuoteForm, setSubmitDisabled, submitDisabled } = props;


    const { control, handleSubmit, errors, watch, getValues, setValue } = useForm();

    console.log("open : ",open,props);

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Grid item><h2>{title}</h2></Grid>
                        <Grid item><Close onClick={() => handleClose()}/></Grid>
                    </Grid>
                    {
                        handlePaymentLink ? 
                        <>
                        <form onSubmit={handleSubmit(handlePaymentLink)}>
                        <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item md={12}>
                        <InputFieldController
                            control={control}
                            fullWidth
                            name="payment_link"
                            placeholder="Enter Payment Link"
                        />
                        </Grid>
                        <Grid item md={12}>
                        <Button className='nextBtn' type='submit'>
                            <span>Submit</span>
                        </Button>
                        </Grid>
                        </Grid>
                        </form>
                        </>
                         :
                        <QuoteForm selectedQuote={selectedQuote} handleUpdateQuoteForm={handleUpdateQuoteForm} handleSubmitQuoteForm={handleSubmitQuoteForm} setSubmitDisabled={setSubmitDisabled} submitDisabled={submitDisabled}/>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ModalPopup;