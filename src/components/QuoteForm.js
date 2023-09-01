import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputFieldController from "./FormControls/InputFieldController";
import ImageUploadComponent from "./ImageUploadComponent";
import document from "../assets/images/pin.png"
import ModalPopup from "./ModalPopup";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";



const QuoteForm = (props) => {

    const { handleSubmitQuoteForm, edit, handleUpdateQuoteForm, selectedQuote, handleMarkLeadAsPurchased, handlePaymentLink, quoteAccepted, submitDisabled, setSubmitDisabled } = props;

    console.log("selectedQuote : ", selectedQuote?.documents_loc);

    const [paymentLinkModal, setPaymentLinkModal] = useState(false);


    const form = useForm({
        defaultValues: {
            insurance_carrier: selectedQuote?.insurance_carrier,
            term: selectedQuote?.term,
            term_measure: selectedQuote?.term_measure,
            validity: selectedQuote?.validity,
            validity_measure: selectedQuote?.validity_measure,
            documents_loc: selectedQuote?.documents_loc,
            total_amount: selectedQuote?.total_amount,
        },
    });

    const { control, handleSubmit, errors, watch, getValues, setValue } = form;


    useEffect(() => {

        if ((watch('insurance_carrier')?.length && watch('term')?.length && watch('term_measure')?.length && watch('validity')?.length && watch('total_amount')?.length && watch('validity_measure')?.length)) {
            setSubmitDisabled(false)
            console.log("test3");
        }
        else if (selectedQuote) {
            console.log("inside : ", watch('insurance_carrier'), watch('term'), watch('term_measure'), watch('validity'), watch('total_amount'), watch('validity_measure'))
            if (watch('insurance_carrier') && watch('term') && watch('term_measure') && watch('validity') && watch('total_amount') && watch('validity_measure')) {
                setSubmitDisabled(false)
                console.log("test3");
            }
            else {
                setSubmitDisabled(true);
                console.log("test2");
            }
        }
        else {
            setSubmitDisabled(true);
            console.log("test2");
        }

    }, [watch('insurance_carrier'), watch('term'), watch('term_measure'), watch('validity'), watch('total_amount'), watch('validity_measure'), selectedQuote, edit])

    console.log("total_amount : ", watch("total_amount"));

    return (
        <>
            <form onSubmit={!selectedQuote ? handleSubmit(handleSubmitQuoteForm) : handleSubmit(handleUpdateQuoteForm)}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    rowSpacing={3}
                    columnSpacing={3}
                    spacing={3}
                    mt={5}
                    mb={3}
                >
                    {/* {
                        edit === false &&
                        <Grid item md={12}>
                            <h3>Submit a Quote</h3>
                        </Grid>
                    } */}
                    <Grid item md={12}>
                        <Typography>Insurance Carrier</Typography>
                        <Controller
                            name="insurance_carrier"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    // label="Message"
                                    multiline
                                    rows={5}
                                    fullWidth
                                    placeholder="Insurance Carrier"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Typography>Term</Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Controller
                            name="term"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel className="labelBg">Number</InputLabel>
                                    <Select
                                        {...field}

                                    >
                                        <MenuItem value={"1"} >1</MenuItem>
                                        <MenuItem value={"2"} >2</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <Controller
                            name="term_measure"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel className="labelBg">Months And Years</InputLabel>
                                    <Select
                                        {...field}
                                    >
                                        <MenuItem value="Month">Month</MenuItem>
                                        <MenuItem value="Year">Year</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    {/* </Grid> */}

                    <Grid item md={12}>
                        <Typography>Quote Validity</Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Controller
                            name="validity"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel className="labelBg">Number</InputLabel>
                                    <Select
                                        {...field}
                                    >
                                        <MenuItem value={"1"} >1</MenuItem>
                                        <MenuItem value={"2"} >2</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <Controller
                            name="validity_measure"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel className="labelBg">Days, Weeks, Months</InputLabel>
                                    <Select
                                        {...field}
                                    >
                                        <MenuItem value="day">Day</MenuItem>
                                        <MenuItem value="week">Week</MenuItem>
                                        <MenuItem value="month">Month</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    {/* </Grid> */}

                    <Grid item md={12}>
                        <Typography>Upload Document</Typography>
                        <ImageUploadComponent control={control} setValue={setValue} quotes={'quotes'} name={"documents_loc"} defaultFile={watch('documents_loc') ? watch('documents_loc') : selectedQuote?.documents_loc} />
                    </Grid>

                    <Grid item md={12}>
                        <Typography>Total Dollar</Typography>
                        {/* <InputFieldController
                            control={control}
                            fullWidth
                            name="total_amount"
                            placeholder="Yoloh Insurance Pvt."
                        /> */}
                        {/* <Controller
                            control={control}
                            name="total_amount"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="Total amount"
                                    variant="outlined"
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    onChange={(e) => {
                                        const validValue = e.target.value.replace(/[^0-9.]/g, '');
                                        field.onChange(validValue);
                                    }}
                                />
                            )}
                        /> */}

                        <Controller
                            control={control}
                            name="total_amount"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="Total amount"
                                    variant="outlined"
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const validValue = inputValue.replace(/[^0-9.]/g, '');
                                        const parts = validValue.split('.');
                                        if (parts.length > 2) {
                                            const integerPart = parts[0];
                                            const decimalPart = parts[1];
                                            field.onChange(`${integerPart}.${decimalPart}`);
                                        } else {
                                            field.onChange(validValue);
                                        }
                                    }}
                                />
                            )}
                        />

                    </Grid>

                    <Grid item md={12}>
                        <Button className={submitDisabled && !selectedQuote ? 'disabledBtn' : submitDisabled && selectedQuote && selectedQuote ? 'disabledBtn' : 'nextBtn'} type='submit' disabled={submitDisabled}>
                            <span>{!selectedQuote ? "Submit" : "Update"}</span>
                        </Button>
                    </Grid>
                    {/* {
                        !selectedQuote &&
                        <>
                            <Grid item md={6}>
                                <Button className='nextBtn' fullWidth onClick={() => setPaymentLinkModal(true)} disabled={quoteAccepted?.status == "accepted" ? false : true}>
                                    <img src={document} alt="next" /> <span>Send Payment Link</span>
                                </Button>
                            </Grid>
                            <Grid item md={6}>
                                <Button className='nextBtn' fullWidth onClick={handleMarkLeadAsPurchased} disabled={quoteAccepted?.status == "accepted" ? false : true}>
                                    <img src={document} alt="next" /> <span>Mark Lead as purchased</span>
                                </Button>
                            </Grid>
                            <ModalPopup open={paymentLinkModal} handleClose={() => setPaymentLinkModal(false)} selectedQuote={selectedQuote} title={"Send Payment Link"} handlePaymentLink={handlePaymentLink} />
                        </>
                    } */}
                </Grid>
            </form>
        </>
    )
}

export default QuoteForm;