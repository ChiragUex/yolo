import InputFieldController from "../../../components/FormControls/InputFieldController";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import ImageUploadComponent from "../../../components/ImageUploadComponent";
import { Controller } from "react-hook-form";
import { Autocomplete, FormControl, TextField } from "@mui/material";
import StateList from "../../../constants/StateList";
import ReactSelectController from "../../../components/FormControls/ReactSelectController";
import ReactSelect from "react-select";
import { useLocalStorage } from "../../../http/services/local-storage";
import * as _ from "lodash";

const PersonalDetails = forwardRef((props, ref) => {

  const { control, form, errors, emailId, watch, setPersonalImage,fetchPlaces, setValue, allPlaces, contactAddressInput, setContactAddressInput, setAllPlaces } = props;

  const { getItem, setItem, removeItem } = useLocalStorage();

  console.log("allPlaces : ", allPlaces, contactAddressInput, localStorage.getItem("contactAddress"), watch('contactAddress'));

  useEffect(() => {
  if(localStorage.getItem("contactAddress") && localStorage.getItem("contactAddress") !== undefined && localStorage.getItem("contactAddress") !== null){
    setValue('contactAddress',localStorage.getItem("contactAddress"))
    setContactAddressInput(localStorage.getItem("contactAddress"))
    console.log("inside personaldetails");
}
},[localStorage.getItem("contactAddress")])



  return (
    <>
      <div className="agent-enrollment-heading" >
        Personal Details
      </div>
      <div className="d-flex gap-20 flex-wrap inputFieldSpacing">
        <div className="customer-information-input">
          <InputFieldController
            control={control}
            fullWidth
            name="first_name"
            label="First Name*"
            placeholder="Enter First Name"
          // errors={errors}
          />
        </div>
        <div className="customer-information-input">
          <InputFieldController
            control={control}
            fullWidth
            name="last_name"
            label="Last Name*"
            placeholder="Enter Last Name"
          />
        </div>
      </div>
      <div className="d-flex gap-20 flex-wrap inputFieldSpacing">
        <div className="customer-information-input">
          <InputFieldController
            control={control}
            fullWidth
            name="businessPhoneMobile"
            label="Business Phone Mobile"
            placeholder="Enter Business Phone Mobile"
          />
        </div>
        <div className="customer-information-input">
          <InputFieldController
            control={control}
            fullWidth
            name="personalPhoneLandline"
            label="Personal Phone Landline"
            placeholder="Enter Personal Phone Landline"
          />
        </div>
      </div>
      <div className="d-flex gap-20 flex-wrap inputFieldSpacing">
        <div className="customer-information-input">
          <InputFieldController
            control={control}
            fullWidth
            name="personalDetailEmail"
            label="Email ID*"
            defaultValue={emailId}
            placeholder="Enter Email ID"
            disabled={true}
          />
        </div>

        <div className="customer-information-input">
          {/* <InputFieldController
            control={control}
            fullWidth
            name="contactAddress"
            label="Contact Address*"
            placeholder="Enter Contact Address"
          /> */}


          {/* <Controller
                    name="contactAddress"
                    control={control}
                    // defaultValue=""
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={allPlaces?.length ? allPlaces : StateList}
                        // getOptionLabel={(option) => option?.description}
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : option?.description || ""
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Contact Address*"
                            // error={!!errors.state}
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          option?.description === value?.description
                        }
                      />
                    )}
                  /> */}

          {/* <Controller
            name="contactAddress"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={allPlaces}
                getOptionLabel={(option) => option?.description}
                // onSelect={(event) => event.target.value}
                // getOptionSelected={(option, value) => console.log("option.description : ",option.description)}

                onInputChange={(event, value) => {
                  field.onChange(value);
                  setValue('contactAddress',value);
                  setContactAddressInput(value)
                  console.log("event : ",event.target.innerText);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Contact Address" variant="outlined" />
                )}
              />
            )}
          /> */}


          {/* <ReactSelectController
        control={control}
        name="contactAddress"
        label="Select an Contact Address"
        options={allPlaces}
        getOptionLabel={(option) => option?.description}
      /> */}


          {/* <Controller
                name="contactAddress"
                isClearable
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={allPlaces}
                    getOptionLabel={(option) => option?.description}
                    getOptionValue={(options) => options?.description}
                    onInputChange={(event, value) => {
                      field.onChange(value);
                      setValue('contactAddress',value)
                      // SetContactAddressValue(value)
                      console.log("value : ",value?.prevInputValue,event);
                    }}
                  />
                )}
              /> */}


          <Controller
            control={control}
            name="contactAddress"
            // defaultValue={contactAddressInput ?? ""}
            render={({ field: { onChange, value }, fieldState }) => (
              <FormControl fullWidth>
              <Autocomplete
                fullWidth
                options={allPlaces ? allPlaces : StateList}
                getOptionLabel={(option) => option?.description || localStorage?.getItem('contactAddress')}
                freeSolo
                // defaultValue={contactAddressInput}
                defaultValue={watch('contactAddress') || localStorage?.getItem('contactAddress')}
                filterOptions={(x) => x}
                autoComplete
                includeInputInList
                filterSelectedOptions
                // value={localStorage.getItem("contactAddress") ? localStorage.getItem("contactAddress") : contactAddressInput}
                onChange={(event, value) => {
                  
                  if (value?.description) {
                    console.log("if: ",value?.description,allPlaces);
                    setAllPlaces(allPlaces);
                    setContactAddressInput(value?.description || "");
                  } else {
                    console.log("else: ",value?.description,allPlaces);
                    setValue('contactAddress', null);
                    removeItem('contactAddress')
                  }
                  console.log("test 1 : ", value?.description);
                }}
                onInputChange={(event, value) => {
                  setContactAddressInput(value ? value : contactAddressInput || "");
                  setValue('contactAddress',value ? value : contactAddressInput)
                  // onChange(value ? value : contactAddressInput);
                  console.log("test 2 : ",value, contactAddressInput);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Contact Address"
                    value={watch("contactAddress") || ""}
                  />
                )}
                
              />
              {fieldState?.error && !watch('contactAddress') && (
                <span style={{ color: "#D72A2A",fontSize: '0.75rem' }}>{fieldState?.error?.message}</span>
              )}
              </FormControl>
            )}
            
          />

          {/* 
<Controller
                name="contactAddress"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <ReactSelect
                    options={allPlaces}
                    // getOptionValue={(options) => options?.description}
                    getOptionLabel={(options) => options?.description}
                    onInputChange={(value, event) => {
                      setContactAddressInput(value || "");
                      setValue('contactAddress',value)
                      onChange(value);
                      console.log("test 2 : ",event,value);
                    }}
                  />
                )}
              /> */}

          {/* 
<Controller
        name="contactAddress"
        control={control}
        defaultValue={contactAddressInput}
        render={({ field }) => (
          <Autocomplete
          {...field}
            options={allPlaces}
            getOptionLabel={option => option?.description || ""}
            filterSelectedOptions={option => option?.description == contactAddressInput?.description}
            onSelect={(event) => {
              setContactAddressInput(event.target.value || "");
              setValue('contactAddress',event.target.value)
              setItem('contactAddress', JSON.stringify(event.target.value));
              console.log("test onSelect : ",event.target.value);
            }}
            renderInput={params => <TextField {...params} label="Country" defaultValue={contactAddressInput} value={contactAddressInput} onChange={(event) => {
              setContactAddressInput(event.target.value || "");
              setValue('contactAddress',event.target.value)
              console.log("test 2 : ",event,event.target.value);
            }} />}
          />
        )}
      /> */}


        </div>
      </div>
      <ImageUploadComponent control={control} setValue={setValue} name={"personalDetailDocument"} defaultFile={watch('personalDetailDocument')} setPersonalImage={setPersonalImage} uploadBtnStyle={"personalDetailsUploadBtn"} note={' Note : ( upload documents such as latest commission statements, or acknowledgments, or proof of latest policy sales, etc. )'} />
    </>
  )
})
export default PersonalDetails;