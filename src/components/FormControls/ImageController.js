// import React, { useState, useEffect } from 'react';

// import { createStyles, makeStyles } from '@mui/styles';

// import { useDropzone } from 'react-dropzone';

// import DeleteIcon from '@mui/icons-material/Delete';
// import { toast } from 'react-toastify';
// import AddImage from '../../../Assets/add_photo.svg';
// import { useTranslation } from 'react-i18next';

// export default function ImageController(props) {
//   const {
//     name,
//     filesLimit = 0,
//     form,
//     errors,
//   } = props;



//   const [files, setFiles] = useState([]);

//   const [image,setImage] = useState("")

//   const { setValue, clearErrors, trigger, register } = form;

//   const formValues = form.getValues();


//   const classes = useStyles();
//   const { t } = useTranslation();

//   useEffect(() => {
//     if (formValues[name]) {
//       setFiles(formValues[name].map((f) => ({ ...f, edit: true })));
//     }
//     setImage(props?.image)
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: 'image/*',

//     onDrop: (file) => {
//       const files = [...(formValues[name] || []), ...file].map((file) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       );

//       if (files.length > filesLimit)
//         return toast.warning(`User can only upload ${filesLimit} images.`);

//       uploadFilesOverServer(files);

//       setFiles(files);
//     },
//   });

//   const uploadFilesOverServer = (files) => {
//     if (files.length === 0) {
//       setValue(name, '', { shouldDirty: true });
//     } else {
//       setValue(name, files, { shouldDirty: true });

//       clearErrors([name]);
//     }
//   };

//   const removeImage = (e, index) => {
//     e.stopPropagation();

//     let files = [...(formValues[name] || [])];

//     files.splice(index, 1);

//     setValue(name, files, { shouldDirty: true });

//     setFiles(files);
//   };

//   const thumbs = (type = 'new') =>
//     (files || [])

//       .filter((file) => (type === 'new' ? !file.edit : file.edit))

//       .map((file, index) => (
//         <div className={`p-2 ${classes.imageContainer}`} key={index}>
//           <div style={{ height: 90 }}>
//             <img
//               src={file.preview}
//               height="90px"
//               className={classes.thumb}
//               alt=""
//               style={{ height: 90 }}
//             />
//           </div>

//           <div
//             onClick={(e) => removeImage(e, index)}
//             className={classes.deleteIcon}
//           >
//             <DeleteIcon />
//           </div>
//         </div>
//       ));

//   return (
//     <>
//     {
//       files.length && files?.filter((f) => !f.edit)?.length && !image ?
//       <div className={classes.newThumbsContainer}>{thumbs()}</div>
//       :
//       !files.length && !files?.filter((f) => !f.edit)?.length &&  !files?.filter((f) => f.edit)?.length && !image ?
//       <div {...getRootProps({ className: 'dropzone' })}>
//         <input {...register('file')} {...getInputProps()} />
//         <div className={classes.fileTextContainer}>
      
//           <img src={AddImage} alt="" />

//           <p>{t('common.dnd')}</p>

//           <button type="button" className={classes.fileBtn}>
//             {t('common.chooseFile')}
//           </button>
//         </div>
//       </div>
//       :
//         !image ?
//         <div className={classes.newThumbsContainer}>{thumbs('edit')}</div>
//         : 
//         <div className={`p-2 ${classes.imageContainer}`}>
//         <div style={{ height: 90 }}>
//           <img
//             src={image}
//             height="90px"
//             className={classes.thumb}
//             alt=""
//             style={{ height: 90 }}
//           />
//         </div>

//         <div
//           onClick={(e) => setImage("")}
//           className={classes.deleteIcon}
//         >
//           <DeleteIcon />
//         </div>
//       </div>
// }


//       {errors?.hasOwnProperty(name) ? (
//         <p style={{ color: 'red', fontSize: '0.75rem' }}>
//           {t('common.thisRequired')}
//         </p>
//       ) : (
//         ''
//       )}
//     </>
//   );
// }

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     newThumbsContainer: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       zIndex: 1,
//       position: 'relative',
//       minHeight: '117px',
//       width: '117px',
//       height: '117px',
//       margin: 'auto',
//       padding: '10px',
//     },

//     uploadedThumbContainer: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       zIndex: 1,
//       position: 'absolute',
//       top: 10,
//       left: 10,
//       minHeight: '117px',
//       width: '117px',
//       height: '117px',
//       margin: 'auto',
//       padding: '10px',
//     },

//     fileTextContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'column',
//       borderRadius: '8px',
//       border: '1px dashed #D0D5DD',
//       boxSizing: 'border-box',
//       cursor: 'pointer',
//       minHeight: '117px',
//       width: '117px',
//       height: '117px',
//       margin: 'auto',
//       padding: '10px',
//       position: 'relative',
//       '& p': {
//         fontWeight: 300,
//         fontSize: '10px',
//         color: '#8D98AF',
//         textAlign: 'center',
//       },
//     },

//     fileBtn: {
//       opacity: 0,
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       zIndex: 0,
//       border: 'none',
//       backgroundColor: 'rgba(239, 255, 248, 1)',
//       padding: '12px 28px',
//       color: '#22aa6f',
//       cursor: 'pointer',
//       borderRadius: '6px',
//       fontWeight: 'bold',
//     },

//     editThumbsContainer: {
//       display: 'flex',
//       border: '1px solid rgba(213, 213, 213, 1)',
//       padding: '10px',
//       flexWrap: 'wrap',
//     },

//     imageContainer: {
//       position: 'relative',
//       height: 90,
//     },

//     thumb: {
//       objectFit: 'contain',
//     },

//     deleteIcon: { position: 'absolute', top: 0, right: 0, cursor: 'pointer', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' },
//   })
// );
