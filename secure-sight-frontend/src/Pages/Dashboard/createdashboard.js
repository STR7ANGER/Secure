// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   Card,
//   CardBody,
//   Col,
//   Row,
//   CardTitle,
//   Container,
//   Label,
//   Input,
// } from "reactstrap";

// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import ApiEndPoints from "../../Network_call/ApiEndPoints";
// import ApiServices from "../../Network_call/apiservices";
// import { DashboardList, ReportList } from "../ulit/dashboardlist";

// const CreateDashboard = () => {
//   // document.title = "create dashboard | trend micro unity";
//   document.title = "create dashboard  | Secure Sight";

//   const [dashboardName, setDashboardName] = useState("");
//   const [userData, setUserData] = React.useState({
//     email: "",
//     dbName: "",
//     user_id: "",
//   });
//   useEffect(() => {
//     let userObject = localStorage.getItem("authUser");
//     var userInfo = userObject ? JSON.parse(userObject) : "";
//     setUserData(() => ({
//       email: userInfo.email,
//       dbName: userInfo.dbName,
//       user_id: userInfo._id,
//     }));
//     ReportList({
//       dbName: userInfo.dbName,
//       userId: userInfo._id,
//       reload: false,
//     });
//     DashboardList({
//       dbName: userInfo.dbName,
//       userId: userInfo._id,
//       reload: false,
//     });
//   }, []);
//   //   #################################### create dashboard ##############################################
//   const Submit = async () => {
//     let payload = {
//       info: { dbName: userData.dbName },
//       data: { dashboardName: dashboardName, user_id: userData.user_id },
//     };
//     const response = await ApiServices(
//       "post",
//       payload,
//       ApiEndPoints.UserCreateDashboard
//     );
//     if (response) {
//       toast(response.msg, { autoClose: 2000 });
//       DashboardList({
//         dbName: userData.dbName,
//         userId: userData.user_id,
//         reload: true,
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <ToastContainer />
//       <div className="page-content">
//         <Container fluid={true}>
//           <Breadcrumbs title="Dashboard" breadcrumbItem="Create Dashboard" />
//           <br />
//           <Row>
//             <Col xl={2}></Col>
//             <Col xl={8}>
//               <Card>
//                 <CardBody>
//                   <h5 className="card-title">Create Dashboard</h5>
//                   {/* <p className="card-title-desc">
//                     Create Dashboard for create the chart on the data
//                   </p> */}
//                   <br />

//                   <form action="javascript:void(0)" onSubmit={Submit}>
//                     <Row>
//                       <Col md={12}>
//                         <div className="form-floating mb-3 fullwidth">
//                           <input
//                             type="text"
//                             className="form-control"
//                             id="floatingFirstnameInput"
//                             placeholder="Enter Your First Name"
//                             value={dashboardName}
//                             onChange={(e) => {
//                               setDashboardName(e.target.value);
//                             }}
//                           />
//                           <label htmlFor="floatingFirstnameInput">
//                             Dashboard Name
//                           </label>
//                         </div>
//                       </Col>
//                     </Row>
//                     <br />
//                     <div>
//                       <button
//                         type="submit"
//                         disabled={!dashboardName}
//                         className="btn btn-primary w-md"
//                       >
//                         Create Dashboard
//                       </button>
//                     </div>
//                   </form>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default CreateDashboard;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   Card,
//   CardBody,
//   Col,
//   Row,
//   CardTitle,
//   Container,
//   Label,
//   Input,
//   Alert,
// } from "reactstrap";

// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import ApiEndPoints from "../../Network_call/ApiEndPoints";
// import ApiServices from "../../Network_call/apiservices";
// import { DashboardList, ReportList } from "../ulit/dashboardlist";

// const CreateDashboard = () => {
//   document.title = "Create Dashboard | Secure Sight";

//   const [dashboardName, setDashboardName] = useState("");
//   const [userData, setUserData] = React.useState({
//     email: "",
//     dbName: "",
//     user_id: "",
//   });

