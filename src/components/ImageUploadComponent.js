import { Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import uploadIcon from "../assets/images/file-upload-icon.svg"
import profileIcon from "../assets/images/profile-thumb.svg"
import { IconButton } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { Controller } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';


const ImageUploadComponent = ({ note, control, name, quotes, uploadBtnStyle, uploadBtnDiv, defaultFile, setValue, setPersonalImage, setLicenseImage, setAffiliationImage, status, disabled, page }) => {


    const [selectedDocument, setSelectedDocument] = useState();

    const fileInputRef = useRef(null);

    const handleUploadButtonClick = () => {
        fileInputRef.current && fileInputRef.current.click();
    };


    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 10 * 1024 * 1024) {
            enqueueSnackbar("File size exceed, file must be less than 10 mb.", {
                variant: "error"
            })
            return;
        }
        else {
            setSelectedDocument(file)
        }
    };

    useEffect(() => {
        if (defaultFile?.length || defaultFile instanceof File) {
            if (defaultFile instanceof File && defaultFile.size > 10 * 1024 * 1024) {
                enqueueSnackbar("File size exceed, file must be less than 10 mb.", {
                    variant: "error"
                })
                return;
            }
            else {
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



    return (
        <div className="d-flex gap-20 flex-wrap formFieldSpacing">
            <Grid container
                justifyContent='flex-start'
                alignItems='center' spacing={3}>
                <Grid item md={page && 12}>
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
                        page == "profilePicture" ?
                            (
                                <>
                                    <div onClick={handleUploadButtonClick}>
                                        {selectedDocument?.type === 'application/pdf' ?
                                            <>
                                                <Grid container
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center">
                                                    <Grid item>
                                                        <PictureAsPdfIcon style={{ width: '100px', height: "130px" }} color="primary" />
                                                    </Grid>
                                                    <Grid item>
                                                        <span>{selectedDocument?.name}</span>
                                                    </Grid>
                                                </Grid>
                                            </>
                                            :
                                            selectedDocument?.type === 'doc' || selectedDocument?.type === 'docx' || selectedDocument?.type === 'application/msword' ?
                                                <>
                                                    <DescriptionIcon style={{ width: '100px', height: "130px" }} color="primary" />
                                                    <span>{selectedDocument?.name}</span>
                                                </>
                                                :
                                                <img src={defaultFile?.length ? defaultFile : selectedDocument instanceof Blob || selectedDocument instanceof File ? URL.createObjectURL(selectedDocument) : profileIcon} alt="Upload Icon" width="120px" height="120px" style={{ borderRadius: '50%' }} />
                                        }
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="start"
                                            alignItems="center"
                                            ml={5}
                                        >
                                            <EditIcon color="primary" /> <span>Edit</span>
                                        </Grid>
                                    </div>
                                </>
                            )
                            :
                            page == "new" ?
                                (
                                    <div className="uploadIcon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'dashed 1px #000', width: '100%', height: 'auto', minHeight: '200px', minWidth: '650px' }} onClick={handleUploadButtonClick}>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            alignContent={"center"}
                                            spacing={3}
                                        >
                                            <Grid item>
                                                {
                                                    selectedDocument ?
                                                        <div>
                                                            {selectedDocument?.type === 'application/pdf' ?
                                                                <>
                                                                    <Grid
                                                                        container
                                                                        direction="column"
                                                                        justifyContent="center"
                                                                        alignItems="center">
                                                                        <Grid item>
                                                                            <PictureAsPdfIcon style={{ width: '100px', height: "130px" }} color="primary" />
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <span>{selectedDocument?.name}</span>
                                                                        </Grid>
                                                                    </Grid>
                                                                </>
                                                                :
                                                                selectedDocument?.type === 'doc' || selectedDocument?.type === 'docx' || selectedDocument?.type === 'application/msword' ?
                                                                    <DescriptionIcon style={{ width: '100px', height: "130px" }} color="primary" />
                                                                    :
                                                                    <img src={selectedDocument instanceof Blob || selectedDocument instanceof File ? URL.createObjectURL(selectedDocument) : defaultFile?.length ? defaultFile : uploadIcon} alt="Selected Document" width="120px" height="100px" />
                                                            }
                                                            {
                                                                page != "updateProfile" &&
                                                                <IconButton className="remove-button" onClick={handleRemoveFile} style={{ display: status == "accepted" ? 'none' : disabled && 'none' }}>
                                                                    <Cancel />
                                                                </IconButton>
                                                            }
                                                        </div>
                                                        :
                                                        !defaultFile?.length ?
                                                            <img src={uploadIcon} alt="Selected Document" width="120px" height="100px" />
                                                            :
                                                            !selectedDocument &&
                                                            <>
                                                                <CloudUploadIcon color="primary" fontSize="20px" />
                                                                <p>Click to Upload</p>
                                                            </>
                                                }
                                            </Grid>
                                        </Grid>
                                    </div>
                                )
                                :
                                selectedDocument && page !== "new" && page !== "profilePicture" ? (
                                    <div>
                                        {selectedDocument?.type === 'application/pdf' ?
                                            <>
                                                <Grid container
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center">
                                                    <Grid item>
                                                        <PictureAsPdfIcon style={{ width: '100px', height: "130px" }} color="primary" />
                                                    </Grid>
                                                    <Grid item>
                                                        <span>{selectedDocument?.name}</span>
                                                    </Grid>
                                                </Grid>
                                            </>
                                            :
                                            selectedDocument?.type === 'doc' || selectedDocument?.type === 'docx' || selectedDocument?.type === 'application/msword' ?
                                                <DescriptionIcon style={{ width: '100px', height: "130px" }} color="primary" />
                                                :
                                                <img src={defaultFile?.length ? defaultFile : URL.createObjectURL(selectedDocument)} alt="Selected Document" width="150px" height="130px" />
                                        }
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
                {
                    page !== "new" && page !== "profilePicture" &&
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
                }
            </Grid>
        </div>
    )
}
export default ImageUploadComponent;

