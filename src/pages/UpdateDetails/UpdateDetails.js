import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import InputFieldController from "../../components/FormControls/InputFieldController";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import LeadDetailsAccordion from "../../components/LeadDetailsAccordion";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ImageUploadComponent from "../../components/ImageUploadComponent";
import { useLocalStorage } from "../../http/services/local-storage";
import { useContext, useEffect, useState } from "react";
import { getAgentProfileDetailsPayloadTemplate, updateAgentProfileAffiliationDetailsPayloadTemplate, updateAgentProfileLicenseDetailsPayloadTemplate, updateAgentProfilePersonalDetailsPayloadTemplate, updateProfilePicturePayloadTemplate } from "../../http/services/api-payload-prepare";
import Base64Converter from "../../utils/Base64Converter";
import { getAgentProfileApi, getPersonalProfileDetailsApi, updateAffiliationProfileDetailsApi, updateLiceseProfileDetailsApi, updatePersonalProfileDetailsApi, updateProfilePictureApi } from "../../http/services/user.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from 'dayjs';
import LoaderContext from "../../context/LoaderContext";
import Loader from "../../components/Loader";
import { handleMobileValidate } from "../../validations";
import { Add, HighlightOff, ExpandMore } from '@mui/icons-material';
import StateList from "../../constants/StateList";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from "@mui/icons-material/Edit";


