import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg'
import notapprovedImage from '../assets/images/notapproved.png'
import rejectedImage from '../assets/images/rejected.png'
import { getAgentProfileDetailsPayloadTemplate } from '../http/services/api-payload-prepare';
import { useLocalStorage } from '../http/services/local-storage';
import { getAgentProfileApi } from '../http/services/user.service';

const Warning = () => {

    const location = useLocation();
    const { getItem, setItem } = useLocalStorage();
    const navigate = useNavigate();

    const [status,setStatus] = useState('');

   const path = location?.pathname;

   useEffect(() => {
    const payload = getAgentProfileDetailsPayloadTemplate();
    getAgentProfileApi(payload).then((response) => {
      console.log("getAgentProfileDetailsPayloadTemplate response : ", response);
      setItem('agentProfileDetails',JSON.stringify(response));
      setItem('agentProfileData', JSON.stringify(response?.profile));
      // console.log("testtttt : ",response?.agentLicense?.find(item => item.license_verification_status == "reject"));
      if(response?.profile?.agent_verification_status == "pending"){
        navigate('/warning/notapproved')
        return;
      }
      else if(response?.agentLicense?.find(item => item.license_verification_status == "reject" || response?.agentLicense?.find(item => item.license_verification_status == "pending"))){
        navigate('/warning/rejected')
        return;
      }
      else{
        navigate('/dashboard')
        return;
      }
    })
      .catch((error) => {
        console.log("error : ", error);
      })

    if(path.includes('notapproved')){
        setStatus('notApproved')
    }
    else if(path.includes('rejected')){
        setStatus('profileRejected')
    }
   },[])


  
    
    return (
        <>
            <div className="layout">
                {/* <div className="d-flex gap-30 card-main-dashboard"> */}
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    spacing={5}
                    mt={5}
                    mb={3}
                >
                    <Grid item md={12}>
                        <h1>Welcome to </h1>
                        <img
                            width="300px"
                            alt="Angular Logo"
                            src={logo}
                        />
                        </Grid>
                        <Grid item md={12}>
                        <img
                            // width="300px"
                            alt="Angular Logo"
                            src={status == 'notApproved' ? notapprovedImage : rejectedImage}
                        />
                        {
                            status == 'notApproved' ?
                                <>
                                    <h3>Thank you for choosing us for your business extension.</h3>
                                    <Typography className='warningPageText'>Your Profile is under review.</Typography>
                                    <Typography className='warningPageText'>You will be able to view once your profile is approved.</Typography>
                                </>
                                :
                              status == 'profileRejected' &&
                                <>
                                    <h2>Sorry. Your profile has been rejected by Admin. Please update your profile</h2>
                                    <Button color='primary' onClick={() => navigate('/update-details')}>Update Now</Button>
                                </>
                        }
                    </Grid>
                </Grid>
            </div>
            {/* </div> */}
        </>
    )
}

export default Warning;