import React, { useEffect, useState } from "react";
import "./App.css";
import "../src/components/index.css";
import "./pages/index.css";
import "../src/index.css";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import AppRoutes from "./routes";
import LoaderContext from "./context/LoaderContext";
import AwsAmplifyInit from "./http/services/aws-amplify";
import { AuthContext, useAuth } from "./context/AuthContext";
import { SnackbarProvider, closeSnackbar } from "notistack";

const App = () => {
  AwsAmplifyInit();
  const [isLoader, setIsLoader] = useState(false);
  const [authUser, setAuthUser] = useState(
    localStorage.getItem("authUser")
      ? JSON.parse(localStorage.getItem("authUser"))
      : null
  );
  const { startAutoLogoutTimer, sessionAutoLogoutTimerClear } = useAuth();

  useEffect(() => {
    startAutoLogoutTimer();
    return () => sessionAutoLogoutTimerClear();
  }, []);

  return (
    <Router basename="/">
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        <LoaderContext.Provider value={{ isLoader, setIsLoader }}>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Provider store={store}>
              <ThemeProvider theme={theme}>
                <AppRoutes />
              </ThemeProvider>
            </Provider>
          </SnackbarProvider>
        </LoaderContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