const UpdateDetails = () => {

    const agentProfileDetails = JSON.parse(localStorage.getItem('agentProfileDetails'));

    const [disableProfilePicture, setDisableProfilePicture] = useState(true);
    const [disablePersonalDetails, setDisablePersonalDetails] = useState(true);
    const [disableLicenceDetails, setDisableLicenceDetails] = useState(agentProfileDetails?.agentLicense.length && Array(agentProfileDetails?.agentLicense.length).fill(true));
    const [disableAffiliationDetails, setDisableAffiliationDetails] = useState(agentProfileDetails?.agentAffiliation.length && Array(agentProfileDetails?.agentAffiliation.length).fill(true));
    const [expandUpdateDetailsAccordion, setExpandUpdateDetailsAccordion] = useState(false)
    const [accordionFormIndex, setAccordionFormIndex] = useState();
    const [iconType, setIconType] = useState("edit");
    const [formName, setFormName] = useState("");
    const [numForms, setNumForms] = useState(0);

    const navigate = useNavigate();
    const { getItem, setItem } = useLocalStorage();

    const { isLoader, setIsLoader } = useContext(LoaderContext);

    const schema1 = yup.object().shape({
        first_name: yup.string().required("First Name is required.").min(3, "First Name must be at least 3 characters."),
        last_name: yup.string().required('Last Name is required.').min(3, "Last Name must be at least 3 characters."),
        businessPhoneMobile: yup.string().required("Business Phone Mobile is required.")
            .matches(/^(\+1|\+91)\d{10}$/, "Invalid Business Phone Mobile format. It must start with +1 or +91 followed by 10 digits."),
        personalPhoneLandline: yup.string()
            .required("Personal Phone Landline is required.")
            .matches(/^(\+1|\+91)\d{10}$/, "Invalid Personal Phone Landline format. It must start with +1 or +91 followed by 10 digits."),
        personalDetailEmail: yup.string().required('Email ID is required.'),
        contactAddress: yup.string().required("Contact Address is required").min(1, "enter valid contact address")
    });


    const schema2 = yup.object().shape({
        agent_license: yup.array().of(
            yup.object().shape({
                // state_licensed: yup.string().required('State is required'),
                insurance_type_supported: yup.string().required('Insurance type is required'),
                issue_date: yup.date().required('Issue date is required'),
                expiration_date: yup.date().required('Expiration date is required'),
                // documents_loc: yup.array().of(yup.string()).required('License document is required'),
                license_identifier: yup.string().required('License is required').min(15, "License must be atleast 15 character"),
            })
        ),
    });

    const schema3 = yup.object().shape({
        agent_affiliation: yup.array().of(
            yup.object().shape({
                insurance_carrier: yup.string().required("Company Name is required.").min(3, "Company Name must be atleast 3 character"),
                working_since: yup
                    .number()
                    .typeError("Years must be a number.")
                    .nullable()
                    .required("Years is required.")
                    .min(1, "Years must be at least 1."),
                // working_since: yup.string().required('Years is required.'),
                // documents_loc: yup.array().of(yup.string()).required('License document is required'),
            })
        ),
    });



    const form = useForm({
        resolver: yupResolver(
            formName == "savePeronalDetails" ? schema1 : formName == "saveLicenseDetails" ? schema2 : schema3
        ),
        defaultValues: {
            first_name: agentProfileDetails?.profile?.first_name,
            last_name: agentProfileDetails?.profile?.last_name,
            businessPhoneMobile: agentProfileDetails?.profile?.business_phone_number,
            personalPhoneLandline: agentProfileDetails?.profile?.personal_phone_number,
            personalDetailEmail: agentProfileDetails?.profile?.email,
            contactAddress: agentProfileDetails?.profile?.address_line,
        }
    });

    // console.log("formNameformName : ",formName);

    const { control, handleSubmit, trigger, errors, watch, getValues, setValue, formState } = form;

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: 'agent_affiliations'
    //   });

    //   const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: 'agent_licenses'
    //   });

    const {
        fields: affiliationsFields,
        append: appendAffiliations,
        remove: removeAffiliations
    } = useFieldArray({
        control,
        name: 'new_agent_affiliation'
    });

    const {
        fields: licensesFields,
        append: appendLicenses,
        remove: removeLicenses
    } = useFieldArray({
        control,
        name: 'new_agent_license'
    });

    const insuranceTypes = [
        { type: "Auto Insurance" },
        { type: "Health Insurance" },
        { type: "Home Insurance" },
        { type: "Flood Insurance" },
    ]


    const handleEditIconClick = (editIcon, accordionIndex) => {
        // console.log("working", editIcon)
        if (editIcon == "editProfilePicture") {
            setDisableProfilePicture(false);
        }
        else if (editIcon == "editPeronalDetails") {
            setDisablePersonalDetails(false);
        }
        else if (editIcon == `editAffiliationDetails${accordionIndex}`) {
            setExpandUpdateDetailsAccordion(true);
            setDisableAffiliationDetails(prevStates => {
                const newStates = [...prevStates];
                newStates[accordionIndex] = false;
                return newStates;
            });
        }
        else if (editIcon == `editLicenseDetails${accordionIndex}`) {
            setDisableLicenceDetails(prevStates => {
                const newStates = [...prevStates];
                newStates[accordionIndex] = false;
                return newStates;
            });
        }
    }

    const handleSaveIconClick = async (editIcon, accordionIndex) => {
        setAccordionFormIndex(accordionIndex)
        if (editIcon == "saveProfilePicture") {
            setDisableProfilePicture(true);
            handleUpdateProfilePicture(getValues());
        }
        else if (editIcon == "savePeronalDetails") {
            setFormName("savePeronalDetails");
            const fieldsToValidated = ["first_name", "last_name", "businessPhoneMobile", "personalPhoneLandline", "personalDetailEmail", "contactAddress"]
            // await trigger();

            if (await trigger(fieldsToValidated)) {

                setDisablePersonalDetails(true);

                handleUpdatePersonalDetails(getValues());

            }
            // handleSubmit(handleUpdatePersonalDetails(getValues()));
        }
        else if (editIcon == `saveAffiliationDetails${accordionIndex}`) {
            setFormName("saveAffiliationDetails")
            const fieldsToValidated = [
                `agent_affiliation[${accordionIndex}].insurance_carrier`,
                `agent_affiliation[${accordionIndex}].working_since`
            ]

            if (await trigger(fieldsToValidated)) {
                setExpandUpdateDetailsAccordion(false)
                // console.log("saveAffiliationDetails : working2",getValues(),formState.dirtyFields);
                setDisableAffiliationDetails(prevStates => {
                    const newStates = [...prevStates];
                    newStates[accordionIndex] = true;
                    return newStates;
                });
                // if(formState?.isDirty){
                handleUpdateAffiliationUpdate(getValues(), accordionIndex);
                // }
            }
        }
        else if (editIcon == `saveLicenseDetails${accordionIndex}`) {
            setFormName("saveLicenseDetails");
            const fieldsToValidate = [
                `agent_license[${accordionIndex}].license_identifier`,
                `agent_license[${accordionIndex}].issue_date`,
                `agent_license[${accordionIndex}].expiration_date`,
                `agent_license[${accordionIndex}].insurance_type_supported`
            ];
            // await trigger(fieldsToValidate);

            // console.log("handleUpdateLicenseDetails : working1",getValues(),);
            console.log("formState : ", formState?.isDirty, formState?.dirtyFields, Object.keys(formState.dirtyFields).length);
            if (await trigger(fieldsToValidate)) {
                // console.log("handleUpdateLicenseDetails : working2",getValues());
                setDisableLicenceDetails(prevStates => {
                    const newStates = [...prevStates];
                    newStates[accordionIndex] = true;
                    return newStates;
                });
                // if(formState?.isDirty){
                handleUpdateLicenseDetails(getValues(), accordionIndex);
                // }
            }
        }
    }

    const getProfileDetailsApis = () => {

        const payload = getAgentProfileDetailsPayloadTemplate();

        getAgentProfileApi(payload).then((response) => {
            console.log("getAgentProfileDetailsPayloadTemplate response : ", response);
            setItem('agentProfileDetails', JSON.stringify(response));
            setItem('agentProfileData', JSON.stringify(response?.profile));
            if (response?.profile?.agent_verification_status == "pending") {
                navigate('/warning/notapproved')
                return;
            }
            else if(response?.agentLicense?.find(item => item.license_verification_status == "reject" || response?.agentLicense?.find(item => item.license_verification_status == "pending"))){
                navigate('/warning/rejected')
                return;
            }
            else {
                navigate('/update-details')
                return;
            }
        })
            .catch((error) => {
                console.log("error : ", error);
            })
    }



    const handleUpdateProfilePicture = async (data) => {

         console.log("clicked handleSubmit(handleUpdateProfilePicture)() : ", watch("profile_picture"));
        
         if (data?.profile_picture instanceof File || watch("profile_picture") instanceof File) {
            setIsLoader(true)
            const profilepic = data?.profile_picture instanceof File || watch("profile_picture") instanceof File ? await Base64Converter(data?.profile_picture ? data?.profile_picture : watch("profile_picture")) : [];
            const profilePicturePayload = updateProfilePicturePayloadTemplate(profilepic);
            console.log("profilePicturePayload : ", profilePicturePayload);
            updateProfilePictureApi(profilePicturePayload).then((response) => {
                setIsLoader(false)
                console.log("updateProfilePictureApi response : ", response)
                getProfileDetailsApis();
                enqueueSnackbar(response?.message, {
                    variant: 'success'
                })
            }).catch((error) => {
                setIsLoader(false)
                console.log("error : ", error)
                enqueueSnackbar(error?.message, {
                    variant: 'warning'
                })
            })
        }
    }

    useEffect(() => {
        if(watch("profile_picture") instanceof File){
            handleUpdateProfilePicture(watch("profile_picture"))
        }
    },[watch("profile_picture")])

  
    const handleUpdatePersonalDetails = async (data) => {

        setIsLoader(true)

        const agentPersonalDetails = {
            agent_Profile: {
                first_name: data?.first_name,
                last_name: data?.last_name,
                business_phone_number_type: 'India',
                business_phone_number: (data?.businessPhoneMobile.includes("+1") || data?.businessPhoneMobile.includes("+91")) ? data?.businessPhoneMobile : '+1' + data?.businessPhoneMobile,
                personal_phone_number: (data?.personalPhoneLandline.includes("+1") || data?.personalPhoneLandline.includes("+91")) ? data?.personalPhoneLandline : '+1' + data?.personalPhoneLandline,
                personal_phone_number_type: '',
                email: data?.personalDetailEmail,
                address_line: data?.contactAddress,
                state: data?.state,
                documents_loc: data?.personalDetailDocument instanceof File ? [await Base64Converter(data?.personalDetailDocument)] : [],
                cognito_user_id: localStorage.getItem('authCognitoId'),
            }
        }


        // console.log("inside handleUpdatePersonalDetails : ", agentPersonalDetails, data);

        // if (!(data?.personalDetailDocument instanceof File)) {
        //     delete agentPersonalDetails?.agent_Profile?.documents_loc;
        //   }          

        const personalProfileUpdateDetailsPayload = updateAgentProfilePersonalDetailsPayloadTemplate(agentPersonalDetails);
        // console.log("personalProfileUpdateDetailsPayload : ", personalProfileUpdateDetailsPayload);
        if (formState?.isDirty || watch('personalDetailDocument') instanceof File || Object.keys(formState.dirtyFields).length > 0) {
            updatePersonalProfileDetailsApi(personalProfileUpdateDetailsPayload).then((response) => {
                setIsLoader(false)
                // console.log("getPersonalProfileDetailsApi response : ", response)
                getProfileDetailsApis();
                enqueueSnackbar(response?.message, {
                    variant: 'success'
                })
            }).catch((error) => {
                setIsLoader(false)
                console.log("error : ", error?.message)
                enqueueSnackbar(error?.message, {
                    variant: 'warning'
                })
            })
        }
        else {
            setIsLoader(false)
        }
    }

    const handleAddLicenseDetails = async (data, accordionIndex) => {

        console.log("handleAddLicenseDetails : inside", data, accordionIndex);

        setIsLoader(true);

        // const agent_license_sequenceIds = agentProfileDetails?.agentLicense?.map((data) => data?.sequence_id) || [];

        const agentLicenseDetails = {
            agent_license: await Promise.all(data?.new_agent_license?.map(async (data, index) => {
                return {
                    state_licensed: data?.state_licensed,
                    insurance_type_supported: data?.insurance_type_supported,
                    issue_date: dayjs(data?.issue_date).format("YYYY-MM-DD"),
                    expiration_date: dayjs(data?.expiration_date).format("YYYY-MM-DD"),
                    documents_loc: data?.documents_loc instanceof File ? [await Base64Converter(data?.documents_loc)] : [],
                    license_identifier: data?.license_identifier,
                    sequence_id: 0,
                    cognito_user_id: localStorage.getItem('authCognitoId'),
                }
            })) || []
        };


        const newAgentLicenseDetails = {
            agent_license: agentLicenseDetails?.agent_license
        }

        console.log("newAgentLicenseDetails : ", newAgentLicenseDetails, agentLicenseDetails?.agent_license);

        const licenseProfileUpdateDetailsPayload = updateAgentProfileLicenseDetailsPayloadTemplate(newAgentLicenseDetails);
        console.log("abc licenseProfileUpdateDetailsPayload   : ", licenseProfileUpdateDetailsPayload);

        updateLiceseProfileDetailsApi(licenseProfileUpdateDetailsPayload).then((response) => {
            setIsLoader(false)
            console.log("updateLiceseProfileDetailsApi response : ", response)
            getProfileDetailsApis();
            enqueueSnackbar(response?.message, {
                variant: 'success'
            })
        }).catch((error) => {
            setIsLoader(false)
            console.log("error : ", error)
            enqueueSnackbar(error?.message, {
                variant: 'warning'
            })
        })
    }

    const handleUpdateLicenseDetails = async (data, accordionIndex) => {

        console.log("handleUpdateLicenseDetails : inside", data, accordionIndex);

        setIsLoader(true);

        const agent_license_sequenceIds = agentProfileDetails?.agentLicense?.map((data) => data?.sequence_id) || [];

        const agentLicenseDetails = {
            agent_license: await Promise.all(data?.agent_license?.map(async (data, index) => {
                return {
                    state_licensed: data?.state_licensed,
                    insurance_type_supported: data?.insurance_type_supported,
                    issue_date: dayjs(data?.issue_date).format("YYYY-MM-DD"),
                    expiration_date: dayjs(data?.expiration_date).format("YYYY-MM-DD"),
                    documents_loc: data?.documents_loc instanceof File ? [await Base64Converter(data?.documents_loc)] : [],
                    license_identifier: data?.license_identifier,
                    sequence_id: agent_license_sequenceIds[index],
                    cognito_user_id: localStorage.getItem('authCognitoId'),
                }
            })) || []
        };

        const newAgentLicenseDetails = {
            agent_license: [agentLicenseDetails?.agent_license[accordionIndex]]
        }

        const licenseProfileUpdateDetailsPayload = updateAgentProfileLicenseDetailsPayloadTemplate(newAgentLicenseDetails);
        console.log("licenseProfileUpdateDetailsPayload   : ", licenseProfileUpdateDetailsPayload);

        if (formState?.isDirty || watch(`agent_license[${accordionFormIndex}].documents_loc`) instanceof File || Object.keys(formState.dirtyFields).length > 0) {
            updateLiceseProfileDetailsApi(licenseProfileUpdateDetailsPayload).then((response) => {
                setIsLoader(false)
                // console.log("updateLiceseProfileDetailsApi response : ", response)
                getProfileDetailsApis();
                enqueueSnackbar(response?.message, {
                    variant: 'success'
                })
            }).catch((error) => {
                setIsLoader(false)
                console.log("error : ", error)
                enqueueSnackbar(error?.message, {
                    variant: 'warning'
                })
            })
        }
        else {
            setIsLoader(false);
        }

        setIsLoader(false);
    }

    const handleAddAffiliation = async (data, accordionIndex) => {

        console.log(" handleAddAffiliation : ", data, accordionIndex);

        setIsLoader(true);

        //   const agent_affiliation_sequenceIds = agentProfileDetails?.agentAffiliation?.map((data) => data?.sequence_id) || [];

        const affiliationProfileUpdateDetails = {
            agent_affiliation: await Promise.all(data?.new_agent_affiliation?.map(async (data, index) => {
                return {
                    insurance_carrier: data?.insurance_carrier,
                    insurance_type: "",
                    working_since: data?.working_since,
                    sequence_id: 0,
                    documents_loc: data?.documents_loc instanceof File ? [await Base64Converter(data?.documents_loc)] : [],
                    cognito_user_id: localStorage.getItem('authCognitoId'),
                }
            })) || []
        };

        const newAffiliationProfileUpdateDetails = {
            agent_affiliation: affiliationProfileUpdateDetails?.agent_affiliation
        }

        // console.log("alldata : ", affiliationProfileUpdateDetails, newAffiliationProfileUpdateDetails);

        const affiliationProfileUpdateDetailsPayload = updateAgentProfileAffiliationDetailsPayloadTemplate(newAffiliationProfileUpdateDetails);

        updateAffiliationProfileDetailsApi(affiliationProfileUpdateDetailsPayload).then((response) => {
            setIsLoader(false)
            console.log("updateAffiliationProfileDetailsApi response : ", response)
            getProfileDetailsApis();
            enqueueSnackbar(response?.message, {
                variant: 'success'
            })
        }).catch((error) => {
            setIsLoader(false)
            console.log("error : ", error)
            enqueueSnackbar(error?.message, {
                variant: 'warning'
            })
        })
    }


    const handleUpdateAffiliationUpdate = async (data, accordionIndex) => {

        // console.log(" handleUpdateProfile : ", data, accordionIndex);

        setIsLoader(true);

        const agent_affiliation_sequenceIds = agentProfileDetails?.agentAffiliation?.map((data) => data?.sequence_id) || [];

        const affiliationProfileUpdateDetails = {
            agent_affiliation: await Promise.all(data?.agent_affiliation?.map(async (data, index) => {
                return {
                    insurance_carrier: data?.insurance_carrier,
                    insurance_type: "",
                    working_since: data?.working_since,
                    sequence_id: agent_affiliation_sequenceIds[index],
                    documents_loc: data?.documents_loc instanceof File ? [await Base64Converter(data?.documents_loc)] : [],
                    cognito_user_id: localStorage.getItem('authCognitoId'),
                }
            })) || []
        };

        const newAffiliationProfileUpdateDetails = {
            agent_affiliation: [affiliationProfileUpdateDetails?.agent_affiliation[accordionIndex]]
        }

        // console.log("alldata : ", affiliationProfileUpdateDetails, newAffiliationProfileUpdateDetails);

        const affiliationProfileUpdateDetailsPayload = updateAgentProfileAffiliationDetailsPayloadTemplate(newAffiliationProfileUpdateDetails);
        // console.log("affiliationProfileUpdateDetailsPayload : ", affiliationProfileUpdateDetailsPayload);
        if (formState?.isDirty || watch(`agent_affiliation[${accordionFormIndex}].documents_loc`) instanceof File || Object.keys(formState.dirtyFields).length > 0) {
            updateAffiliationProfileDetailsApi(affiliationProfileUpdateDetailsPayload).then((response) => {
                setIsLoader(false)
                // console.log("updateAffiliationProfileDetailsApi response : ", response)
                getProfileDetailsApis();
                enqueueSnackbar(response?.message, {
                    variant: 'success'
                })
            }).catch((error) => {
                setIsLoader(false)
                console.log("error : ", error)
                enqueueSnackbar(error?.message, {
                    variant: 'warning'
                })
            })
        }
        else {
            setIsLoader(false)
        }
    }


    console.log("agentProfileDetails : ",agentProfileDetails,watch('agent_affiliations'));

    return (
        <>
            <div className="d-flex gap-30 card-main-dashboard">
                {
                    isLoader ? <Loader loaderTransform="loaderTransform" />
                        :
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            mt={5}
                        >
                            <Grid item md={12}>
                                {/* <div className="layout"> */}
                                {/* <form onSubmit={handleSubmit(handleUpdateProfile)}> */}
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    alignContent={"center"}
                                    spacing={3}
                                >
                                    <Grid item>
                                        <h3>Edit Profile</h3>
                                    </Grid>
                                    <Grid item>
                                        {/* <Button className='nextBtn' type="submit">
                                    <span><EditIcon style={{fontSize:'20px'}} /></span>
                                    <span>Submit</span>
                                </Button> */}
                                    </Grid>
                                </Grid>

                                {/* <Grid item md={12} mb={5}>
                                    <form onSubmit={handleSubmit(handleUpdateProfilePicture)}>
                                        <LeadDetailsAccordion title={"Profile Picture"} expanded={false} editIcon={disableProfilePicture ? "editProfilePicture" : "saveProfilePicture"} handleEditIconClick={handleEditIconClick} handleSaveIconClick={handleSaveIconClick} handleUpdateProfilePicture={handleUpdateProfilePicture} expandUpdateDetailsAccordion={!disableProfilePicture}>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="start"
                                                alignItems="center"
                                            >
                                                <Grid item md={12}>
                                                    <ImageUploadComponent control={control} defaultFile={watch("profile_picture") ? watch("profile_picture") : agentProfileDetails?.profile?.profile_picture} setValue={setValue} name={"profile_picture"} uploadBtnDiv={"personalDetailsUpdateUploadBtnDiv"} note={' Note : ( Upload profile picture. )'} disabled={disableProfilePicture} page={"updateProfile"} />
                                                </Grid>
                                            </Grid>
                                        </LeadDetailsAccordion>
                                    </form>
                                </Grid> */}


                                <Grid item md={12}>
                                    <form onSubmit={handleSubmit(handleUpdatePersonalDetails)}>
                                        <LeadDetailsAccordion title={"Personal Details"} expanded={true} editIcon={disablePersonalDetails ? "editPeronalDetails" : "savePeronalDetails"} handleEditIconClick={handleEditIconClick} handleSaveIconClick={handleSaveIconClick} handleUpdateDetails={handleUpdatePersonalDetails} expandUpdateDetailsAccordion={!disablePersonalDetails} getValues={getValues} handleSubmit={handleSubmit} trigger={trigger}>
                                            <Grid
                                                container
                                                direction="row"
                                            >
                                                <Grid item md={2}>
                                                    <ImageUploadComponent control={control} defaultFile={watch("profile_picture") ? watch("profile_picture") : agentProfileDetails?.profile?.profile_picture} setValue={setValue} name={"profile_picture"} uploadBtnDiv={"personalDetailsUpdateUploadBtnDiv"} note={' Note : ( Upload profile picture. )'} page={"profilePicture"} />
                                                </Grid>
                                                <Grid item md={10}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="start"
                                                        alignItems="center"
                                                        spacing={5}
                                                    >
                                                        <Grid item md={6}>
                                                            <InputFieldController
                                                                control={control}
                                                                fullWidth
                                                                name="first_name"
                                                                label="First Name*"
                                                                placeholder="Enter First Name"
                                                                variant="standard"
                                                                disabled={disablePersonalDetails}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <InputFieldController
                                                                control={control}
                                                                fullWidth
                                                                name="last_name"
                                                                label="Last Name*"
                                                                placeholder="Enter Last Name"
                                                                variant="standard"
                                                                disabled={disablePersonalDetails}
                                                            />
                                                        </Grid>

                                                        <Grid item md={6}>
                                                        
                                                            <Controller
                                                                name="businessPhoneMobile"
                                                                control={control}
                                                                rules={{
                                                                    required: "Phone is required!",
                                                                    validate: (value) =>
                                                                        handleMobileValidate(value)
                                                                            ? null
                                                                            : "Phone number must starts with +1 or +91 followed by 10 digit number only!",
                                                                }}
                                                                render={({
                                                                    field: { onChange, value },
                                                                    fieldState: { error },
                                                                }) => (
                                                                    <TextField
                                                                        id="businessPhoneMobile"
                                                                        name="businessPhoneMobile"
                                                                        label="Business Phone Mobile"
                                                                        variant="standard"
                                                                        margin="normal"
                                                                        color="secondary"
                                                                        type="text"
                                                                        disabled={disablePersonalDetails}
                                                                        value={value}
                                                                        error={!!error}
                                                                        placeholder="Enter Business Phone Mobile"
                                                                        onChange={(event) => {
                                                                            const newValue = event.target.value;
                                                                            if (/^[0-9\+]*$/.test(newValue) && newValue?.length < 14) {
                                                                                onChange(event);
                                                                            }
                                                                        }}
                                                                        fullWidth
                                                                        InputLabelProps={{
                                                                            classes: { focused: "hello-world", root: "world" },
                                                                        }}
                                                                        helperText={error ? error.message : null}
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            {/* <InputFieldController
                                                    control={control}
                                                    fullWidth
                                                    name="personalPhoneLandline"
                                                    label="Personal Phone Landline"
                                                    placeholder="Enter Personal Phone Landline"
                                                    variant="standard"
                                                    disabled={disablePersonalDetails}
                                                /> */}

                                                            <Controller
                                                                name="personalPhoneLandline"
                                                                control={control}
                                                                rules={{
                                                                    required: "Phone is required!",
                                                                    validate: (value) =>
                                                                        handleMobileValidate(value)
                                                                            ? null
                                                                            : "Phone number must starts with +1 or +91 followed by 10 digit number only!",
                                                                }}
                                                                render={({
                                                                    field: { onChange, value },
                                                                    fieldState: { error },
                                                                }) => (
                                                                    <TextField
                                                                        id="businessPhoneMobile"
                                                                        name="personalPhoneLandline"
                                                                        label="Personal Phone Landline"
                                                                        placeholder="Enter Personal Phone Landline"
                                                                        variant="standard"
                                                                        disabled={disablePersonalDetails}
                                                                        margin="normal"
                                                                        color="secondary"
                                                                        type="text"
                                                                        value={value}
                                                                        error={!!error}
                                                                        onChange={(event) => {
                                                                            const newValue = event.target.value;
                                                                            if (/^[0-9\+]*$/.test(newValue) && newValue?.length < 14) {
                                                                                onChange(event);
                                                                            }
                                                                        }}
                                                                        fullWidth
                                                                        InputLabelProps={{
                                                                            classes: { focused: "hello-world", root: "world" },
                                                                        }}
                                                                        helperText={error ? error.message : null}
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>

                                                        <Grid item md={6}>
                                                            <InputFieldController
                                                                control={control}
                                                                fullWidth
                                                                name="personalDetailEmail"
                                                                label="Email ID*"
                                                                placeholder="Enter Email ID"
                                                                variant="standard"
                                                                disabled={true}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <InputFieldController
                                                                control={control}
                                                                fullWidth
                                                                name="contactAddress"
                                                                label="Contact Address"
                                                                placeholder="Enter Contact Address"
                                                                variant="standard"
                                                                disabled={disablePersonalDetails}
                                                            />
                                                        </Grid>

                                                        <Grid item md={12}>
                                                            <h3>Documents</h3>
                                                            <ImageUploadComponent control={control} defaultFile={watch("personalDetailDocument") ? watch("personalDetailDocument") : agentProfileDetails?.profile?.documents_loc[0]} setValue={setValue} name={"personalDetailDocument"} uploadBtnDiv={"personalDetailsUpdateUploadBtnDiv"} note={' Note : ( upload documents such as latest commission statements, or acknowledgments, or proof of latest policy sales, etc.)'} disabled={disablePersonalDetails} page={"new"} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </LeadDetailsAccordion>
                                    </form>
                                </Grid>

                                <Grid item md={12}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        alignContent={"center"}
                                        spacing={3}
                                    >
                                        <Grid item>
                                            <h3>State Licenses & Product Offering</h3>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={() => appendLicenses({
                                                state_licensed: '',
                                                insurance_type_supported: '',
                                                issue_date: '',
                                                expiration_date: '',
                                                documents_loc: '',
                                                license_identifier: '',
                                                cognito_user_id: localStorage.getItem('authCognitoId'),
                                            })}><Add /> Add</Button>
                                        </Grid>
                                    </Grid>
                                    <form onSubmit={handleSubmit(handleUpdateLicenseDetails)}>
                                        {
                                            agentProfileDetails?.agentLicense.map((data, index) => {
                                                return (
                                                    <>
                                                        <LeadDetailsAccordion title={data?.state_licensed} status={data?.license_verification_status == "reject" ? "rejected" : data?.license_verification_status == "pending" ? "pending" : "accepted"} accordionIndex={index} editIcon={disableLicenceDetails[index] ? `editLicenseDetails${index}` : `saveLicenseDetails${index}`} handleEditIconClick={handleEditIconClick} handleSaveIconClick={handleSaveIconClick} expandUpdateDetailsAccordion={!disableLicenceDetails[index]}>
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="start"
                                                                alignItems="center"
                                                                spacing={5}
                                                            >
                                                                <Grid item md={6}>
                                                                    <Controller
                                                                        name={`agent_license[${index}].insurance_type_supported`}
                                                                        control={control}
                                                                        defaultValue={data?.insurance_type_supported ? data?.insurance_type_supported : ""}
                                                                        render={({ field, fieldState }) => (
                                                                            <FormControl fullWidth>
                                                                                <InputLabel id="state-label">Insurance Type*</InputLabel>
                                                                                <Select
                                                                                    {...field}
                                                                                    labelId="state-label"
                                                                                    label="Insurance Type*"
                                                                                    variant="standard"
                                                                                    disabled={disableLicenceDetails[index]}
                                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                                >
                                                                                    {insuranceTypes?.map((item, index) => {
                                                                                        return (
                                                                                            <MenuItem value={item?.type} key={index}>
                                                                                                {item?.type}
                                                                                            </MenuItem>
                                                                                        );
                                                                                    })}
                                                                                </Select>
                                                                                {fieldState?.error && (
                                                                                    <span style={{ color: "#D72A2A", fontSize: '0.75rem' }}>{fieldState?.error?.message}</span>
                                                                                )}
                                                                            </FormControl>
                                                                        )}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={6}>
                                                                    <InputFieldController
                                                                        control={control}
                                                                        fullWidth
                                                                        name={`agent_license[${index}].license_identifier`}
                                                                        defaultValue={data?.license_identifier ? data?.license_identifier : ""}
                                                                        label="License*"
                                                                        placeholder="Enter License Number"
                                                                        variant="standard"
                                                                        disabled={disableLicenceDetails[index]}
                                                                    />
                                                                </Grid>

                                                                <Grid item md={6}>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <Controller
                                                                            name={`agent_license[${index}].issue_date`}
                                                                            control={control}
                                                                            defaultValue={data?.issue_date ? dayjs(data?.issue_date) : null}
                                                                            render={({ field: { onChange, value }, fieldState }) => (
                                                                                <FormControl fullWidth>
                                                                                    <DatePicker
                                                                                        label="Issue Date"
                                                                                        value={value || (data?.issue_date ? dayjs(data?.issue_date) : null)}
                                                                                        onChange={onChange}
                                                                                        className='datePicker'
                                                                                        variant="standard"
                                                                                        format="YYYY-MM-DD"
                                                                                        disabled={disableLicenceDetails[index]}
                                                                                        renderInput={(params) => (
                                                                                            <TextField
                                                                                                {...params}
                                                                                                variant="standard"
                                                                                            />
                                                                                        )}
                                                                                    />
                                                                                    {fieldState?.error && (
                                                                                        <span style={{ color: "#D72A2A", fontSize: '0.75rem' }}>{fieldState?.error?.message}</span>
                                                                                    )}
                                                                                </FormControl>
                                                                            )}
                                                                        />
                                                                    </LocalizationProvider>

                                                                </Grid>
                                                                <Grid item md={6}>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <Controller
                                                                            name={`agent_license[${index}].expiration_date`}
                                                                            control={control}
                                                                            defaultValue={data?.expiration_date ? dayjs(data?.expiration_date) : null}
                                                                            render={({ field: { onChange, value }, fieldState }) => (
                                                                                <FormControl fullWidth>
                                                                                    <DatePicker
                                                                                        label="Expiration Date"
                                                                                        value={value || (data?.expiration_date ? dayjs(data?.expiration_date) : null)}
                                                                                        onChange={onChange}
                                                                                        format="YYYY-MM-DD"
                                                                                        className='datePicker'
                                                                                        disabled={disableLicenceDetails[index]}
                                                                                        renderInput={(params) => (
                                                                                            <TextField
                                                                                                {...params}
                                                                                                variant="standard"
                                                                                            />
                                                                                        )}
                                                                                        minDate={dayjs(watch(`agent_license[${index}].issue_date`)) ? dayjs(watch(`agent_license[${index}].issue_date`)) : ""}
                                                                                    />
                                                                                    {fieldState?.error && (
                                                                                        <span style={{ color: "#D72A2A", fontSize: '0.75rem' }}>{fieldState?.error?.message}</span>
                                                                                    )}
                                                                                </FormControl>
                                                                            )}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </Grid>
                                                                <Grid item md={12}>
                                                                    <h3>Documents</h3>
                                                                    <ImageUploadComponent control={control} setValue={setValue} name={`agent_license[${index}].documents_loc`} defaultFile={watch(`agent_license[${index}].documents_loc`) ? watch(`agent_license[${index}].documents_loc`) : data?.documents_loc[0]} note={'Note:(Driving license or a passport)'} status={data.license_verification_status == "reject" ? "rejected" : "accepted"} disabled={disableLicenceDetails[index]} page={"new"} />
                                                                </Grid>
                                                            </Grid>
                                                        </LeadDetailsAccordion>
                                                    </>
                                                )
                                            })
                                        }
                                    </form>

                                    <form onSubmit={handleSubmit(handleAddLicenseDetails)}>
                                        {licensesFields.map((accordion, index) => (
                                            <Accordion key={accordion.id} className='accordion' >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMore />}
                                                    aria-controls={`panel${index + 1}-content`}
                                                    id={`panel${index + 1}-header`}
                                                >
                                                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                                        <div>
                                                            <Typography>Personal data </Typography>
                                                        </div>
                                                        <div>
                                                            <Button type="submit"><SaveIcon style={{ fontSize: '30px' }} /></Button>
                                                            <Button onClick={() => removeLicenses(index)}>
                                                                <HighlightOff />
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {/* Render your form fields within each accordion */}
                                                    <div className="d-flex gap-20 flex-wrap inputFieldSpacing">
                                                        <div className="customer-information-input">
                                                            <Controller
                                                                name={`new_agent_license[${index}].state_licensed`}
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
                                                                            <span style={{ color: "#D72A2A", fontSize: '0.75rem' }}>{fieldState?.error?.message}</span>
                                                                        )}
                                                                    </FormControl>
                                                                )}
                                                            />
                                                        </div>

                                                        <div className="customer-information-input">
                                                            <Controller
                                                                name={`new_agent_license[${index}].insurance_type_supported`}
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
                                                                            <span style={{ color: "#D72A2A", fontSize: '0.75rem' }}>{fieldState?.error?.message}</span>
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
                                                                    name={`new_agent_license[${index}].issue_date`}
                                                                    control={control}
                                                                    render={({ field: { onChange, value } }) => (
                                                                        <FormControl fullWidth>
                                                                            <DatePicker
                                                                                label="Issue Date"
                                                                                value={value}
                                                                                onChange={(dateValue) => { onChange(dateValue) }}
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
                                                                    name={`new_agent_license[${index}].expiration_date`}
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
                                                                                minDate={watch(`new_agent_license[${index}].issue_date`) || ""}
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
                                                            name={`new_agent_license[${index}].license_identifier`}
                                                            label="License*"
                                                            placeholder="Enter License Number"
                                                        />
                                                    </div>
                                                    <ImageUploadComponent
                                                        control={control}
                                                        setValue={setValue}
                                                        name={`new_agent_license[${index}].documents_loc`}
                                                        //   setLicenseImage={setLicenseImage}
                                                        note={'Note:(Driving license or a passport)'}
                                                        defaultFile={watch(`new_agent_license[${index}].documents_loc`)}
                                                        page={"new"}
                                                    />
                                                </AccordionDetails>
                                            </Accordion>
                                        ))}
                                    </form>
                                </Grid>

                                <Grid item md={12}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        alignContent={"center"}
                                        spacing={3}
                                    >
                                        <Grid item>
                                            <h3>Affiliation Details</h3>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={() => {
                                                appendAffiliations({
                                                    insurance_carrier: '',
                                                    documents_loc: '',
                                                    working_since: '',
                                                    cognito_user_id: localStorage.getItem('authCognitoId'),
                                                })
                                            }}><Add /> Add</Button>
                                        </Grid>
                                    </Grid>
                                    <form onSubmit={handleSubmit(handleUpdateAffiliationUpdate)}>
                                        {
                                            agentProfileDetails?.agentAffiliation.map((data, index) => {
                                                return (
                                                    <>
                                                        <LeadDetailsAccordion title={`Company ${index + 1}`} accordionIndex={index} editIcon={disableAffiliationDetails[index] ? `editAffiliationDetails${index}` : `saveAffiliationDetails${index}`} handleEditIconClick={handleEditIconClick} handleSaveIconClick={handleSaveIconClick} expandUpdateDetailsAccordion={!disableAffiliationDetails[index]} >
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="start"
                                                                alignItems="center"
                                                                spacing={5}
                                                            >
                                                                <Grid item md={6}>
                                                                    <InputFieldController
                                                                        control={control}
                                                                        fullWidth
                                                                        // name="companyName"
                                                                        name={`agent_affiliation[${index}].insurance_carrier`}
                                                                        label="Company Name*"
                                                                        placeholder="Enter Company Name"
                                                                        variant="standard"
                                                                        defaultValue={data?.insurance_carrier ? data?.insurance_carrier : ""}
                                                                        disabled={disableAffiliationDetails[index]}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={6}>
                                                                    {/* <InputFieldController
                                                                    control={control}
                                                                    fullWidth
                                                                    // name="years"
                                                                    name={`agent_affiliation[${index}].working_since`}
                                                                    label="Number of Years*"
                                                                    placeholder="Enter Number of Years"
                                                                    type="number"
                                                                    variant="standard"
                                                                    defaultValue={data?.working_since ? data?.working_since : ""}
                                                                    disabled={disableAffiliationDetails[index]}
                                                                /> */}
                                                                    <InputFieldController
                                                                        control={control}
                                                                        fullWidth
                                                                        defaultValue={data?.working_since ? data?.working_since : ""}
                                                                        disabled={disableAffiliationDetails[index]}
                                                                        variant="standard"
                                                                        name={`agent_affiliation[${index}].working_since`}
                                                                        type="number"
                                                                        label="Number of Years*"
                                                                        placeholder="Enter Number of Years"
                                                                    />
                                                                </Grid>

                                                                <Grid item md={12}>
                                                                    <h3>Documents</h3>
                                                                    <ImageUploadComponent control={control} name={`agent_affiliation[${index}].documents_loc`} defaultFile={watch(`agent_affiliation[${index}].documents_loc`) ? watch(`agent_affiliation[${index}].documents_loc`) : data?.documents_loc[0]} setValue={setValue} note={'Note:(Driving license or a passport)'} disabled={disableAffiliationDetails[index]} page={"new"} />
                                                                </Grid>
                                                            </Grid>
                                                        </LeadDetailsAccordion>
                                                    </>
                                                )
                                            })}

                                    </form>

                                    <form onSubmit={handleSubmit(handleAddAffiliation)}>
                                        {affiliationsFields.map((_, index) => (
                                            <Accordion key={index} className='accordion'>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMore />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                                        <div>
                                                            <Typography>Company Details</Typography>
                                                        </div>
                                                        <div>
                                                            <Button type="submit"><SaveIcon style={{ fontSize: '30px' }} /></Button>
                                                            <Button onClick={() => { removeAffiliations(index); console.log("remove : ", watch('new_agent_affiliation')) }}>
                                                                <HighlightOff />
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <div className="d-flex gap-20 flex-wrap">
                                                        <div className="customer-information-input">
                                                            <InputFieldController
                                                                control={control}
                                                                // size="small"
                                                                fullWidth
                                                                name={`new_agent_affiliation[${index}].insurance_carrier`}
                                                                label="Company Name*"
                                                                placeholder="Enter Company Name"
                                                            //   ref={register()}
                                                            />
                                                        </div>
                                                        <div className="customer-information-input">
                                                            <InputFieldController
                                                                control={control}
                                                                fullWidth
                                                                name={`new_agent_affiliation[${index}].working_since`}
                                                                label="Number of Years*"
                                                                placeholder="Enter Number of Years"
                                                            //   ref={register()}
                                                            />
                                                        </div>
                                                    </div>

                                                    <ImageUploadComponent
                                                        control={control}
                                                        name={`new_agent_affiliation[${index}].documents_loc`}
                                                        //   setAffiliationImage={setAffiliationImage} 
                                                        setValue={setValue}
                                                        note={'Note:(Driving license or a passport)'}
                                                        defaultFile={watch(`new_agent_affiliation[${index}].documents_loc`)}
                                                        page={"new"}
                                                    />

                                                </AccordionDetails>
                                            </Accordion>
                                        ))}

                                    </form>
                                </Grid>
                                {/* </div> */}
                                {/* </form> */}
                            </Grid>
                        </Grid>
                }
            </div>
        </>
    )
}

export default UpdateDetails;