//   useEffect(() => {
//     let userObject = localStorage.getItem("authUser");
//     var userInfo = userObject ? JSON.parse(userObject) : "";
//     setUserData(() => ({
//       email: userInfo.email,
//       dbName: userInfo.dbName,
//       user_id: userInfo._id,
//     }));
//     ReportList({
//       dbName: userInfo.dbName,
//       userId: userInfo._id,
//       reload: false,
//     });
//     DashboardList({
//       dbName: userInfo.dbName,
//       userId: userInfo._id,
//       reload: false,
//     });
//   }, []);

//   const Submit = async () => {
//     let payload = {
//       info: { dbName: userData.dbName },
//       data: { dashboardName: dashboardName, user_id: userData.user_id },
//     };
//     const response = await ApiServices(
//       "post",
//       payload,
//       ApiEndPoints.UserCreateDashboard
//     );
//     if (response) {
//       toast(response.msg, { autoClose: 2000 });
//       DashboardList({
//         dbName: userData.dbName,
//         userId: userData.user_id,
//         reload: true,
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <ToastContainer />
//       <div className="page-content">
//         <Container fluid={true}>
//           <div className="d-flex align-items-center mb-4">
//             <i className="bx bxs-dashboard fs-3 text-primary me-2"></i>
//             <Breadcrumbs title="Dashboard" breadcrumbItem="Create Dashboard" />
//           </div>

//           <Row className="justify-content-center">
//             <Col xl={8} lg={10}>
//               <Card className="shadow-sm">
//                 <CardBody className="p-4">
//                   <div className="border-bottom pb-3 mb-4">
//                     <CardTitle tag="h4" className="mb-3">Create New Dashboard</CardTitle>
//                     <p className="text-muted">
//                       Design and configure your custom dashboard
//                     </p>
//                   </div>

//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       Submit();
//                     }}
//                     className="dashboard-form"
//                   >
//                     <div className="mb-4">
//                       <Label
//                         for="dashboardName"
//                         className="form-label fw-semibold"
//                       >
//                         Dashboard Name
//                       </Label>
//                       <div className="input-group">
//                         <span className="input-group-text bg-light">
//                           <i className="bx bxs-grid-alt"></i>
//                         </span>
//                         <Input
//                           type="text"
//                           className="form-control"
//                           id="dashboardName"
//                           placeholder="Enter dashboard name"
//                           value={dashboardName}
//                           onChange={(e) => setDashboardName(e.target.value)}
//                         />
//                       </div>
//                     </div>

//                     <Alert
//                       color="info"
//                       className="bg-light-info border-0 mb-4"
//                     >
//                       <div className="d-flex align-items-center">
//                         <i className="bx bx-info-circle me-2"></i>
//                         <div>
//                           Dashboard will be created in workspace: {" "}
//                           <strong>{userData.dbName || "Default"}</strong>
//                         </div>
//                       </div>
//                     </Alert>

//                     <div className="text-end">
//                       <button
//                         type="submit"
//                         disabled={!dashboardName}
//                         className="btn btn-primary px-4"
//                       >
//                         <i className="bx bx-plus-circle me-1"></i>
//                         Create Dashboard
//                       </button>
//                     </div>
//                   </form>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       <style>
//         {`
//           .dashboard-form .input-group-text {
//             border-right: none;
//           }
//           .dashboard-form .form-control {
//             border-left: none;
//           }
//           .dashboard-form .form-control:focus {
//             box-shadow: none;
//             border-color: #ced4da;
//           }
//           .dashboard-form .input-group:focus-within {
//             box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
//           }
//           .bg-light-info {
//             background-color: rgba(13, 110, 253, 0.1) !important;
//           }
//           .card {
//             transition: all 0.3s ease;
//           }
//           .card:hover {
//             transform: translateY(-2px);
//             box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
//           }
//           .btn-primary {
//             transition: all 0.3s ease;
//           }
//           .btn-primary:hover {
//             transform: translateY(-1px);
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           }
//         `}
//       </style>
//     </React.Fragment>
//   );
// };

