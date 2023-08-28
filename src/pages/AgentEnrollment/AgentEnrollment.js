import React, { useEffect, useRef, useState } from 'react';
import { Button, Container } from '@mui/material';
// import AgentDetails from './Components/AgentDetails';
import PersonalDetails from './Components/PersonalDetails';
import LicensesProduct from './Components/LicensesProduct';
import AffiliationDetails from './Components/AffiliationDetails';
import nextIcon from '../../assets/images/arrow-right.png';
import { useForm } from 'react-hook-form';
import { createAgentAccountPayloadTemplate } from '../../http/services/api-payload-prepare';
import { createAgentAccountApi } from '../../http/services/user.service';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from 'notistack';
import { fetchGooglePlaces } from "../../http/services/map.service";
import moment from 'moment';
import { useLocalStorage } from '../../http/services/local-storage';
import Base64Converter from '../../utils/Base64Converter';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const steps = {
    // 1: "Agent Details",
    1: "Personal Details",
    2: "State Licenses & Product Offering",
    3: "Affiliation Details",
};

const AgentEnrollment = () => {

    const [activeStep, setActiveStep] = useState(1);
    const [personalImage, setPersonalImage] = useState([]);
    const [licenseImage, setLicenseImage] = useState([]);
    const [affiliationImage, setAffiliationImage] = useState([]);
    const [allPlaces, setAllPlaces] = useState([]);
    const [contactAddressInput, setContactAddressInput] = useState();
    const [stateInput, setStateInput] = useState();


    const { getItem, setItem, removeItem } = useLocalStorage();

    const schema1 = yup.object().shape({
        first_name: yup.string().required("First Name is required.").min(3, "First Name must be at least 3 characters."),
        last_name: yup.string().required('Last Name is required.').min(3, "Last Name must be at least 3 characters."),
        // businessPhoneMobile: yup.string()
        // .required("Business Phone Mobile is required.")
        // .matches(/^\d+$/, "Business Phone Mobile must contain only numbers.")
        // .min(10, "Business Phone Mobile must be at least 10 characters."),
        businessPhoneMobile: yup.string().required("Business Phone Mobile is required.")
            .matches(/^(\+1|\+91)\d{10}$/, "Invalid Business Phone Mobile format. It must start with +1 or +91 followed by 10 digits."),

        // yup.string().required("Business Phone Mobile is required."),
        personalPhoneLandline: yup.string()
            .required("Personal Phone Landline is required.")
            .matches(/^(\+1|\+91)\d{10}$/, "Invalid Personal Phone Landline format. It must start with +1 or +91 followed by 10 digits."),
        // yup.string().required("Personal Phone Landline is required"),
        personalDetailEmail: yup.string().required('Email ID is required.'),
        contactAddress: yup.string().required("Contact Address is required").min(1, "enter valid contact address")
    });

    //   const schema2 = yup.object().shape({
    //     state: yup.string().required("State is required."),
    //     insuranceType: yup.string().required('Insurance Type is required.'),
    //     license: yup.string().required("license is required."),
    //     });

    const schema2 = yup.object().shape({
        agent_license: yup.array().of(
            yup.object().shape({
                state_licensed: yup.string().required('State is required'),
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

    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(
            activeStep === 1 ? schema1 : activeStep === 2 ? schema2 : schema3
        ),
        defaultValues: {
            agent_license: [
                {
                    state_licensed: '',
                    insurance_type_supported: '',
                    issue_date: '',
                    expiration_date: '',
                    documents_loc: '',
                    license_identifier: '',
                    cognito_user_id: localStorage.getItem('authCognitoId'),
                },
            ],
            agent_affiliation: [
                {
                    insurance_carrier: '',
                    documents_loc: '',
                    working_since: '',
                    cognito_user_id: localStorage.getItem('authCognitoId'),
                },
            ]
        },
    });
    const { control, handleSubmit, errors, watch, getValues, setValue, register } = form;

    const { PersonalDetailsRef, LicensesProductRef, AffiliationDetailsRef } = useRef();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const cognitoId = searchParams.get('cognitoId');
    const emailId = searchParams.get('emailId');

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    const fetchPlaces = (value) => {
        console.log("getValues() : contactAddress : 3", getValues('contactAddress'), watch('contactAddress'));
        fetchGooglePlaces(value).then((response) => {
            console.log("getValues() : contactAddress : 4", getValues('contactAddress'), watch('contactAddress'));
            setAllPlaces(response)
        })
    }

    useEffect(() => {
        console.log("getValues() : contactAddress : 1", getValues('contactAddress'), watch('contactAddress'));
        if (getValues('contactAddress') || watch('contactAddress')) {
            // setValue('contactAddress',contactAddressInput)
            console.log("getValues() : contactAddress : 2", getValues('contactAddress'), watch('contactAddress'));
            fetchPlaces(localStorage.getItem("contactAddress") ? localStorage.getItem("contactAddress") : getValues('contactAddress') ? getValues('contactAddress') : watch('contactAddress'))
            console.log("getValues() : contactAddress : 5", getValues('contactAddress'), watch('contactAddress'));
        }
        else if (stateInput) {
            fetchPlaces(stateInput)
        }
        console.log("getValues() : contactAddress : 6", getValues('contactAddress'), watch('contactAddress'));
    }, [getValues('contactAddress'), watch('contactAddress')])


    const handleNext = (data) => {
        console.log("red", activeStep);
        if (activeStep == 1) {
            if (data.first_name?.length && data.last_name.length && data.businessPhoneMobile.length && data.personalPhoneLandline.length && data.personalDetailEmail.length && data.contactAddress.length) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }
            else {
                enqueueSnackbar("Please fill required fields", {
                    variant: 'success'
                })
            }
        }
        else
            if (activeStep == 2) {
                //  if(data?.license?.length){
                console.log("red");
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
                //   }
                //   else {
                //     enqueueSnackbar("Please fill required fields", {
                //         variant: 'success'
                //       })
                //   }
            }
            else if (activeStep == 3) {
                handleFormSubmit(data);
            }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const convertBase64 = (file) => {
        // let imageBase64 = [];
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        //     imageBase64.push(reader.result);
        // };
        // reader.onerror = (error) => {
        //     console.log("Error: ", error);
        // };
        // return imageBase64;

        console.log("inside coverter");

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result;
                resolve(base64String);
            };
            reader.onerror = (error) => {
                console.log("Error: ", error);
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }

    // const setBase64ValuesForLicenseDocuments = async (data) => {
    //     for (let i = 0; i < data?.agent_license?.length; i++) {
    //         const licenseDocumentField = data?.agent_license[i].documents_loc;
    //         if (licenseDocumentField) {
    //             try {
    //                 const base64Data = licenseDocumentField instanceof File ? [await convertBase64(licenseDocumentField)] : [];
    //                 data.agent_license[i].documents_loc = base64Data;
    //                 // data.agent_license[i].documents_loc = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOERCQjhGNzExQzI0RkZBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMzA3QzA4QkU0RjMxMUU5OTJGQzk5MkFDRjYzMjM2QyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMzA3QzA4QUU0RjMxMUU5OTJGQzk5MkFDRjYzMjM2QyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2N2ViYTcxMi01Y2QxLTQ3NGEtYWJlNi0zMWNjYTQzNzJkMjUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2OTQ1YTY5OC1mMzFlLWNhNDQtOTgwYS02MTczMmI5NTM1NmEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7oQpO3AAAB0klEQVR42uyXv0vEMBTHk8PFsZtz/RO6WgQpKIguortLb1Jwagd3vQP9A25wFU5w0UUUhKtrZ7euLmIXN4f4zTVTTZrXX3TxweNBmubzzctrk3AhBBvSRmxgG1zAStMX+RuLEFx4WHqUwWfwlPn8xTpOnRoA1EGIlFMshcdVQsgCAA8Q5nCnQcImEBE3FqDgzy2XewYR49pFCLirZm5OMWPrGJwjjtX66yxkiYhqZwACJPxQl1axwWK+5JYsEZ4S7Wrek2IzUgYA96rgxhd9LjNzZHga1VkCHTxfFpXNChGxdsxEOFQBga6YMPucWHi6z0/CPaoAT9OWkeu+yIJOrNvmV5zV7J8bstBYgFuzv1MlyiYgbSWg+BwdYxYTwUcNiuhU7QkUCwyzT1WNCJuAO03bKvyWOPtL7Zg+Jy/BrqF9G1lYWOBz48ZE+RUDIH8iFxaBX/CpmlUGcKg+3dDQX27NdgGAnyFcd3z4oe2GgJ/0AJ/o4H8yAPgxwk2HYPqJCHBZcI+EQTexFyw6PxNiwA+ENUv/LcBfS0vW2bHcBt8pw7u+F/xU9NsH/Knvi8nU0OcA8Ifeb0aAnCNcwT/h3/B3+B7a7/u8GfH/y+nQAn4FGAByoZoilvCTngAAAABJRU5ErkJggg=="]
    //                 // setValue(`agent_license[${i}].licenseDocument`, ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOERCQjhGNzExQzI0RkZBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMzA3QzA4QkU0RjMxMUU5OTJGQzk5MkFDRjYzMjM2QyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMzA3QzA4QUU0RjMxMUU5OTJGQzk5MkFDRjYzMjM2QyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2N2ViYTcxMi01Y2QxLTQ3NGEtYWJlNi0zMWNjYTQzNzJkMjUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2OTQ1YTY5OC1mMzFlLWNhNDQtOTgwYS02MTczMmI5NTM1NmEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7oQpO3AAAB0klEQVR42uyXv0vEMBTHk8PFsZtz/RO6WgQpKIguortLb1Jwagd3vQP9A25wFU5w0UUUhKtrZ7euLmIXN4f4zTVTTZrXX3TxweNBmubzzctrk3AhBBvSRmxgG1zAStMX+RuLEFx4WHqUwWfwlPn8xTpOnRoA1EGIlFMshcdVQsgCAA8Q5nCnQcImEBE3FqDgzy2XewYR49pFCLirZm5OMWPrGJwjjtX66yxkiYhqZwACJPxQl1axwWK+5JYsEZ4S7Wrek2IzUgYA96rgxhd9LjNzZHga1VkCHTxfFpXNChGxdsxEOFQBga6YMPucWHi6z0/CPaoAT9OWkeu+yIJOrNvmV5zV7J8bstBYgFuzv1MlyiYgbSWg+BwdYxYTwUcNiuhU7QkUCwyzT1WNCJuAO03bKvyWOPtL7Zg+Jy/BrqF9G1lYWOBz48ZE+RUDIH8iFxaBX/CpmlUGcKg+3dDQX27NdgGAnyFcd3z4oe2GgJ/0AJ/o4H8yAPgxwk2HYPqJCHBZcI+EQTexFyw6PxNiwA+ENUv/LcBfS0vW2bHcBt8pw7u+F/xU9NsH/Knvi8nU0OcA8Ifeb0aAnCNcwT/h3/B3+B7a7/u8GfH/y+nQAn4FGAByoZoilvCTngAAAABJRU5ErkJggg=="]);
    //                 console.log("check : ",);
    //             } catch (error) {
    //                 console.error('Error converting to base64:', error);
    //             }
    //         }
    //     }
    // };

    // const setBase64ValuesForAffiliationDetailDocument = async (data) => {
    //     for (let i = 0; i < data?.agent_affiliation?.length; i++) {
    //         const licenseDocumentField = data?.agent_affiliation[i].documents_loc;
    //         if (licenseDocumentField) {
    //             try {
    //                 const base64Data = licenseDocumentField instanceof File ? [await convertBase64(licenseDocumentField)] : [];
    //                 data.agent_affiliation[i].documents_loc = base64Data;
    //                 // data.agent_affiliation[i].documents_loc = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOERCQjhGNzExQzI0RkZBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMzA3QzA4QkU0RjMxMUU5OTJGQzk5MkFDRjYzMjM2QyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMzA3QzA4QUU0RjMxMUU5OTJGQzk5MkFDRjYzMjM2QyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2N2ViYTcxMi01Y2QxLTQ3NGEtYWJlNi0zMWNjYTQzNzJkMjUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2OTQ1YTY5OC1mMzFlLWNhNDQtOTgwYS02MTczMmI5NTM1NmEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7oQpO3AAAB0klEQVR42uyXv0vEMBTHk8PFsZtz/RO6WgQpKIguortLb1Jwagd3vQP9A25wFU5w0UUUhKtrZ7euLmIXN4f4zTVTTZrXX3TxweNBmubzzctrk3AhBBvSRmxgG1zAStMX+RuLEFx4WHqUwWfwlPn8xTpOnRoA1EGIlFMshcdVQsgCAA8Q5nCnQcImEBE3FqDgzy2XewYR49pFCLirZm5OMWPrGJwjjtX66yxkiYhqZwACJPxQl1axwWK+5JYsEZ4S7Wrek2IzUgYA96rgxhd9LjNzZHga1VkCHTxfFpXNChGxdsxEOFQBga6YMPucWHi6z0/CPaoAT9OWkeu+yIJOrNvmV5zV7J8bstBYgFuzv1MlyiYgbSWg+BwdYxYTwUcNiuhU7QkUCwyzT1WNCJuAO03bKvyWOPtL7Zg+Jy/BrqF9G1lYWOBz48ZE+RUDIH8iFxaBX/CpmlUGcKg+3dDQX27NdgGAnyFcd3z4oe2GgJ/0AJ/o4H8yAPgxwk2HYPqJCHBZcI+EQTexFyw6PxNiwA+ENUv/LcBfS0vW2bHcBt8pw7u+F/xU9NsH/Knvi8nU0OcA8Ifeb0aAnCNcwT/h3/B3+B7a7/u8GfH/y+nQAn4FGAByoZoilvCTngAAAABJRU5ErkJggg=="]
    //                 // setValue(`agent_affiliation[${i}].affiliationDetailDocument`, ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOERCQjhGNzExQzI0RkZBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMzA3QzA4QkU0RjMxMUU5OTJGQzk5MkFDRjYzMjM2QyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMzA3QzA4QUU0RjMxMUU5OTJGQzk5MkFDRjYzMjM2QyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2N2ViYTcxMi01Y2QxLTQ3NGEtYWJlNi0zMWNjYTQzNzJkMjUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2OTQ1YTY5OC1mMzFlLWNhNDQtOTgwYS02MTczMmI5NTM1NmEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7oQpO3AAAB0klEQVR42uyXv0vEMBTHk8PFsZtz/RO6WgQpKIguortLb1Jwagd3vQP9A25wFU5w0UUUhKtrZ7euLmIXN4f4zTVTTZrXX3TxweNBmubzzctrk3AhBBvSRmxgG1zAStMX+RuLEFx4WHqUwWfwlPn8xTpOnRoA1EGIlFMshcdVQsgCAA8Q5nCnQcImEBE3FqDgzy2XewYR49pFCLirZm5OMWPrGJwjjtX66yxkiYhqZwACJPxQl1axwWK+5JYsEZ4S7Wrek2IzUgYA96rgxhd9LjNzZHga1VkCHTxfFpXNChGxdsxEOFQBga6YMPucWHi6z0/CPaoAT9OWkeu+yIJOrNvmV5zV7J8bstBYgFuzv1MlyiYgbSWg+BwdYxYTwUcNiuhU7QkUCwyzT1WNCJuAO03bKvyWOPtL7Zg+Jy/BrqF9G1lYWOBz48ZE+RUDIH8iFxaBX/CpmlUGcKg+3dDQX27NdgGAnyFcd3z4oe2GgJ/0AJ/o4H8yAPgxwk2HYPqJCHBZcI+EQTexFyw6PxNiwA+ENUv/LcBfS0vW2bHcBt8pw7u+F/xU9NsH/Knvi8nU0OcA8Ifeb0aAnCNcwT/h3/B3+B7a7/u8GfH/y+nQAn4FGAByoZoilvCTngAAAABJRU5ErkJggg=="]);
    //             } catch (error) {
    //                 console.error('Error converting to base64:', error);
    //             }
    //         }
    //     }
    // };


    // const dateConverter = (date) => {
    //     dateConverter(items?.issue_date)
    // }


    const handleFormSubmit = async (data) => {
        console.log("final data : ", data, getValues('agent_license'), getValues('agent_affiliation'));

        const profiled = data?.personalDetailDocument instanceof File ? await convertBase64(data?.personalDetailDocument).then((result) => [result]) : [];
        console.log("run : ", profiled);

        const agentProfilePromise = data?.personalDetailDocument instanceof File ? convertBase64(data?.personalDetailDocument) : null;
        const agentLicensePromises = getValues('agent_license').map((items, index) => {
            return items?.documents_loc instanceof File ? convertBase64(items?.documents_loc) : [];
        });
        const agentAffiliationPromises = getValues('agent_affiliation').map((item, index) => {
            return item?.documents_loc instanceof File ? convertBase64(item?.documents_loc) : null;
        });

        Promise.all([agentProfilePromise, ...agentLicensePromises, ...agentAffiliationPromises])
            .then(([documents_loc, ...agentLicenseDocsAndAffilDocs]) => {
                let newPayload = {
                    agent_Profile: {
                        first_name: data?.first_name,
                        last_name: data.last_name,
                        business_phone_number_type: 'India',
                        business_phone_number: data.businessPhoneMobile,
                        personal_phone_number: data.personalPhoneLandline,
                        personal_phone_number_type: '',
                        email: data.personalDetailEmail,
                        address_line: data.contactAddress,
                        state: data.state,
                        documents_loc: documents_loc ? [documents_loc] : [],
                        // documents_loc:  data?.documents_loc instanceof File ?  convertBase64(data?.documents_loc).then((result) => [result]) : [],
                        cognito_user_id: localStorage.getItem('authCognitoId'),
                    },
                    agent_license: getValues('agent_license').map((items, index) => {
                        return {
                            state_licensed: items?.state_licensed,
                            insurance_type_supported: items?.insurance_type_supported,
                            issue_date: dayjs(items?.issue_date).format("YYYY-MM-DD"),
                            expiration_date: dayjs(items?.expiration_date).format("YYYY-MM-DD"),
                            license_identifier: items?.license_identifier,
                            documents_loc: agentLicenseDocsAndAffilDocs[index]?.length ? [agentLicenseDocsAndAffilDocs[index]] : [],
                            //   documents_loc: items?.documents_loc instanceof File ?  convertBase64(items?.documents_loc).then((result) => [result]) : [],
                            cognito_user_id: localStorage.getItem('authCognitoId'),
                        }
                    }),
                    agent_affiliation: getValues('agent_affiliation').map((item, index) => {
                        return {
                            insurance_carrier: item?.insurance_carrier,
                            insurance_type: "",
                            working_since: item?.working_since,
                            documents_loc: agentLicenseDocsAndAffilDocs[getValues('agent_license')?.length + index] ? [agentLicenseDocsAndAffilDocs[getValues('agent_license').length + index]] : [],
                            // documents_loc: item?.documents_loc instanceof File ?  convertBase64(item?.documents_loc).then((result) => [result]) : [],
                            cognito_user_id: localStorage.getItem('authCognitoId'),
                        }
                    }),
                }


                console.log("values : ", getValues('agent_license'), moment(getValues('agent_license')[0]?.issue_date).format("YYYY-MM-DD"), getValues('agent_affiliation'));
                const payload = createAgentAccountPayloadTemplate(newPayload);
                console.log("payload agentEnrollment : ", payload, getValues('agent_license'), getValues('agent_affiliation'));
                createAgentAccountApi(payload).then(async (res) => {
                    console.log("after response : ", res);
                    if (res?.message == 'User Agent Request Data added') {
                        removeItem('authUser');
                        removeItem('authAwsCred');
                        removeItem('authCognitoId');
                        removeItem('authUserValidated');
                        removeItem('authUserProfile');
                        removeItem('contactAddress');
                        enqueueSnackbar("Please Login to Continue", {
                            variant: 'success'
                        })
                        navigate('/')
                    }
                }).catch((error) => {
                    console.log("errr : ", error);
                    enqueueSnackbar(error.message, {
                        variant: 'error'
                    })
                })
            })
            .catch(error => {
                console.error(error);
            });
    };


    console.log("watch('personalDetailDocument') : ", watch('personalDetailDocument'));


    useEffect(() => {
        console.log(localStorage.getItem("contactAddress"), "localStorage.getItem : ", allPlaces?.find((item) => item?.description == contactAddressInput)?.description && activeStep == 1);
        const selectedContact = allPlaces?.find((item) => item?.description == contactAddressInput)?.description
        if (selectedContact && activeStep == 1) {
            setValue('contactAddress', localStorage.getItem("contactAddress") !== undefined && localStorage.getItem("contactAddress") !== null ? localStorage.getItem("contactAddress") : selectedContact)
            setItem('contactAddress', localStorage.getItem("contactAddress") !== undefined && localStorage.getItem("contactAddress") !== null ? localStorage.getItem("contactAddress") : JSON.stringify(selectedContact));
            console.log("wrong inside")
        }
        else if (localStorage.getItem("contactAddress") && localStorage.getItem("contactAddress") !== undefined && localStorage.getItem("contactAddress") !== null) {
            setValue('contactAddress', localStorage.getItem("contactAddress"))
            console.log("correct inside")
        }
    }, [contactAddressInput, activeStep, localStorage.getItem("contactAddress")])

    // useEffect(() => {
    //     if(watch('licenseDocument')){
    //         console.log("watch('licenseDocument')",watch('licenseDocument'));
    //         convertBase64(watch('licenseDocument'),'licenseDocument')
    //     }
    //    else if(watch('personalDetailDocument')){
    //         console.log("watch('personalDetailDocument')",watch('personalDetailDocument'));
    //         convertBase64(watch('personalDetailDocument'),'personalDetailDocument')
    //     }
    //    else if(watch('affiliationDetailDocument')){
    //         console.log("watch('affiliationDetailDocument')",watch('affiliationDetailDocument'));
    //         convertBase64(watch('affiliationDetailDocument'),'affiliationDetailDocument')
    //     }
    // },[watch('affiliationDetailDocument'),watch('licenseDocument'),watch('personalDetailDocument')])


    const getStepContent = (step) => {
        switch (step) {
            // case 1:
            //     return <AgentDetails
            //         control={control}
            //         emailId={emailId}
            //     />;
            case 1:
                return <PersonalDetails
                    control={control}
                    form={form}
                    errors={errors}
                    ref={PersonalDetailsRef}
                    emailId={emailId}
                    watch={watch}
                    setPersonalImage={setPersonalImage}
                    setValue={setValue}
                    allPlaces={allPlaces}
                    setAllPlaces={setAllPlaces}
                    contactAddressInput={contactAddressInput}
                    setContactAddressInput={setContactAddressInput}
                    fetchPlaces={fetchPlaces}
                />;
            case 2:
                return <LicensesProduct
                    control={control}
                    form={form}
                    errors={errors}
                    ref={LicensesProductRef}
                    setLicenseImage={setLicenseImage}
                    setValue={setValue}
                    allPlaces={allPlaces}
                    setStateInput={setStateInput}
                    getValues={getValues}
                    watch={watch}
                    register={register}
                />;
            case 3:
                return <AffiliationDetails
                    control={control}
                    form={form}
                    errors={errors}
                    ref={AffiliationDetailsRef}
                    setAffiliationImage={setAffiliationImage}
                    getValues={getValues}
                    watch={watch}
                    setValue={setValue}
                    register={register}
                />;
            default:
                return null;
        }
    };


    console.log("initial contactAddress ", watch('contactAddress'));

    return (
        <div className="layout">
            <div className="productHeading">
                <Container>
                    <h1>
                        Agent <span className="span-primary">Enrollment</span>
                    </h1>
                </Container>
            </div>
            <Container className="my-50">
                <section className="applicant-info">
                    <div className="container">
                        <div className="applicant-info-main">
                            <div className="main-step">
                                {steps &&
                                    Object.values(steps).map((value, i) => (
                                        <div
                                            key={i}
                                            className={`applicant-stap ${i >= activeStep ? "inactive" : ""
                                                }`}
                                        >
                                            <div className="stap-count">{i + 1}</div>
                                            <p>{value}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
                <form onSubmit={handleSubmit(handleNext)}>
                    <section className="customer-information">
                        {getStepContent(activeStep)}
                    </section>
                    <div>
                        {activeStep > 1 && (
                            <Button onClick={handleBack}>
                                Back
                            </Button>
                        )}
                        {activeStep < Object.keys(steps).length && (
                            <Button className='nextBtn' type="submit" >
                                <span>Next</span>  <img src={nextIcon} alt="next" />
                            </Button>
                        )}

                        {activeStep === Object.keys(steps).length && (
                            <Button className='nextBtn' type='submit'>
                                <span>Submit</span>
                            </Button>
                        )}
                    </div>
                </form>
            </Container>
        </div>
    );
};

export default AgentEnrollment;
