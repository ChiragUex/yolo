import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Button,
  Box, InputLabel, MenuItem, FormControl, Select, TextField, Grid, FormHelperText, Autocomplete
} from '@mui/material';
import { Add, HighlightOff, ExpandMore } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputFieldController from '../../../components/FormControls/InputFieldController';
import ImageUploadComponent from '../../../components/ImageUploadComponent';
import StateList from '../../../constants/StateList'
import { Controller, useFieldArray } from 'react-hook-form';
import Base64Converter from '../../../utils/Base64Converter';
import moment from 'moment';
const dayjs = require("dayjs");

const LicensesProduct = forwardRef((props, ref) => {

  const { control, form, errors, setLicenseImage, setValue, allPlaces, setStateInput, register, getValues, watch } = props;

  const [minimumExpirationDate,setMinimumExpirationDate] = useState([]);


  const insuranceTypes = [
    { type: "Auto Insurance" },
    { type: "Health Insurance" },
    { type: "Home Insurance" },
    { type: "Flood Insurance" },
  ]

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'agent_license'
  });

  // const setBase64ValuesForLicenseDocuments = async () => {
  //   for (let i = 0; i < fields.length; i++) {
  //     const licenseDocumentField = fields[i].licenseDocument;
  //     if (licenseDocumentField){ 
  //     try {
  //       const base64Data = licenseDocumentField instanceof File || licenseDocumentField instanceof Blob ?  [await Base64Converter(licenseDocumentField)] : [];
  //       fields[i].licenseDocument = base64Data;
  //       setValue(`agent_license[${i}].licenseDocument`,base64Data);
  //     } catch (error) {
  //       console.error('Error converting to base64:', error);
  //     }
  //   }
  //   }
  // };

  // const convertFilesToBase64 = async () => {
  //   const base64Files = [];
  //   for (let i = 0; i < fields.length; i++) {
  //     const field = fields[i];
  //     if (field.key === 'licenseDocument') {
  //       const base64 = field.file[0] instanceof File || field.file[0] instanceof Blob ?  [await Base64Converter(field.file[0])] : [];
  //       base64Files.push(base64);
  //     }
  //   }

  // const convertFilesToBase64 = async () => {
  //   const updatedFields = [];
  //   for (let i = 0; i < fields.length; i++) {
  //     const field = fields[i];
  //     if (field.licenseDocument && field.licenseDocument.file) {
  //       const base64 = [await Base64Converter(field.licenseDocument.file)];
  //       const updatedField = { ...field, licenseDocument: base64 };
  //       updatedFields.push(updatedField);
  //     } else {
  //       updatedFields.push(field);
  //     }
  //   }
  //   setValue('agent_license', updatedFields);
  // }

  // useEffect(() => { 
  //   // setBase64ValuesForLicenseDocuments();
  //   convertFilesToBase64();
  //   console.log("working : ",fields);
  // },[getValues('agent_license')])

  const handleExpirationDate = (newDate,index) => {
    const dateValue = new Date(watch(`agent_license[${index}].issue_date`) ? watch(`agent_license[${index}].issue_date`) : newDate);
    const parsedDate = moment(dateValue);
    // const datto = new Date(newDate)
    const nextDate = moment(parsedDate).add(1, "days").format("YYYY-MM-DD");
    return nextDate;
    console.log("parsedDate : ",parsedDate,);
    // setMinimumExpirationDate(prevStates => {
    //   const minDates = [...prevStates];
    //   minDates[index] = nextDate;
    //   return minDates;
    // });
    // console.log(watch(`agent_license[${index}].issue_date`),"newDate : ",newDate,index,moment(parsedDate).add(1, "days").format("YYYY-MM-DD"))
  }


  // const parsedDate = moment(watch(`agent_license[${0}].issue_date`)).format("YYYY-MM-DD")


  console.log("arrayfields : ", fields,moment(watch(`agent_license[${0}].issue_date`)).add(1, "days"),watch(`agent_license[${0}].issue_date`).M);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <p className="agent-enrollment-heading">State Licenses & Product Offering</p>
        <Button onClick={() => append({
          state_licensed: '',
          insurance_type_supported: '',
          issue_date: '',
          expiration_date: '',
          documents_loc: '',
          license_identifier: '',
          cognito_user_id: localStorage.getItem('authCognitoId'),
        })}><Add /> Add</Button>
      </Box>
      {fields.map((accordion, index) => (
        <Accordion key={accordion.id} className='accordion' >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >

            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Typography>Personal data </Typography>
              {index !== 0 &&
                <Button onClick={() => remove(index)}>
                  <HighlightOff />
                </Button>
              }
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {/* Render your form fields within each accordion */}
            <div className="d-flex gap-20 flex-wrap inputFieldSpacing">
              <div className="customer-information-input">
                <Controller
                  name={`agent_license[${index}].state_licensed`}
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth>
                      <InputLabel id={`state-label-${index}`}>State*</InputLabel>
                      <Select
                        {...field}
                        labelId={`state-label-${index}`}
                        label="State*"
                      // ref={register()}
                      >
                        {StateList?.map((item, stateIndex) => (
                          <MenuItem value={item} key={stateIndex}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldState?.error && (
                        <span style={{ color: "#D72A2A",fontSize: '0.75rem' }}>{fieldState?.error?.message}</span>
                      )}
                    </FormControl>
                  )}
                />
              </div>

              <div className="customer-information-input">
                <Controller
                  name={`agent_license[${index}].insurance_type_supported`}
                  control={control}
                  rules={{ required: "Insurance Type is required" }}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth>
                      <InputLabel id={`insuranceType-label-${index}`}>Insurance Type*</InputLabel>
                      <Select
                        {...field}
                        labelId={`insuranceType-label-${index}`}
                        label="Insurance Type*"
                        // ref={register()}
                      >
                        {insuranceTypes?.map((item, insuranceIndex) => (
                          <MenuItem value={item?.type} key={insuranceIndex}>
                            {item?.type}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldState?.error && (
                        <span style={{ color: "#D72A2A",fontSize: '0.75rem' }}>{fieldState?.error?.message}</span>
                      )}
                    </FormControl>
                  )}
                />
              </div>
            </div>

            <div className="d-flex gap-20 flex-wrap inputFieldSpacing">
              <div className="customer-information-input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name={`agent_license[${index}].issue_date`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl fullWidth>
                        <DatePicker
                          label="Issue Date"
                          value={value}
                          onChange={(dateValue) => {onChange(dateValue)}}
                          format={"YYYY-MM-DD"}
                          className='datePicker'
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText={<FormHelperText>Issue Date</FormHelperText>}
                            />
                          )}
                        />
                      </FormControl>
                    )}
                  />
                </LocalizationProvider>
              </div>

              <div className="customer-information-input">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name={`agent_license[${index}].expiration_date`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl fullWidth>
                        <DatePicker
                          label="Expiration Date"
                          value={value}
                          onChange={onChange}
                          format="YYYY-MM-DD"
                          className='datePicker'
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText={<FormHelperText>Expiration Date</FormHelperText>}
                            />
                          )}
                          // minDate={new Date(watch(`agent_license[${index}].issue_date`)).setDate(watch(`agent_license[${index}].issue_date`).getDate() + 1) || ""}
                          // minDate={new Date(watch(`agent_license[${index}].issu"e_date`)).getDate() + 1 || ""}
                          minDate={watch(`agent_license[${index}].issue_date`) || ""}
                        />
                      </FormControl>
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="d-flex gap-20 flex-wrap">
              <InputFieldController
                control={control}
                fullWidth
                name={`agent_license[${index}].license_identifier`}
                label="License*"
                placeholder="Enter License Number"
              />
            </div>
            <ImageUploadComponent
              control={control}
              setValue={setValue}
              name={`agent_license[${index}].documents_loc`}
              setLicenseImage={setLicenseImage}
              note={'Note:(Driving license or a passport)'}
              defaultFile={watch(`agent_license[${index}].documents_loc`)}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
})

export default LicensesProduct;