// export default CreateDashboard;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   Card,
//   CardBody,
//   Col,
//   Row,
//   CardTitle,
//   Container,
//   Label,
//   Input,
//   Alert,
// } from "reactstrap";

// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import ApiEndPoints from "../../Network_call/ApiEndPoints";
// import ApiServices from "../../Network_call/apiservices";
// import { DashboardList, ReportList } from "../ulit/dashboardlist";

// const CreateDashboard = () => {
//   document.title = "Create Dashboard | Secure Sight";

//   const [dashboardName, setDashboardName] = useState("");
//   const [userData, setUserData] = React.useState({
//     email: "",
//     dbName: "",
//     user_id: "",
//   });

//   useEffect(() => {
//     let userObject = localStorage.getItem("authUser");
//     var userInfo = userObject ? JSON.parse(userObject) : "";
//     setUserData(() => ({
//       email: userInfo.email,
//       dbName: userInfo.dbName,
//       user_id: userInfo._id,
//     }));
//     ReportList({
//       dbName: userInfo.dbName,
//       userId: userInfo._id,
//       reload: false,
//     });
//     DashboardList({
//       dbName: userInfo.dbName,
//       userId: userInfo._id,
//       reload: false,
//     });
//   }, []);

//   const Submit = async () => {
//     let payload = {
//       info: { dbName: userData.dbName },
//       data: { dashboardName: dashboardName, user_id: userData.user_id },
//     };
//     const response = await ApiServices(
//       "post",
//       payload,
//       ApiEndPoints.UserCreateDashboard
//     );
//     if (response) {
//       toast(response.msg, { autoClose: 2000 });
//       DashboardList({
//         dbName: userData.dbName,
//         userId: userData.user_id,
//         reload: true,
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <ToastContainer />
//       <div className="page-content modern-dashboard">
//         <Container fluid>
//           <div className="dashboard-header">
//             <div className="header-content">
//               <h1 className="main-title">
//                 <i className="bx bxs-dashboard"></i>
//                 Create Dashboard
//               </h1>
//               <p className="header-description">
//                 Design and configure your custom analytics dashboard
//               </p>
//             </div>
//           </div>

//           <Row className="justify-content-center">
//             <Col xl={6} lg={8} md={10}>
//               <Card className="modern-card">
//                 <CardBody className="p-4">
//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       Submit();
//                     }}
//                     className="modern-form"
//                   >
//                     <div className="form-section">
//                       <Label
//                         for="dashboardName"
//                         className="modern-label"
//                       >
//                         Dashboard Name
//                       </Label>
//                       <div className="modern-input-group">
//                         <Input
//                           type="text"
//                           id="dashboardName"
//                           placeholder="Enter a name for your dashboard"
//                           value={dashboardName}
//                           onChange={(e) => setDashboardName(e.target.value)}
//                           className="modern-input"
//                         />
//                         <div className="input-icon">
//                           <i className="bx bx-layout"></i>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="workspace-info">
//                       <div className="workspace-icon">
//                         <i className="bx bx-data"></i>
//                       </div>
//                       <div className="workspace-details">
//                         <span className="workspace-label">Current Workspace</span>
//                         <span className="workspace-name">{userData.dbName || "Default"}</span>
//                       </div>
//                     </div>

//                     <div className="action-section">
//                       <button
//                         type="submit"
//                         disabled={!dashboardName}
//                         className="modern-button"
//                       >
//                         <i className="bx bx-plus-circle"></i>
//                         <span>Create Dashboard</span>
//                       </button>
//                     </div>
//                   </form>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>

//         <style>
//           {`
//             .modern-dashboard {
//               background: #f8fafc;
//               min-height: 100vh;
//               padding: 2rem 1rem;
//             }

//             .dashboard-header {
//               margin-bottom: 2.5rem;
//               padding: 1rem 0;
//             }

//             .header-content {
//               text-align: center;
//               max-width: 600px;
//               margin: 0 auto;
//             }

//             .main-title {
//               font-size: 2rem;
//               color: #1e293b;
//               font-weight: 700;
//               margin-bottom: 0.5rem;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               gap: 0.75rem;
//             }

