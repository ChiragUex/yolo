import { lazy } from "react";
const landing = lazy(() => import("../pages/Landing"));
const dashboard = lazy(() => import("../pages/Dashboard"));
const agentEnrollment = lazy(() => import("../pages/AgentEnrollment/AgentEnrollment"));
const leadManagement = lazy(() => import("../pages/LeadManagement/LeadManagement"));
const leadManagementDetails = lazy(() => import("../pages/LeadManagementDetails/LeadManagementDetails"));
const warning = lazy(() => import("../components/Warning"));
const updateDetails = lazy(() => import("../pages/UpdateDetails/UpdateDetails"));
const terms = lazy(() => import("../pages/Terms"));
const privacy = lazy(() => import("../pages/Privacy"));

export const routes = [
  {
    element: terms,
    path: "/terms",
    isPrivate: false,
    isLayout: false,
    isView: true,
    isFooter: false,
  },
  {
    element: privacy,
    path: "/privacy-policy",
    isPrivate: false,
    isLayout: false,
    isView: true,
    isFooter: false,
  },
  {
    element: warning,
    path: "/warning/notapproved",
    isPrivate: false,
    isLayout: false,
    isView: true,
    isFooter: false,
  },
  {
    element: warning,
    path: "/warning/rejected",
    isPrivate: true,
    isLayout: true,
    isView: true,
    isFooter: false,
  },
  {
    element: updateDetails,
    path: "/update-details",
    isPrivate: true,
    isLayout: true,
    isView: true,
    isFooter: false,
  },
  {
    element: dashboard,
    path: "/dashboard",
    isPrivate: true,
    isLayout: true,
    isView: true,
    isFooter: false,
  },
  {
    element: leadManagement,
    path: "/lead-management",
    isPrivate: true,
    isLayout: true,
    isView: true,
    isFooter: false,
  },
  {
    element: agentEnrollment,
    path: "/create-account",
    isPrivate: true,
    isLayout: false,
    isView: true,
    isFooter: true,
  },
  {
    element: leadManagementDetails,
    path: "/lead-management-details/:sequenceId",
    isPrivate: true,
    isLayout: true,
    isView: true,
    isFooter: false,
  },
  {
    element: landing,
    path: "/",
    isPrivate: false,
    isLayout: false,
    isView: true,
    isFooter: false,
  },
];