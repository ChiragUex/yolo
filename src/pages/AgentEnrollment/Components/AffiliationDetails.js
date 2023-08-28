import React, { forwardRef, useEffect, useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Button,
  Box
} from '@mui/material';
import { Add, HighlightOff, ExpandMore } from '@mui/icons-material';
import InputFieldController from '../../../components/FormControls/InputFieldController';
import ImageUploadComponent from '../../../components/ImageUploadComponent';
import { useFieldArray } from 'react-hook-form';
import Base64Converter from '../../../utils/Base64Converter';

const AffiliationDetails = forwardRef((props,ref) => {

  const { control, form, errors, setAffiliationImage, watch, getValues, register, setValue } = props;


  const countries = [
    { countryName: "Alaska" },
    { countryName: "India" },
    { countryName: "Arizona" }
  ]

  const insuranceTypes = [
    { type: "Auto Insurance" },
    { type: "Health Insurance" },
    { type: "Home Insurance" },
    { type: "Flood Insurance" },
  ]

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'agent_affiliation'
  });


  // const setBase64ValuesForLicenseDocuments = async () => {
  //   for (let i = 0; i < fields.length; i++) {
  //     const licenseDocumentField = fields[i].affiliationDetailDocument;
  //     if (licenseDocumentField){ 
  //     try {
  //       const base64Data = licenseDocumentField instanceof File || licenseDocumentField instanceof Blob ?  [await Base64Converter(licenseDocumentField)] : [];
  //       fields[i].affiliationDetailDocument = base64Data;
  //       setValue(`agent_affiliation[${i}].licenseDocument`,base64Data)
  //     } catch (error) {
  //       console.error('Error converting to base64:', error);
  //     }
  //   }
  //   }
  // };

  // useEffect(() => {
   
  //   setBase64ValuesForLicenseDocuments();
    
  //   console.log("working : ",fields);
  // },[fields,fields[0]?.affiliationDetailDocument,getValues('affiliationDetailDocument')])



  console.log("agent_affiliation : ", fields, watch('agent_affiliation'));

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
      <p className="agent-enrollment-heading">Affiliation Details</p>
      <Button onClick={() => append({
          insurance_carrier: '',
          documents_loc: '',
          working_since: '',
          cognito_user_id: localStorage.getItem('authCognitoId'),
        })}><Add /> Add</Button>
      </Box>
      <div>
        {fields.map((_, index) => (
          <Accordion key={index} className='accordion'>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box display="flex" alignItems="center" justifyContent="space-between"  width="100%">
                <Typography>Company Details</Typography>
                {index !== 0 &&
                <Button onClick={() => remove(index)}>
                  <HighlightOff />
                </Button>
                }
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <div className="d-flex gap-20 flex-wrap">
                <div className="customer-information-input">
                <InputFieldController
                  control={control}
                  // size="small"
                  fullWidth
                  name={`agent_affiliation[${index}].insurance_carrier`}
                  label="Company Name*"
                  placeholder="Enter Company Name"
                  ref={register()}
                />
                </div>
                <div className="customer-information-input">
                <InputFieldController
                  control={control}
                  fullWidth
                  name={`agent_affiliation[${index}].working_since`}
                  label="Number of Years*"
                  placeholder="Enter Number of Years"
                  ref={register()}
                />
                </div>
              </div>
             
              <ImageUploadComponent 
              control={control} 
              name={`agent_affiliation[${index}].documents_loc`} 
              setAffiliationImage={setAffiliationImage} 
              setValue={setValue} 
              note={'Note:(Driving license or a passport)'}
              defaultFile={watch(`agent_affiliation[${index}].documents_loc`)}
              />
           
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  )
})
export default AffiliationDetails;