//             .main-title i {
//               font-size: 1.75rem;
//               color: #3b82f6;
//             }

//             .header-description {
//               color: #64748b;
//               font-size: 1.1rem;
//               margin-bottom: 0;
//             }

//             .modern-card {
//               background: white;
//               border: none;
//               border-radius: 16px;
//               box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
//               transition: all 0.3s ease;
//             }

//             .modern-card:hover {
//               box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
//             }

//             .form-section {
//               margin-bottom: 2rem;
//             }

//             .modern-label {
//               font-size: 0.875rem;
//               font-weight: 600;
//               color: #475569;
//               margin-bottom: 0.5rem;
//             }

//             .modern-input-group {
//               position: relative;
//               display: flex;
//               align-items: center;
//             }

//             .modern-input {
//               height: 3.5rem;
//               border-radius: 12px;
//               border: 2px solid #e2e8f0;
//               padding: 0 1rem;
//               font-size: 1rem;
//               transition: all 0.2s ease;
//               padding-right: 3rem;
//             }

//             .modern-input:focus {
//               border-color: #3b82f6;
//               box-shadow: 0 0 0 4px rgb(59 130 246 / 0.1);
//             }

//             .input-icon {
//               position: absolute;
//               right: 1rem;
//               color: #94a3b8;
//               font-size: 1.25rem;
//             }

//             .workspace-info {
//               background: #f1f5f9;
//               border-radius: 12px;
//               padding: 1rem;
//               display: flex;
//               align-items: center;
//               gap: 1rem;
//               margin-bottom: 2rem;
//             }

//             .workspace-icon {
//               background: white;
//               width: 40px;
//               height: 40px;
//               border-radius: 10px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               font-size: 1.25rem;
//               color: #3b82f6;
//             }

//             .workspace-details {
//               display: flex;
//               flex-direction: column;
//             }

//             .workspace-label {
//               font-size: 0.875rem;
//               color: #64748b;
//             }

//             .workspace-name {
//               font-weight: 600;
//               color: #1e293b;
//             }

//             .action-section {
//               text-align: center;
//             }

//             .modern-button {
//               background: #3b82f6;
//               color: white;
//               border: none;
//               border-radius: 12px;
//               padding: 1rem 2rem;
//               font-size: 1rem;
//               font-weight: 600;
//               display: inline-flex;
//               align-items: center;
//               gap: 0.5rem;
//               transition: all 0.2s ease;
//               cursor: pointer;
//             }

//             .modern-button:hover {
//               background: #2563eb;
//               transform: translateY(-1px);
//             }

//             .modern-button:disabled {
//               background: #94a3b8;
//               cursor: not-allowed;
//               transform: none;
//             }

//             .modern-button i {
//               font-size: 1.25rem;
//             }

//             @media (max-width: 768px) {
//               .modern-dashboard {
//                 padding: 1rem;
//               }

//               .main-title {
//                 font-size: 1.5rem;
//               }

//               .header-description {
//                 font-size: 1rem;
//               }

//               .modern-button {
//                 width: 100%;
//                 justify-content: center;
//               }
//             }
//           `}
//         </style>
//       </div>
//     </React.Fragment>
//   );
// };

// export default CreateDashboard;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   Card,
//   CardBody,
//   Col,
//   Row,
//   CardTitle,
//   Container,
//   Label,
//   Input,
//   Alert,
// } from "reactstrap";

// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import ApiEndPoints from "../../Network_call/ApiEndPoints";
// import ApiServices from "../../Network_call/apiservices";
// import { DashboardList, ReportList } from "../ulit/dashboardlist";

// const CreateDashboard = () => {
//   document.title = "Create Dashboard | Secure Sight";

//   const [dashboardName, setDashboardName] = useState("");
//   const [userData, setUserData] = React.useState({
//     email: "",
//     dbName: "",
//     user_id: "",
//   });

