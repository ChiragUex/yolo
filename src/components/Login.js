import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/images/logo.svg";
import otpImg from "../assets/images/otp-illu.svg";
import checkbox from "../assets/images/checkbox-active.svg";
import "./index.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Confirmed from "../assets/images/Confirmed-cuate.svg";
import {
  cognitoAttributeVerify,
  cognitoConfirmSignIn,
  cognitoCurrentUser,
  cognitoSignIn,
  cognitoSignUp,
  cognitoUpdateUserAttributes,
} from "../http/services/cognito.service";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  CircularProgress,
  IconButton,
  LinearProgress,
  Stack
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MuiCheckbox from "@mui/material/Checkbox";
import { handleEmailValidate, handleMobileValidate } from "../validations";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useLocalStorage } from "../http/services/local-storage";
import { getAgentProfileDetailsPayloadTemplate, getInsuranceTypePayloadTemplate } from "../http/services/api-payload-prepare";
import { getAgentProfileApi, getInsuranceTypeApi } from "../http/services/user.service";
import { enqueueSnackbar } from "notistack";

const Login = ({ setLoginModal }) => {
  const navigate = useNavigate();
  const { getItem, setItem } = useLocalStorage();
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [error, setError] = useState(false);
  const [showKey, setShowKey] = useState("LOGIN");
  const [registerFlowStarted, setRegisterFlowStarted] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);
  const { login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [termAndCondition, setTermsAndCondition] = useState(false);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        onChange={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }



  const [value, setValue] = React.useState(0);
  const { handleSubmit, trigger, reset, control } = useForm();

  const resetLoginForm = () => {
    reset({
      phone_number: "",
      email: "",
    });
    setUsername("");
    setEmail("");
    setOtp("");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    resetLoginForm();
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const validateChar = (value, index) => {
    const NUMERIC_PLUS_REGEX = /^[0-9]+$/;
    return value ? NUMERIC_PLUS_REGEX.test(value) : true;
  }

  const setUsernameFieldValue = (event) => {
    setUsername(event.target.value);
  };

  const setEmailFieldValue = (event) => {
    setEmail(event.target.value);
  };

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);


  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);





  const checkAgentStatus = () => {
    const payload = getAgentProfileDetailsPayloadTemplate();
    getAgentProfileApi(payload).then((response) => {
      console.log("getAgentProfileDetailsPayloadTemplate response authcontext : ", response);
      setItem('agentProfileData', JSON.stringify(response?.profile));
      setItem('agentProfileDetails', JSON.stringify(response));
      if (response?.profile?.agent_verification_status == "pending" || response?.agentLicense?.find(item => item.license_verification_status == "pending")) {
        navigate('/warning/notapproved')
        return;
      }
      else if (response?.agentLicense?.find(item => item.license_verification_status == "reject")) {
        navigate('/warning/rejected')
        return;
      }
    })
      .catch((error) => {
        console.log("error : ", error);
      })

    const insuranceTypePayload = getInsuranceTypePayloadTemplate();
    getInsuranceTypeApi(insuranceTypePayload).then((response) => {
      // console.log("getInsuranceTypeApi response authcontext : ", response);
      console.log(response);

    }).catch((error) => {
      console.log("error : ", error);
    })
  }


  return (
    <div className="popupBg">
      <>
        <div className="logImgMain">

          <div className="popupContain">
            <img width="200px" alt="Angular Logo" src={logo} />
            <img
              alt="Angular Logo"
              className="illu"
              src={
                showKey !== "ENTEREMAIL" || showKey !== "EMAIlOTP"
                  ? otpImg
                  : Confirmed
              }
            />
          </div>
          <div className="roundShap"></div>
        </div>
        <IconButton aria-label="delete" classes={{ root: 'closeLoginModalButton' }} onClick={() => setLoginModal(false)}>
          <CloseOutlinedIcon />
        </IconButton>

        {/* LOGIN  */}
        {showKey === "LOGIN" && (
          <div className="formContainMain">
            <h1>Login Account</h1>
            <p>Hello, Welcome back to account!</p>
            <div className="tabs">
              <Tabs
                value={value}
                onChange={handleChange}
                color="primary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Phone Number" {...a11yProps(0)} />
                <Tab label="Email Id" {...a11yProps(1)} />
              </Tabs>

              {value == 0 && (
                <div className="mt-20">
                  <Controller
                    name="phone_number"
                    control={control}
                    rules={{
                      required: "Phone is required!",
                      validate: (value) =>
                        handleMobileValidate(value)
                          ? null
                          : "Phone number must starts with +1 or +91 followed by 10 digit number only!",
                    }}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        id="phone_number"
                        name="phone_number"
                        label="Phone Number"
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        type="text"
                        value={value}
                        error={!!error}
                        placeholder="Enter your phone number"
                        onChange={(event) => {
                          const newValue = event.target.value;
                          if (/^[0-9\+]*$/.test(newValue) && newValue?.length < 14) {
                            onChange(event);
                            setUsernameFieldValue(event);
                          }
                          setUsernameFieldValue(event);
                        }}
                        fullWidth
                        InputLabelProps={{
                          classes: { focused: "hello-world", root: "world" },
                        }}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />

                </div>
              )}
              {value == 1 && (
                <div className="mt-20">
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required!",
                      validate: (value) =>
                        handleEmailValidate(value)
                          ? null
                          : "Please enter valid email!",
                    }}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        id="email"
                        name="email"
                        label="Email Id"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        value={value}
                        error={!!error}
                        placeholder="Enter your email id"
                        onChange={(event) => {
                          onChange(event);
                          setUsernameFieldValue(event);
                        }}
                        fullWidth
                        inputProps={{ tabIndex: 1 }}
                        InputLabelProps={{
                          classes: { focused: "hello-world", root: "world" },
                        }}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </div>
              )}

              {/*<TabPanel value={value} index={0} className="tabView">*/}
              {/*</TabPanel>*/}
              {/*<TabPanel value={value} index={1} className="tabView">*/}
              {/*</TabPanel>*/}

              {error && <p className="error_block">{error}</p>}
              {requestInProgress && (
                <p className="please_wait_block">
                  Please wait &nbsp; &nbsp;{" "}
                  <CircularProgress color="inherit" size={30} />
                </p>
              )}

              {!requestInProgress && (
                <button
                  className="button-primary otp-button"
                  disabled={!username}
                  onClick={handleSubmit(() => {
                    setRequestInProgress(true);
                    cognitoSignIn(username)
                      .then((res) => {
                        setCognitoUser(res);
                        setRegisterFlowStarted(false);
                        setShowKey("OTP");
                        setSeconds(30);
                      })
                      .catch((err) => {
                        let errData = err;
                        if (errData.code == "UserLambdaValidationException" && errData.message.includes("phone_number already exists")) {
                          setError("Phone number is already exist, please login.!");
                          setTimeout(() => {
                            setError(null);
                          }, 3000);
                        } else if (errData.code == "UserLambdaValidationException" && errData.message.includes("user does not exists")) {
                          setError("User does not exists, please register.!");
                          setTimeout(() => {
                            setError(null);
                          }, 3000);
                        } else {
                          setError(errData.message);
                          setTimeout(() => {
                            setError(null);
                          }, 3000);
                        }
                      })
                      .finally(() => {
                        setRequestInProgress(false);
                      });
                  })}
                >
                  Get OTP
                </button>
              )}

              <h3 className="account-link">
                Don't have an Account?{" "}
                <a
                  href="#"
                  onClick={() => setShowKey("CREATE")}
                  className="span-primary"
                >
                  Sign Up
                </a>
              </h3>
            </div>
          </div>
        )}
        {/*  */}
        {/* OTP VERIFICATION */}
        {showKey === "OTP" && (
          <div className="formContainMain">
            <h1>Verification Code</h1>
            <p>
              Please enter the OTP sent to <strong>{username}</strong>
            </p>
            <div className="otp-section">
              <div className="OtpFildMain">
                <MuiOtpInput
                  value={otp}
                  length={6}
                  validateChar={validateChar}
                  onChange={(newValue) => setOtp(newValue)}
                />
              </div>

              {error && <p className="error_block">{error}</p>}

              {requestInProgress && (
                <p className="please_wait_block">
                  Please wait &nbsp; &nbsp;{" "}
                  <CircularProgress color="inherit" size={30} />
                </p>
              )}

              {!requestInProgress && (
                <>
                  <h3 className="resend">
                    {seconds > 0 || minutes > 0 ? (
                      <p>
                        Time Remaining For Next OTP :{" "}
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <>
                        <p>
                          Didn't receive code? &nbsp; &nbsp; (&nbsp;
                          <a
                            href="#"
                            onClick={() => {
                              setRequestInProgress(true);
                              setSeconds(30);
                              cognitoSignIn(username)
                                .then((res) => {

                                  setCognitoUser(res)
                                })
                                .finally(() => {
                                  setRequestInProgress(false);
                                });
                            }}
                            className="span-primary"
                          >
                            Resend OTP
                          </a>
                          &nbsp;)
                        </p>
                      </>
                    )}
                  </h3>
                  <button
                    className="otpButton button-primary"
                    disabled={!otp || otp.length < 6}
                    onClick={() => {
                      setRequestInProgress(true);
                      cognitoConfirmSignIn(cognitoUser, otp)
                        .then(async (user) => {

                          setSeconds(0);
                          setRequestInProgress(true);
                          if (user.attributes && user.attributes.phone_number) {
                            if (registerFlowStarted) {
                              setOtp("");
                              setSeconds(30);
                              setShowKey("EMAILOTP");
                              cognitoUpdateUserAttributes(cognitoUser, {
                                email: email,
                              })
                                .then((res) => {
                                  console.log("inside update user ", res);
                                })
                                .finally(() => {
                                  setRequestInProgress(false);
                                });
                            } else {
                              if (user.attributes.email_verified == false) {
                                setShowKey("ENTEREMAIL");
                                setRequestInProgress(false);
                              } else {
                                await login(user);

                                checkAgentStatus();

                                if (
                                  localStorage.getItem("authUserValidated") == "false"
                                ) {
                                  enqueueSnackbar("Please Complete Profile.", {
                                    variant: 'warning'
                                  })
                                  navigate({
                                    pathname: '/create-account',
                                    search: `?cognitoId=${localStorage.getItem('authCognitoId')}&emailId=${JSON.parse(localStorage.getItem('authUser'))?.attributes?.email}`,
                                  })
                                } else if (localStorage.getItem("authUserValidated") == "true") {
                                  navigate('/dashboard')
                                }
                                else {
                                  navigate('/')
                                }
                                setLoginModal(false);
                                setRequestInProgress(false);
                                setOtp("");
                                setEmail("");
                                setShowKey("LOGIN");
                                // navigate("/dashboard/");
                                // navigate(0);
                              }
                            }
                          } else {
                            setError("Invalid OTP!");
                            setOtp("");
                            setTimeout(() => {
                              setError(null);
                            }, 5000);
                            setRequestInProgress(false);
                          }
                        })
                        .catch((err) => {
                          console.log("err Something went wrong :", err?.message, err);
                          setError(err?.message);
                          resetLoginForm();
                          setShowKey("LOGIN");
                          setTimeout(() => {
                            setError(null);
                          }, 5000);
                          setRequestInProgress(false);
                        });
                    }}
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {showKey === "ENTEREMAIL" && (
          <div className="formContainMain">
            <h1>Enter Your Email</h1>
            <p>Please enter your Email to receive the one-time password</p>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required!",
                validate: (value) =>
                  handleEmailValidate(value)
                    ? null
                    : "Please enter valid email!",
              }}
              defaultValue={email}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email Id"
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                  value={value}
                  error={!!error}
                  placeholder="Enter your email id"
                  onChange={(event) => {
                    onChange(event);
                    setEmailFieldValue(event);
                  }}
                  fullWidth
                  inputProps={{ tabIndex: 1 }}
                  InputLabelProps={{
                    classes: { focused: "hello-world", root: "world" },
                  }}
                  helperText={error ? error.message : null}
                />
              )}
            />
            {requestInProgress && (
              <p className="please_wait_block">
                Please wait &nbsp; &nbsp;{" "}
                <CircularProgress color="inherit" size={30} />
              </p>
            )}

            {!requestInProgress && (
              <button
                className="button-primary otp-button mt-156"
                disabled={!email}
                onClick={handleSubmit(() => {
                  setRequestInProgress(true);
                  cognitoUpdateUserAttributes(cognitoUser, { email: email })
                    .then((res) => {
                      setRequestInProgress(false);
                      setOtp("");
                      setShowKey("EMAILOTP");
                      setSeconds(30);
                    })
                    .finally(() => {
                      setRequestInProgress(false);
                    });
                })}
              >
                GET OTP
              </button>
            )}
          </div>
        )}
        {showKey === "EMAILOTP" && (
          <div className="formContainMain">
            <h1>Verification Code</h1>
            <p>
              Please enter the OTP sent to <strong>{email}</strong>
            </p>
            <div className="otp-section">
              <div className="OtpFildMain">
                <MuiOtpInput
                  value={otp}
                  length={6}
                  validateChar={validateChar}
                  onChange={(newValue) => setOtp(newValue)}
                />
              </div>

              {error && <p className="error_block">{error}</p>}

              {requestInProgress && (
                <p className="please_wait_block">
                  Please wait &nbsp; &nbsp;{" "}
                  <CircularProgress color="inherit" size={30} />
                </p>
              )}

              {!requestInProgress && (
                <>
                  <h3 className="resend">
                    {seconds > 0 || minutes > 0 ? (
                      <p>
                        Time Remaining For Next OTP :{" "}
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <>
                        <p>
                          Didn't receive code? &nbsp; &nbsp; (&nbsp;
                          <a
                            href="#"
                            onClick={() => {
                              setRequestInProgress(true);
                              setSeconds(30);
                              cognitoUpdateUserAttributes(cognitoUser, {
                                email: email,
                              })
                                .then((res) => {
                                  console.log("emailotp : ", res);

                                  cognitoCurrentUser().then((user) => {
                                    console.log("user : ", user);
                                    // setCognitoUser(user)
                                  });
                                })
                                .finally(() => {
                                  setRequestInProgress(false);
                                });
                            }}
                            className="span-primary"
                          >
                            Resend OTP
                          </a>
                          &nbsp;)
                        </p>
                      </>
                    )}
                  </h3>
                  <button
                    className="otpButton button-primary"
                    onClick={() => {
                      setRequestInProgress(true);
                      cognitoAttributeVerify(cognitoUser, "email", otp)
                        .then((res) => {
                          cognitoCurrentUser().then(async (res) => {
                            await login(res);
                            setLoginModal(false);
                            setRequestInProgress(false);
                            setOtp("");
                            setEmail("");
                            setShowKey("LOGIN");
                            enqueueSnackbar("Please Complete Profile.", {
                              variant: 'warning'
                            })
                            navigate({
                              pathname: '/create-account',
                              search: `?cognitoId=${localStorage.getItem('authCognitoId')}&emailId=${email}`,
                            })
                            // navigate(0);
                          });
                        })
                        .catch((error) => {
                          console.log("error emailotp: ", error?.message);
                          enqueueSnackbar(error, {
                            variant: "error"
                          })
                          setRequestInProgress(false);
                          setError(error?.message !== "An account with the email already exists." && "Invalid OTP!");
                          setOtp("");
                          setTimeout(() => {
                            setError(null);
                          }, 5000);
                        });
                    }}
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </div>
            {/*<div className="stap-main">*/}
            {/*  <div className="stap"></div>*/}
            {/*  <div className="stap stap-active"></div>*/}
            {/*  <div className="stap"></div>*/}
            {/*</div>*/}
          </div>
        )}

        {/* CREATE ACCOUNT */}
        {showKey === "CREATE" && (
          <div className="formContainMain">
            <h1>Create Account</h1>
            <p>
              Please enter your Phone Number and Email to receive the one-time
              password
            </p>
            <div className="mt-50">
              <div className="verify-account">
                <Controller
                  name="phone_number"
                  control={control}
                  rules={{
                    required: "Phone is required!",
                    validate: (value) =>
                      handleMobileValidate(value)
                        ? null
                        : "Phone number must starts with +1 or +91 followed by 10 digit number only!",
                  }}
                  defaultValue={username}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      id="phone_number"
                      name="phone_number"
                      label="Phone Number"
                      variant="outlined"
                      margin="normal"
                      color="secondary"
                      type="text"
                      value={value}
                      error={!!error}
                      placeholder="Enter your phone number"
                      onChange={(event) => {
                        const newValue = event.target.value;
                        if (/^[0-9\+]*$/.test(newValue) && newValue?.length < 14) {
                          onChange(event);
                          setUsernameFieldValue(event);
                        }
                        setUsernameFieldValue(event);
                      }}
                      fullWidth
                      InputLabelProps={{
                        classes: { focused: "hello-world", root: "world" },
                      }}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </div>
              <div className="verify-account">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required!",
                    validate: (value) =>
                      handleEmailValidate(value)
                        ? null
                        : "Please enter valid email!",
                  }}
                  defaultValue={email}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      label="Email Id"
                      variant="outlined"
                      margin="normal"
                      color="secondary"
                      value={value}
                      error={!!error}
                      placeholder="Enter your email id"
                      onChange={(event) => {
                        onChange(event);
                        setEmailFieldValue(event);
                      }}
                      fullWidth
                      inputProps={{ tabIndex: 1 }}
                      InputLabelProps={{
                        classes: { focused: "hello-world", root: "world" },
                      }}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </div>
              {error && <p className="error_block">{error}</p>}

              {requestInProgress && (
                <p className="please_wait_block">
                  Please wait &nbsp; &nbsp;{" "}
                  <CircularProgress color="inherit" size={30} />
                </p>
              )}
              {!requestInProgress && (
                <>
                  <div className="d-flex gap-17">
                    <MuiCheckbox
                      checked={termAndCondition}
                      onChange={(value) => {
                        setError(null);
                        setTermsAndCondition(value.target.checked);
                      }}
                      label="CheckCircleIcon"
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                    {/*<img alt="Angular Logo" className="illu" src={checkbox} />*/}
                    <p className="font-14 mt-20 mb-20">
                      I accept the{" "}
                      <a href="/terms" target="_blank">
                        <strong>terms of use</strong>
                      </a>{" "}
                      and
                      <a href="/privacy-policy" target="_blank">
                        <strong> privacy policy</strong>
                      </a>
                    </p>
                  </div>
                  <button
                    className="otpButton button-primary"
                    onClick={handleSubmit(() => {
                      if (termAndCondition) {
                        setRequestInProgress(true);
                        setRegisterFlowStarted(true);
                        cognitoSignUp(username)
                          .then((res) => {
                            cognitoSignIn(username).then((res) => {
                              setCognitoUser(res);
                              setRequestInProgress(false);
                              setShowKey("OTP");
                              setSeconds(30);
                            }).catch((err) => {
                              setRequestInProgress(false);
                              setRegisterFlowStarted(false);
                              let errData = err;
                              if (errData.code == "UserLambdaValidationException" && errData.message.includes("phone_number already exists")) {
                                setError("Phone number is already exist, please login.!");
                                setTimeout(() => {
                                  setError(null);
                                }, 3000);
                              } else if (errData.code == "UserLambdaValidationException" && errData.message.includes("user does not exists")) {
                                setError("User does not exists, please register.!");
                                setTimeout(() => {
                                  setError(null);
                                }, 3000);
                              } else {
                                setError(errData.message);
                                setTimeout(() => {
                                  setError(null);
                                }, 3000);
                              }
                            });
                          })
                          .catch((err) => {
                            setRequestInProgress(false);
                            setRegisterFlowStarted(false);
                            let errData = err;
                            if (errData.code == "UserLambdaValidationException" && errData.message.includes("phone_number already exists")) {
                              setError("Phone number is already exist, please login.!");
                              setTimeout(() => {
                                setError(null);
                              }, 3000);
                            } else if (errData.code == "UserLambdaValidationException" && errData.message.includes("user does not exists")) {
                              setError("User does not exists, please register.!");
                              setTimeout(() => {
                                setError(null);
                              }, 3000);
                            } else {
                              setError(errData.message);
                              setTimeout(() => {
                                setError(null);
                              }, 3000);
                            }
                          });
                      } else {
                        setError("You must agree to term & condition !");
                        setTimeout(() => {
                          setError(null);
                        }, 3000);
                      }
                    })}
                  >
                    Sign Up
                  </button>
                </>
              )}

              <h3 className="account-link">
                Already have an Account?{" "}
                <a
                  href="#"
                  onClick={() => setShowKey("LOGIN")}
                  className="span-primary"
                >
                  Sign In
                </a>
              </h3>
            </div>
            {/*<div className="stap-main">*/}
            {/*  <div className="stap stap-active"></div>*/}
            {/*  <div className="stap"></div>*/}
            {/*  <div className="stap"></div>*/}
            {/*</div>*/}
          </div>
        )}
      </>
      {requestInProgress && (
        <Stack
          sx={{
            width: "100%",
            color: "#fcbb18",
            position: "absolute",
            bottom: 0,
          }}
          spacing={2}
        >
          <LinearProgress color="inherit" />
        </Stack>
      )}
    </div>
  );
};

export default Login;