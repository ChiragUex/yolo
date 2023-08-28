import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.PROTOCOL}${process.env.API_URL}`;

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (data, thunkAPI) => {
//     const { loginKey, pin, orgCode } = data;

//     const sessionId = await validateOrgCode(orgCode);
//     console.log("sessionIdRes", sessionId);
//     if (!sessionId) return { status: false };

//     const generatedPayload = await Encryption.loginUserWithPin(
//       loginKey,
//       pin,
//       sessionId
//     );

//     if (generatedPayload?.status === "success") {
//       const loginAPICall = await axios.post(
//         `${API_URL}/auth/login`,
//         { user_id: generatedPayload.user_id },
//         {
//           headers: {
//             Authorization: `Signature ${encodeURIComponent(
//               generatedPayload.signature
//             )}`,
//           },
//           withCredentials: true,
//         }
//       );
//       initOneSignal(
//         loginAPICall.data.data.user_id,
//         loginAPICall.data.data.notification_auth
//       );
//       const loginSuccessCallbackForKeyStore =
//         await Encryption.loginSuccessCallback(loginAPICall.data.data);

//       if (loginSuccessCallbackForKeyStore?.status === "success") {
//         return {
//           status: true,
//           keystoreRes: loginSuccessCallbackForKeyStore,
//           loginRes: loginAPICall.data.data,
//           generatedPayload,
//         };
//       } else {
//         return {
//           status: false,
//           keystoreRes: loginSuccessCallbackForKeyStore,
//           loginRes: loginAPICall.data.data,
//           generatedPayload,
//         };
//       }
//     } else {
//       return {
//         status: false,
//         generatedPayload,
//       };
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (data, thunkAPI) => {
//     const { salt, orgCode } = data;
//     try {
//       const sessionId = await validateOrgCode(orgCode);
//       console.log("sessionIdRes", sessionId);
//       if (!sessionId) return { status: false };

//       const generatedPayload = await Encryption.createUserKey(salt, sessionId);

//       console.log("generatedPayload", generatedPayload);

//       if (generatedPayload?.status === "success") {
//         const signUpAPICall = await axios.post(
//           `${API_URL}/auth/signup`,
//           {
//             user_id: generatedPayload.user_id,
//             pub_key_1: generatedPayload.pub_key_1,
//             pub_key_2: generatedPayload.pub_key_2,
//             pe_key_2: generatedPayload.pe_key_2,
//           },
//           {
//             headers: {
//               Authorization: `Signature ${encodeURIComponent(
//                 generatedPayload.signature
//               )}`,
//             },
//             withCredentials: true,
//           }
//         );
//         const loginSuccessCallbackForKeyStore =
//           await Encryption.loginSuccessCallback(signUpAPICall.data.data);
//         if (loginSuccessCallbackForKeyStore.status === "success") {
//           return {
//             status: true,
//             keystoreRes: loginSuccessCallbackForKeyStore,
//             loginRes: signUpAPICall.data.data,
//             generatedPayload,
//           };
//         } else {
//           return {
//             status: false,
//             keystoreRes: loginSuccessCallbackForKeyStore,
//             signupRes: signUpAPICall.data.data,
//             generatedPayload,
//           };
//         }
//       } else {
//         return {
//           status: false,
//           generatedPayload,
//         };
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   "auth/logout",
//   async (data, thunkAPI) => {
//     try {
//       const logout = await axios.post(`${API_URL}/auth/logout`);
//       const encryptionLogout = await Encryption.logout();
//       return {};
//     } catch (e) {
//       return {};
//     }
//   }
// );

// export const refreshLogin = createAsyncThunk(
//   "auth/refreshLogin",
//   async (data, thunkAPI) => {
//     try {
//       const login = await axios.get(`${API_URL}/auth/login`, {
//         withCredentials: true,
//       });

//       const refreshLoginCallback = await Encryption.refreshLoginCallback(
//         login.data.data
//       );

//       if (refreshLoginCallback?.status === "success") {
//         initOneSignal(
//           login.data.data.user_id,
//           login.data.data.notification_auth
//         );
//         return {
//           status: true,
//           loginRes: { ...login.data.data },
//           qrDownloaded: true,
//         };
//       }
//     } catch (e) {
//       return {};
//     }
//   }
// );

// export const AuthSlice = createSlice({
//   name: "authSlice",
//   initialState: { data: {}, isLoading: false },
//   reducers: {
//     markQRDownloaded: (state, action) => {
//       state.data.qrDownloaded = true;
//     },
//   },
//   extraReducers: {
//     [loginUser.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.data = action.payload || {};
//     },
//     [loginUser.reject]: (state, action) => {
//       state.isLoading = false;
//     },
//     [loginUser.pending]: (state, action) => {
//       state.isLoading = true;
//     },
//     [registerUser.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.data = action.payload || {};
//     },
//     [registerUser.reject]: (state, action) => {
//       state.isLoading = false;
//     },
//     [registerUser.pending]: (state, action) => {
//       state.isLoading = true;
//     },
//     [logoutUser.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.data = action.payload || {};
//     },
//     [logoutUser.reject]: (state, action) => {
//       state.isLoading = false;
//     },
//     [logoutUser.pending]: (state, action) => {
//       state.isLoading = true;
//     },
//     [refreshLogin.fulfilled]: (state, action) => {
//       state.isAuthRefreshing = false;
//       state.data = action.payload || {};
//     },
//     [refreshLogin.reject]: (state, action) => {
//       state.isAuthRefreshing = false;
//     },
//     [refreshLogin.pending]: (state, action) => {
//       state.isAuthRefreshing = true;
//     },
//   },
// });

// export const { markQRDownloaded } = AuthSlice.actions;

// export default AuthSlice.reducer;