//   useEffect(() => {
//     let userObject = localStorage.getItem("authUser");
//     var userInfo = userObject ? JSON.parse(userObject) : "";
//     setUserData(() => ({
//       email: userInfo.email,
//       dbName: userInfo.dbName,
//       user_id: userInfo._id,
//     }));
//     ReportList({
//       dbName: userInfo.dbName,
//       userId: userInfo._id,
//       reload: false,
//     });
//     DashboardList({
//       dbName: userInfo.dbName,
//       userId: userInfo._id,
//       reload: false,
//     });
//   }, []);

//   const Submit = async () => {
//     let payload = {
//       info: { dbName: userData.dbName },
//       data: { dashboardName: dashboardName, user_id: userData.user_id },
//     };
//     const response = await ApiServices(
//       "post",
//       payload,
//       ApiEndPoints.UserCreateDashboard
//     );
//     if (response) {
//       toast(response.msg, { autoClose: 2000 });
//       DashboardList({
//         dbName: userData.dbName,
//         userId: userData.user_id,
//         reload: true,
//       });
//     }
//   };

//   return (
//     <React.Fragment>
//       <ToastContainer />
//       <div className="page-content modern-dashboard">
//         <div className="gradient-overlay"></div>
//         <Container fluid>
//           <div className="dashboard-header">
//             <div className="header-content">
//               <h1 className="main-title">
//                 <i className="bx bxs-dashboard "></i>
//                 Create Dashboard
//               </h1>
//               <p className="header-description">
//                 Design and configure your custom analytics dashboard
//               </p>
//             </div>
//           </div>

//           <Row className="justify-content-center">
//             <Col xl={6} lg={8} md={10}>
//               <Card className="modern-card">
//                 <CardBody className="p-4">
//                   <form
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       Submit();
//                     }}
//                     className="modern-form"
//                   >
//                     <div className="form-section">
//                       <Label
//                         for="dashboardName"
//                         className="modern-label"
//                       >
//                         Dashboard Name
//                       </Label>
//                       <div className="modern-input-group">
//                         <Input
//                           type="text"
//                           id="dashboardName"
//                           placeholder="Enter a name for your dashboard"
//                           value={dashboardName}
//                           onChange={(e) => setDashboardName(e.target.value)}
//                           className="modern-input"
//                         />
//                         <div className="input-icon">
//                           <i className="bx bx-layout"></i>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="workspace-info">
//                       <div className="workspace-icon">
//                         <i className="bx bx-data"></i>
//                       </div>
//                       <div className="workspace-details">
//                         <span className="workspace-label">Current Workspace</span>
//                         <span className="workspace-name">{userData.dbName || "Default"}</span>
//                       </div>
//                     </div>

//                     <div className="action-section">
//                       <button
//                         type="submit"
//                         disabled={!dashboardName}
//                         className="modern-button"
//                       >
//                         <i className="bx bx-plus-circle"></i>
//                         <span>Create Dashboard</span>
//                       </button>
//                     </div>
//                   </form>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>

//         <style>
//           {`
//             .modern-dashboard {
//               background: linear-gradient(135deg, #4c1d95 0%, #2e1065 100%);
//               min-height: 100vh;
//               padding: 2rem 1rem;
//               position: relative;
//               overflow: hidden;
//             }

//             .gradient-overlay {
//               position: absolute;
//               top: 0;
//               left: 0;
//               right: 0;
//               bottom: 0;
//               background:
//                 radial-gradient(circle at 20% 20%, rgba(221, 214, 254, 0.1) 0%, transparent 25%),
//                 radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.1) 0%, transparent 25%);
//               pointer-events: none;
//             }

//             .dashboard-header {
//               margin-bottom: 10vh;
//               padding: 1rem 0;
//               position: relative;
//             }

//             .header-content {
//               text-align: center;
//               max-width: 600px;
//               margin: 0 auto;
//             }

//             .main-title {
//               margin-top:4vh;
//               font-size: 2.5rem;
//               color: #fff;
//               font-weight: 700;
//               margin-bottom: 0.5rem;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               gap: 0.75rem;
//               text-shadow: 0 2px 4px rgba(0,0,0,0.1);
//             }

//             .main-title i {
//               font-size: 2rem;
//               color: #d8b4fe;
//             }

