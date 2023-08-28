import { Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import uploadIcon from "../assets/images/file-upload-icon.svg"
import { IconButton } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { Controller } from "react-hook-form";
import { enqueueSnackbar } from "notistack";

const ImageUploadComponent = ({ note, control, name, quotes, uploadBtnStyle, uploadBtnDiv, defaultFile, setValue, setPersonalImage, setLicenseImage, setAffiliationImage, status, disabled, page  }) => {


    const [selectedDocument, setSelectedDocument] = useState();
    const [base64Image, setBase64Image] = useState('');

    const fileInputRef = useRef(null);

    const handleUploadButtonClick = () => {
        fileInputRef.current && fileInputRef.current.click();
    };

    // console.log("documents_loc" , defaultFile);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 10 * 1024 * 1024) {
          enqueueSnackbar("File size exceed, file must be less than 10 mb.", {
          variant: "error"
        })
            return;
          }
          else{
            setSelectedDocument(file)
          }
        // console.log("test1", file);
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        //   setBase64Image(reader.result);
        //   console.log("test1",reader.result);
        //   return reader.result;
        // };
        // reader.onerror = (error) => {
        //   console.log("Error: ", error);
        // };
    };

    useEffect(() => {
        if (defaultFile?.length || defaultFile instanceof File) {
            if(defaultFile instanceof File && defaultFile.size > 10 * 1024 * 1024) {
                enqueueSnackbar("File size exceed, file must be less than 10 mb.", {
                variant: "error"
                    })
                  return;
                }
                else{
                  setSelectedDocument(defaultFile)
                }
        }
    }, [defaultFile])


    const handleRemoveFile = () => {
        setSelectedDocument(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        if (defaultFile?.length) {
            setSelectedDocument("")
            setValue(name, [])
        }
    };


    // console.log(`working file  : ${name}`,selectedDocument);


    return (
        <div className="d-flex gap-20 flex-wrap formFieldSpacing">
            <Grid container
                justifyContent='flex-start'
                alignItems='center' spacing={3}>
                <Grid item>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    disabled={disabled}
                                    onChange={(event) => {
                                        onChange(event.target.files[0]);
                                        handleFileInputChange(event);
                                    }}
                                    onBlur={onBlur}
                                    accept={name == "profile_picture" ? "image/png,image/jpg,image/jpeg" : "image/png,image/jpg,image/jpeg,application/pdf"}
                                />
                            </>
                        )}
                    />
                    {
                        selectedDocument && page  !== "new" ? (
                            <div>
                                <img src={defaultFile?.length ? defaultFile : URL.createObjectURL(selectedDocument)} alt="Selected Document" width="150px" height="130px" />
                                {
                                    page != "updateProfile" &&
                                <IconButton className="remove-button" onClick={handleRemoveFile} style={{ display: status == "accepted" ? 'none' : disabled && 'none' }}>
                                    <Cancel />
                                </IconButton>
                                }
                            </div>
                        ) 
                        
                        :
                        page == "new" ?
                        (
                            <div>
                                <img src={defaultFile?.length ? defaultFile : URL.createObjectURL(selectedDocument)} alt="Selected Document" width="100px" height="100px" style={{borderRadius:'50px'}} />
                                {
                                    page != "updateProfile" &&
                                <IconButton className="remove-button" onClick={handleRemoveFile} style={{ display: status == "accepted" ? 'none' : disabled && 'none' }}>
                                    <Cancel />
                                </IconButton>
                                }
                            </div>
                        )
                        :
                        (
                            <div className="uploadIcon" onClick={handleUploadButtonClick}>
                                <img src={uploadIcon} alt="Upload Icon" width="70px" height="70px" />
                            </div>
                        )
                    }
                </Grid>
                <Grid item>
                    <Grid
                        container
                        direction='row'
                        justifyContent='center'
                        alignItems='center'
                        spacing={10}
                    >
                        <Grid item >
                            <div className={uploadBtnDiv ? uploadBtnDiv : ""} style={{ display: status == "accepted" ? 'none' : disabled && 'none' }}>
                                <p className={quotes ? "uploadQuoteButton" : uploadBtnStyle ? uploadBtnStyle : "uploadButton"} onClick={handleUploadButtonClick}>Upload Image</p>
                                <Typography>
                                    {note}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
export default ImageUploadComponent;
