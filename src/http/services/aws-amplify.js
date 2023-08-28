import {Amplify, Auth} from 'aws-amplify';

export const AwsAmplifyInit = () => {
	Amplify.configure({
		Auth: {
			identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
			userPoolId: process.env.REACT_APP_USER_POOL_ID,
			userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID, //=> agentClientId, we had to use webClientId as per the library
			region: process.env.REACT_APP_REGION
		},
		authenticationFlowType: "CUSTOM_AUTH"
	});
	Auth.configure({
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID, //=> agentClientId, we had to use webClientId as per the library
    region: process.env.REACT_APP_REGION
  });
}

export default AwsAmplifyInit;