//             .header-description {
//               color: #ddd6fe;
//               font-size: 1.1rem;
//               margin-bottom: 0;
//             }

//             .modern-card {
//               background: rgba(255, 255, 255, 0.95);
//               border: none;
//               border-radius: 24px;
//               box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//               backdrop-filter: blur(10px);
//               transition: all 0.3s ease;
//             }

//             .modern-card:hover {
//               transform: translateY(-5px);
//               box-shadow: 0 25px 30px -5px rgba(0, 0, 0, 0.2);
//             }

//             .form-section {
//               margin-bottom: 2rem;
//             }

//             .modern-label {
//               font-size: 0.9rem;
//               font-weight: 600;
//               color: #6b21a8;
//               margin-bottom: 0.5rem;
//               text-transform: uppercase;
//               letter-spacing: 0.05em;
//             }

//             .modern-input-group {
//               position: relative;
//               display: flex;
//               align-items: center;
//             }

//             .modern-input {
//               height: 3.5rem;
//               border-radius: 16px;
//               border: 2px solid #e9d5ff;
//               padding: 0 1rem;
//               font-size: 1rem;
//               transition: all 0.2s ease;
//               padding-right: 3rem;
//               background: rgba(255, 255, 255, 0.9);
//             }

//             .modern-input:focus {
//               border-color: #9333ea;
//               box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.1);
//             }

//             .input-icon {
//               position: absolute;
//               right: 1rem;
//               color: #9333ea;
//               font-size: 1.25rem;
//             }

//             .workspace-info {
//               background: rgba(243, 232, 255, 0.5);
//               border-radius: 16px;
//               padding: 1.25rem;
//               display: flex;
//               align-items: center;
//               gap: 1rem;
//               margin-bottom: 2rem;
//               border: 1px solid rgba(147, 51, 234, 0.1);
//             }

//             .workspace-icon {
//               background: #9333ea;
//               width: 48px;
//               height: 48px;
//               border-radius: 12px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               font-size: 1.5rem;
//               color: white;
//               box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.2);
//             }

//             .workspace-details {
//               display: flex;
//               flex-direction: column;
//             }

//             .workspace-label {
//               font-size: 0.875rem;
//               color: #6b21a8;
//               font-weight: 500;
//             }

//             .workspace-name {
//               font-weight: 600;
//               color: #4c1d95;
//               font-size: 1.1rem;
//             }

//             .action-section {
//               text-align: center;
//             }

//             .modern-button {
//               background: linear-gradient(135deg, #9333ea 0%, #7e22ce 100%);
//               color: white;
//               border: none;
//               border-radius: 16px;
//               padding: 1rem 2.5rem;
//               font-size: 1.1rem;
//               font-weight: 600;
//               display: inline-flex;
//               align-items: center;
//               gap: 0.75rem;
//               transition: all 0.3s ease;
//               cursor: pointer;
//               box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.2);
//             }

//             .modern-button:hover {
//               background: linear-gradient(135deg, #7e22ce 0%, #6b21a8 100%);
//               transform: translateY(-2px);
//               box-shadow: 0 8px 12px -1px rgba(147, 51, 234, 0.3);
//             }

//             .modern-button:disabled {
//               background: #d8b4fe;
//               cursor: not-allowed;
//               transform: none;
//               box-shadow: none;
//             }

//             .modern-button i {
//               font-size: 1.4rem;
//             }

//             @media (max-width: 768px) {
//               .modern-dashboard {
//                 padding: 1rem;
//               }

//               .main-title {
//                 font-size: 1.8rem;
//               }

//               .header-description {
//                 font-size: 1rem;
//               }

//               .modern-button {
//                 width: 100%;
//                 justify-content: center;
//               }
//             }

//             /* Add some animation */
//             @keyframes gradient {
//               0% {
//                 background-position: 0% 50%;
//               }
//               50% {
//                 background-position: 100% 50%;
//               }
//               100% {
//                 background-position: 0% 50%;
//               }
//             }
//           `}
//         </style>
//       </div>
//     </React.Fragment>
//   );
// };

