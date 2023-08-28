import * as AWS from "aws-sdk/global";
import { CognitoIdentityCredentials } from "aws-sdk";
import { environment } from "../../environment/environment"
import { v4 as uuid } from 'uuid';
import { Auth } from "aws-amplify";

export const buildCognitoCreds = (idTokenJwt) => {
	return new Promise((resolve, reject) => {
		let url = "cognito-idp." + environment.aws.region.toLowerCase() + ".amazonaws.com/" + process.env.REACT_APP_USER_POOL_ID;
		let loginMap = {};
		loginMap[url] = idTokenJwt;
		let params = {
			IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID, /* required */
			Logins: loginMap
		};
		AWS.config.region = process.env.REACT_APP_REGION;
		let serviceConfigs = {};
		let cred = new CognitoIdentityCredentials(params, serviceConfigs);
		cred.get(err => {
			if (err) {
				reject(err)
			} else {
				const temCred = {
					_accessKey: cred.accessKeyId,
					_secretAccessKey: cred.secretAccessKey,
					_sessionToken: cred.sessionToken,
					_tokenExpirationDate: cred.expireTime
				}
				// console.log('AWS Temp Cred : ', temCred, cred);
				resolve(temCred)
			}
		})
	})
}


export const cognitoSignUp = (phone_number) => {
	try {
		return Auth.signUp({
			username: uuid().toUpperCase(),
			password: "123456",
			attributes: {
				phone_number: phone_number,
				email: "",
			}
		});
	} catch (error) {
		console.log('error signing up:', error);
	}
}

export const cognitoSignIn = async (phone_number) => {
	
	return Auth.signIn(phone_number)
}

export const cognitoConfirmSignIn = async (user, code) => {
	return Auth.sendCustomChallengeAnswer(user, code);
}

export const cognitoSignOut = async () => {
	return Auth.signOut({ global: true })
}

export const cognitoCurrentSession = () => {
	try {
		return Auth.currentSession();
	} catch (error) {
		// console.log('error signing up:', error);
	}
}

export const cognitoCurrentUser = () => {
	try {
		return Auth.currentAuthenticatedUser({
			bypassCache: true
		});
	} catch (error) {
		// console.log('error signing up:', error);
	}
}

export const cognitoSetMFAPreference = async () => {
	try {
		await Auth.rememberDevice();
	} catch (error) {
		// console.log('error signing up:', error);
	}
}

export const cognitoVerifyContact = (user) => {
	try {
		return Auth.verifiedContact(user);
	} catch (error) {
		// console.log('error signing up:', error);
	}
}

export const cognitoUpdateUserAttributes = (user, obj) => {
	try {
		return Auth.updateUserAttributes(user, obj)
	} catch (error) {
		// console.log('error signing in', error);
	}
}

export const cognitoAttributeVerify = (user, attributeName, code) => {
	try {
		return Auth.verifyUserAttributeSubmit(user, attributeName, code)
	} catch (error) {
		// console.log('error signing in', error);
	}
}

export const cognitoResendOtp = (email) => {
	try {
		return Auth.resendSignUp(email);
	} catch (err) {
		// console.log('error resending code: ', err);
	}
}
