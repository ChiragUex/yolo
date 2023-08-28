import { Suspense, React, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes";
import PrivateRoute from "./PrivateRoute";
import { Header } from "../components/Header";
import Loader from "../components/Loader";
import LoaderContext from "../context/LoaderContext";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const AppRoutes = () => {
  const { isLoader } = useContext(LoaderContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("localStorage.getItem : ",JSON.parse(localStorage.getItem("authUser")), JSON.parse(localStorage.getItem("authUserValidated")));
  
useEffect(() => {
  if (
    JSON.parse(localStorage.getItem("authUser")) &&
    localStorage.getItem("authUserValidated") == "false" &&
    location.pathname !== "/create-account"
  ) {
    navigate({
      pathname: '/create-account',
      search: `?cognitoId=${localStorage.getItem('authCognitoId')}&emailId=${JSON.parse(localStorage.getItem('authUser'))?.attributes?.email}`,
    })
  }
},[])
   
    // console.log("private route : ",localStorage.getItem("authUser"),
    // localStorage.getItem("authAwsCred"),
    // localStorage.getItem("authCognitoId"));

  return (
    <>
      {isLoader && <Loader loaderTransform="loaderTransform" />}
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes &&
            routes.length > 0 &&
            routes.map((route, index) => (
              <Route
                path={route?.path}
                key={"route_" + index}
                element={
                  route.isPrivate ? (
                    <>
                      {route?.path !== "/create-account" && (
                        <Header
                          isLayout={route.isLayout}
                          isPrivate={route.isPrivate}
                          isView={route.isView}
                        />
                      )}
                      <PrivateRoute isLayout={route.isLayout}>
                        <route.element />
                      </PrivateRoute>
                      {route?.isFooter && <Footer />}
                    </>
                  ) : (
                    <>
                    {route?.path !== "/warning/notapproved" && (
                      <Header
                        isLayout={route.isLayout}
                        isPrivate={route.isPrivate}
                        isView={route.isView}
                      />
                    )}
                      <route.element />
                      {route?.path !== "/warning/notapproved" && (
                      <Footer isPrivate={route.isPrivate} />
                      )}
                    </>
                  )
                }
              />
            ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