// export default CreateDashboard;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { DashboardList, ReportList } from "../ulit/dashboardlist";
import "react-toastify/dist/ReactToastify.css";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";
// import { DashboardList, ReportList } from "../../util/dashboardlist"; // Fixed import path

const CreateDashboard = () => {
  document.title = "Create Dashboard | Secure Sight";

  const [dashboardName, setDashboardName] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    dbName: "",
    user_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userObject = localStorage.getItem("authUser");
        const userInfo = userObject ? JSON.parse(userObject) : null;

        if (!userInfo) {
          toast.error("User information not found");
          return;
        }

        setUserData({
          email: userInfo.email,
          dbName: userInfo.dbName,
          user_id: userInfo._id,
        });

        await Promise.all([
          ReportList({
            dbName: userInfo.dbName,
            userId: userInfo._id,
            reload: false,
          }),
          DashboardList({
            dbName: userInfo.dbName,
            userId: userInfo._id,
            reload: false,
          }),
        ]);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error loading user data: " + error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dashboardName.trim()) {
      toast.warning("Please enter a dashboard name");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        info: { dbName: userData.dbName },
        data: {
          dashboardName: dashboardName.trim(),
          user_id: userData.user_id,
        },
      };

      const response = await ApiServices(
        "post",
        payload,
        ApiEndPoints.UserCreateDashboard
      );


      if (response) {
        toast.success(response.msg, { autoClose: 2000 });
        await DashboardList({
          dbName: userData.dbName,
          userId: userData.user_id,
          reload: true,
        });
        setDashboardName(""); // Clear the input after successful creation
      }
    } catch (error) {
      console.error("Error submitting dashboard:", error);
      toast.error(error.response?.data?.message || "Error creating dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content dark-dashboard">
        <div className="gradient-overlay"></div>
        <div className="container-fluid">
          <div className="dashboard-header">
            <div className="header-content">
              <h1 className="main-title">
                <i className="bx bxs-dashboard"></i>
                Create Dashboard
              </h1>
              <p className="header-description">
                Design and configure your custom analytics dashboard
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="dark-card">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit} className="dark-form">
                    <div className="form-section">
                      <label htmlFor="dashboardName" className="dark-label">
                        Dashboard Name
                      </label>
                      <div className="dark-input-group">
                        <input
                          type="text"
                          id="dashboardName"
                          placeholder="Enter a name for your dashboard"
                          value={dashboardName}
                          onChange={(e) => setDashboardName(e.target.value)}
                          className="dark-input"
                          disabled={isLoading}
                          maxLength={50}
                          required
                        />
                        <div className="input-icon">
                          <i className="bx bx-layout"></i>
                        </div>
                      </div>
                    </div>

                    <div className="workspace-info">
                      <div className="workspace-icon">
                        <i className="bx bx-data"></i>
                      </div>
                      <div className="workspace-details">
                        <span className="workspace-label">
                          Current Workspace
                        </span>
                        <span className="workspace-name">
                          {userData.dbName || "Default"}
                        </span>
                      </div>
                    </div>

                    <div className="action-section">
                      <button
                        type="submit"
                        disabled={isLoading || !dashboardName.trim()}
                        className="dark-button"
                      >
                        <i
                          className={`bx ${
                            isLoading
                              ? "bx-loader-alt bx-spin"
                              : "bx-plus-circle"
                          }`}
                        ></i>
                        <span>
                          {isLoading ? "Creating..." : "Create Dashboard"}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            .dark-dashboard {
              background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
              min-height: 100vh;
              padding: 2rem 1rem;
              position: relative;
              overflow: hidden;
            }

            .gradient-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background:
                radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 25%),
                radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.05) 0%, transparent 25%);
              pointer-events: none;
            }

            .dashboard-header {
              margin-bottom: 2.5rem;
              padding: 1rem 0;
              position: relative;
            }

            .header-content {
              text-align: center;
              max-width: 600px;
              margin: 0 auto;
            }

            .main-title {
              margin-top:8vh;
              font-size: 2.5rem;
              color: #f0f9ff;
              font-weight: 700;
              margin-bottom: 0.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.75rem;
              text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }

            .main-title i {
              font-size: 2rem;
              color: #38bdf8;
            }

            .header-description {
              color: #bae6fd;
              font-size: 1.1rem;
              margin-bottom: 0;
            }

            .dark-card {
              background: rgba(15, 23, 42, 0.95);
              border: 1px solid rgba(56, 189, 248, 0.1);
              border-radius: 24px;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
              backdrop-filter: blur(10px);
              transition: all 0.3s ease;
            }

            .dark-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 25px 30px -5px rgba(0, 0, 0, 0.3);
              border-color: rgba(56, 189, 248, 0.2);
            }

            .form-section {
              margin-bottom: 2rem;
            }

            .dark-label {
              font-size: 0.9rem;
              font-weight: 600;
              color: #7dd3fc;
              margin-bottom: 0.5rem;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            .dark-input-group {
              position: relative;
              display: flex;
              align-items: center;
            }

            .dark-input {
              height: 3.5rem;
              border-radius: 16px;
              border: 2px solid rgba(56, 189, 248, 0.2);
              padding: 0 1rem;
              font-size: 1rem;
              transition: all 0.2s ease;
              padding-right: 3rem;
              background: rgba(15, 23, 42, 0.8);
              color: #f0f9ff;
              width: 100%;
            }

            .dark-input:focus {
              border-color: #38bdf8;
              box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
              outline: none;
            }

            .dark-input:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }

            .dark-input::placeholder {
              color: #94a3b8;
            }

            .input-icon {
              position: absolute;
              right: 1rem;
              color: #38bdf8;
              font-size: 1.25rem;
            }

            .workspace-info {
              background: rgba(15, 23, 42, 0.6);
              border-radius: 16px;
              padding: 1.25rem;
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-bottom: 2rem;
              border: 1px solid rgba(56, 189, 248, 0.1);
            }

            .workspace-icon {
              background: #0284c7;
              width: 48px;
              height: 48px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
              color: white;
              box-shadow: 0 4px 6px -1px rgba(56, 189, 248, 0.2);
            }

            .workspace-details {
              display: flex;
              flex-direction: column;
            }

            .workspace-label {
              font-size: 0.875rem;
              color: #7dd3fc;
              font-weight: 500;
            }

            .workspace-name {
              font-weight: 600;
              color: #f0f9ff;
              font-size: 1.1rem;
            }

            .action-section {
              text-align: center;
            }

            .dark-button {
              background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
              color: white;
              border: none;
              border-radius: 16px;
              padding: 1rem 2.5rem;
              font-size: 1.1rem;
              font-weight: 600;
              display: inline-flex;
              align-items: center;
              gap: 0.75rem;
              transition: all 0.3s ease;
              cursor: pointer;
              box-shadow: 0 4px 6px -1px rgba(56, 189, 248, 0.2);
            }

            .dark-button:hover:not(:disabled) {
              background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
              transform: translateY(-2px);
              box-shadow: 0 8px 12px -1px rgba(56, 189, 248, 0.3);
            }

            .dark-button:disabled {
              background: #475569;
              cursor: not-allowed;
              transform: none;
              box-shadow: none;
            }

            .dark-button i {
              font-size: 1.4rem;
            }

            @media (max-width: 768px) {
              .dark-dashboard {
                padding: 1rem;
              }

              .main-title {
                font-size: 1.8rem;
              }

              .header-description {
                font-size: 1rem;
              }

              .dark-button {
                width: 100%;
                justify-content: center;
              }
            }

            @keyframes glow {
              0% {
                box-shadow: 0 0 5px rgba(56, 189, 248, 0.2);
              }
              50% {
                box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
              }
              100% {
                box-shadow: 0 0 5px rgba(56, 189, 248, 0.2);
              }
            }

            .dark-card:hover {
              animation: glow 4s infinite;
            }
          `}
        </style>
      </div>
    </React.Fragment>
  );
};

export default CreateDashboard;
