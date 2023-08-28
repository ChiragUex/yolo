import {createContext, useContext, useEffect, useState} from 'react';
import {useLocalStorage} from "../http/services/local-storage";
import {buildCognitoCreds, cognitoSignOut} from "../http/services/cognito.service";
import {getAgentProfileApi, getProfileDetailsApi} from "../http/services/user.service";
import {getAgentProfileDetailsPayloadTemplate, getProfileDetailsPayloadTemplate} from "../http/services/api-payload-prepare";
import {enqueueSnackbar} from "notistack";

export const AuthContext = createContext({
  authUser: null,
  setAuthUser: () => {},
});


export const useAuth = () => {
  
  const { authUser, setAuthUser } = useContext(AuthContext);

  const { getItem, setItem, removeItem } = useLocalStorage();
  let expirationDuration = null
  let tokenExpirationTimer = null



  // useEffect(() => {
  //   if(authUser){
  //   const payload = getAgentProfileDetailsPayloadTemplate();
  //   getAgentProfileApi(payload).then((response) => {
  //     console.log("getAgentProfileDetailsPayloadTemplate response authcontext : ", response);
  //     setItem('agentProfileData', JSON.stringify(response?.profile));
  //     if(response?.profile?.agent_verification_status !== "approved" && response?.profile?.agent_verification_status !== "rejected"){
  //       navigate('/warning')
  //     }
  //   })
  //     .catch((error) => {
  //       console.log("error : ", error);
  //     })
  //   }
  // }, [authUser]);

  const login = async (user) => {
    
    try {
      console.log("user : ",user?.attributes?.email);
      setItem('authUser', JSON.stringify(user));
      setItem('authCognitoId', user.signInUserSession.getIdToken().payload.sub);
      const awsCred = await buildCognitoCreds(user.signInUserSession.getIdToken().getJwtToken())
      setItem('authAwsCred', JSON.stringify(awsCred));
      const profilePayload = getProfileDetailsPayloadTemplate(user?.attributes?.email)
      console.log("getProfileDetailsPayloadTemplate : ",profilePayload);
      let validateUser = await getProfileDetailsApi(profilePayload)
      console.log("agent data login : ",validateUser,awsCred,user);
     
      setItem('authUserValidated', false);
      
      if (validateUser.isExistUser == true) {
        setAuthUser(user)
        setItem('authUserValidated', true)
        setItem('authUserProfile', JSON.stringify(validateUser.user));
        startAutoLogoutTimer();
        enqueueSnackbar("Login successful.!", {
        variant: 'success'
      })
      }
      else{
        setItem('authUserValidated', false)
      }
      
    } catch (err) {
      const customLogoutMessage = "Logout Something went wrong.!"
      // logout(customLogoutMessage, "error");
    }
  };

  const startAutoLogoutTimer = () => {
   let awsCred = getItem('authAwsCred');
   if (awsCred) {
     awsCred = JSON.parse(awsCred);
     expirationDuration = new Date(awsCred._tokenExpirationDate).getTime() - new Date().getTime();
     sessionAutoLogoutTimer(expirationDuration);
   }
  }

  const logout = (customLogoutMessage = null, customVariant = null) => {
    removeItem('authUser');
    removeItem('authAwsCred');
    removeItem('authCognitoId');
    removeItem('authUserValidated');
    removeItem('authUserProfile');
    removeItem('contactAddress');
    removeItem('agentProfileDetails');
    removeItem('agentProfileData');
    const otherItemsToRemove = Object.keys(localStorage).filter(item => item.includes('aws.cognito.identity') || item.includes('CognitoIdentityServiceProvider'));
    otherItemsToRemove.forEach(k => localStorage.removeItem(k))
    if (tokenExpirationTimer) {
      clearTimeout(tokenExpirationTimer);
      tokenExpirationTimer = null;
    }
    cognitoSignOut().then(() => {})
    setAuthUser(null)
    enqueueSnackbar( customLogoutMessage ?? "Logout successful.!", {
      variant: customVariant ?? 'success'
    })
  };

  const sessionAutoLogoutTimer = (expirationDuration) => {
    if (!tokenExpirationTimer) {
      tokenExpirationTimer = setTimeout(() => {
        logout("Token expired, Auto logout successful.!", "warning");
      
        
      }, (expirationDuration - 300000))
    }
  };

  const sessionAutoLogoutTimerClear = () => {
    if (tokenExpirationTimer) {
      clearTimeout(tokenExpirationTimer);
      tokenExpirationTimer = null;
    }
  };

  const getCognitoId = () => {
    return authUser
  };

  const isLoggedIn = () => !!getItem('authUser') && !!getItem('authAwsCred') && !!getItem('authCognitoId')

  return {isLoggedIn, login, logout,getCognitoId, startAutoLogoutTimer, sessionAutoLogoutTimerClear, authUser, setAuthUser};
};
