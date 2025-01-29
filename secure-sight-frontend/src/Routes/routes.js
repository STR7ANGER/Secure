import React from 'react';

// Dashboard
import Dashboard from '../Pages/Dashboard';

// Import Authentication pages
import Login from '../Pages/Authentication/Login';
import ForgetPasswordPage from '../Pages/Authentication/ForgetPassword';
import Logout from '../Pages/Authentication/Logout';
import Register from '../Pages/Authentication/Register';
import UserProfile from '../Pages/Authentication/user-profile';

// Import Authentication Inner Pages
import Login1 from '../Pages/AuthenticationPages/Login';
import Register1 from '../Pages/AuthenticationPages/Register';
import RecoverPassword from '../Pages/AuthenticationPages/RecoverPassword';
import LockScreen from '../Pages/AuthenticationPages/LockScreen';

// Import Utility Pages
import Maintenance from '../Pages/Utility/Maintenance-Page';
import ComingSoon from '../Pages/Utility/ComingSoon-Page';
import Error404 from '../Pages/Utility/Error404-Page';
import Error500 from '../Pages/Utility/Error500-Page';

// Import Map Pages
import ConnectorList from '../Pages/connector/connectorList';
import ConnectorUploader from '../Pages/connector/Connector uploader/connectorUpload';
import CreateDashboard from '../Pages/Dashboard/createdashboard';
import CreateReport from '../Pages/reports/createReport';
import Report from '../Pages/reports';
import MultipleDragList from '../Pages/Dashboard/deleteDashboard';
import DeleteReport from '../Pages/reports/deleteReport';
import CreateSubReport from '../Pages/reports/createSubReport';
import ConnectorSchedule from '../Pages/connector/connectorSchedul';
import RawData from '../Pages/reports/rawData';
import ConnectorLogFile from '../Pages/connector/connectorLogFile';
import ImportCSVData from '../Pages/reports/csvData/importCSVData';
import CSVDataList from '../Pages/reports/csvData/importedDataList';
import CSVData from '../Pages/reports/csvData/importedData'; // Your component to view specific CSV data
import CloudoneConformityDashboard from '../Pages/Dashboard/dashboard/cloudoneConformity';
import ContainerSecurityDashboard from '../Pages/Dashboard/dashboard/containerSecurity';
import CloudOneConformity from '../Pages/reports/reports/cloud one conformity';
import ContainerSecurity from '../Pages/reports/reports/container securoty';
import AzureInventoryReport from '../Pages/reports/reports/inventoryReport/azureInventory';
import GCPInventoryReport from '../Pages/reports/reports/inventoryReport/gcpInventory';
import AWSInventoryReport from '../Pages/reports/reports/inventoryReport/awsInventory';
import Help from '../Pages/help/index';
import SmartChecks from '../Pages/reports/reports/smart check/index';
import SmartChecksDashboard from '../Pages/Dashboard/dashboard/smartChecks';
import TenableReport from '../Pages/reports/reports/tenable';
import ScanDetails from '../Pages/reports/reports/scanDetails';
import RegistriesDetails from '../Pages/reports/reports/registriesDetail';
import CSVFileView from '../Pages/reports/csvData/csvFileView';
import ImportJSONData from './../Pages/reports/jsonData/importJSONData';
import JSONDataList from './../Pages/reports/jsonData/importedDataList';
import JSONFileView from './../Pages/reports/jsonData/jsonFileView';

const authProtectedRoutes = [
  // Dashboard
  { path: '/logout', component: <Logout /> },
  { path: '/', component: <CreateDashboard /> },
  { path: '/dashboard/create-dashboard', component: <CreateDashboard /> },
  { path: '/dashboard/:id', component: <Dashboard /> },
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/dashboard/dashboard-list', component: <MultipleDragList /> },
  { path: '/dashboard/row-Data', component: <RawData /> },
  {
    path: '/dashboard/container-security',
    component: <ContainerSecurityDashboard />
  },
  {
    path: '/dashboard/cloudone-conformity',
    component: <CloudoneConformityDashboard />
  },
  {
    path: '/dashboard/smart-checks',
    component: <SmartChecksDashboard />
  },

  // Report
  { path: '/reports/:id', component: <Report /> },
  { path: '/report/create-report', component: <CreateReport /> },
  { path: '/report/report-list', component: <DeleteReport /> },
  // { path: "/report/report-schedule", component: <ReportSchedule /> },
  { path: '/report/create-sub-report', component: <CreateSubReport /> },

  // Conformity
  {
    path: '/cloudone/cloudone-conformity',
    component: <CloudOneConformity />
  },
  // Container Security
  {
    path: '/cloudone/container-security',
    component: <ContainerSecurity />
  },
  {
    path: '/cloudone/smart-checks',
    component: <SmartChecks />
  },
  {
    path: '/cloudone/smart-checks/scan/:id',
    component: <ScanDetails />
  },
  {
    path: '/cloudone/smart-checks/registries/:id',
    component: <RegistriesDetails />
  },
  {
    path: '/report/tenable',
    component: <TenableReport />
  },
  {
    path: '/inventory/aws-inventory',
    component: <AWSInventoryReport />
  },
  {
    path: '/inventory/azure-inventory',
    component: <AzureInventoryReport />
  },
  {
    path: '/inventory/gcp-inventory',
    component: <GCPInventoryReport />
  },
  // CSV
  { path: '/csv-upload', component: <ImportCSVData /> },
  { path: '/csv-list', component: <CSVDataList /> },
  { path: '/csv-list/:id', component: <CSVFileView /> },

  //json
  { path: '/json-upload', component: <ImportJSONData /> },
  { path: '/json-list', component: <JSONDataList /> },
  { path: '/json-list/:id', component: <JSONFileView /> },

  // Connector
  { path: '/connector-list', component: <ConnectorList /> },
  { path: '/connector-log/:id', component: <ConnectorLogFile /> },
  { path: '/connector-schedule', component: <ConnectorSchedule /> },
  { path: '/connector-upload', component: <ConnectorUploader /> },

  // Profile
  { path: '/userprofile', component: <UserProfile /> },
  { path: '/help', component: <Help /> },
  { path: '/help/:id', component: <Help /> }
];

const nonAuthRoutes = [
  // Authentication Page
  { path: '/', component: <Login /> },
  { path: '/login', component: <Login /> },
  { path: '/forgot-password', component: <ForgetPasswordPage /> },
  { path: '/register', component: <Register /> },

  // Authentication Inner Pages
  { path: '/auth-login', component: <Login1 /> },
  { path: '/auth-register', component: <Register1 /> },
  { path: '/auth-recoverpw', component: <RecoverPassword /> },
  { path: '/auth-lock-screen', component: <LockScreen /> }
];

const publicRoutes = [
  // Utility Pages
  { path: '/pages-404', component: <Error404 /> },
  { path: '/pages-500', component: <Error500 /> },
  { path: '/pages-maintenance', component: <Maintenance /> },
  { path: '/pages-comingsoon', component: <ComingSoon /> }
];

export { authProtectedRoutes, nonAuthRoutes, publicRoutes };
